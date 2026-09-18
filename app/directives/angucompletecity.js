/**
 * Angucomplete
 * Autocomplete directive for AngularJS
 * By Daryl Rowland
 */

angular.module('angucompletecity', [])
    .directive('angucompletecity', ['$parse', '$http', '$sce', '$timeout', '$rootScope', 'serverService', function ($parse, $http, $sce, $timeout, $rootScope, serverService)
    {
        return {
            restrict: 'EA',
            scope: {
                "id": "@id",
                "placeholder": "@placeholder",
                "selectedObject": "=selectedobject",
                "url": "@url",
                "dataField": "@datafield",
                "titleField": "@titlefield",
                "descriptionField": "@descriptionfield",
                "imageField": "@imagefield",
                "imageUri": "@imageuri",
                "inputClass": "@inputclass",
                "userPause": "@pause",
                "searchFields": "@searchfields",
                "minLengthUser": "@minlength",
                "matchClass": "@matchclass",
            },
            template: '<div class="angucomplete-holder"><input id="{{id}}_value" required class="input-field form-control" ng-model="searchStr"  ng-keyup="$event.keyCode == 13 ? $event.preventDefault(): null;" style="text-transform: capitalize;" type="text" placeholder="{{placeholder}}" class="{{inputClass}}" onmouseup="this.select();" ng-focus="resetHideResults()" ng-blur="hideResults(id);" alpha-numeric autocapitalize="off" autocorrect="off" autocomplete="off" /><div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown"><div class="angucomplete-searching" ng-if="searching" style="padding-left: 6px; color: #333;">Searching...</div><div class="angucomplete-searching" ng-if="!searching && (!results || results.length == 0)" style="padding-left: 6px;"></div><div class="angucomplete-row" ng-repeat="result in results track by [$index]" ng-mousedown="selectResult(result)" ng-mouseover="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><span ng-show="!arrayVar" style="text-transform: capitalize;">{{result | lowercase}}</span></div></div></div>',

            link: function ($scope, elem, attrs)
            {
                $scope.showLabel = true;
                $scope.lastSearchTerm = null;
                $scope.currentIndex = null;
                $scope.justChanged = false;
                $scope.searchTimer = null;
                $scope.hideTimer = null;
                $scope.searching = false;
                $scope.pause = 500;
                $scope.minLength = 3;
                $scope.searchStr = null;
                $scope.stateNameID = null;
                $scope.localData = [];
                elem.removeAttr('tabindex');
                // to hide city label in registration page (Stage 1-A)
                if(elem[0].id == 'city'){
                    $scope.showLabel = false;
                    $scope.disabled = true;
                }

                if ($scope.minLengthUser && $scope.minLengthUser != "")
                {
                    $scope.minLength = $scope.minLengthUser;
                }

                if ($scope.userPause)
                {
                    $scope.pause = $scope.userPause;
                }

                isNewSearchNeeded = function (newTerm, oldTerm)
                {
                    return newTerm.length >= $scope.minLength && newTerm != oldTerm
                }

                $scope.processResults = function (responseData, str)
                {
                    if (responseData && responseData.length > 0)
                    {
                        $scope.results = [];

                        var titleFields = [];
                        if ($scope.titleField && $scope.titleField != "")
                        {
                            titleFields = $scope.titleField.split(",");
                        }

                        for (var i = 0; i < responseData.length; i++)
                        {
                            // Get title variables
                            var titleCode = [];

                            for (var t = 0; t < titleFields.length; t++)
                            {
                                titleCode.push(responseData[i][titleFields[t]]);
                            }

                            var description = "";
                            if ($scope.descriptionField)
                            {
                                description = responseData[i][$scope.descriptionField];
                            }

                            var imageUri = "";
                            if ($scope.imageUri)
                            {
                                imageUri = $scope.imageUri;
                            }

                            var image = "";
                            if ($scope.imageField)
                            {
                                image = imageUri + responseData[i][$scope.imageField];
                            }

                            var text = titleCode.join(' ');
                            if ($scope.matchClass)
                            {
                                var re = new RegExp(str, 'i');
                                var strPart = text.match(re)[0];
                                text = $sce.trustAsHtml(text.replace(re, '<span class="' + $scope.matchClass + '">' + strPart + '</span>'));
                            }

                            var resultRow = {
                                title: text,
                                description: description,
                                image: image,
                                originalObject: responseData[i]
                            }

                            $scope.results[$scope.results.length] = resultRow;
                        }


                    } else
                    {
                        //$scope.results = [];
                    }
                }

                $scope.searchTimerComplete = function (str)
                {
                    // Begin the search

                    if (str && str.length >= $scope.minLength)
                    {
                        if ($scope.localData)
                        {
                            var searchFields = $scope.searchFields.split(",");

                            var matches = [];

                            for (var i = 0; i < $scope.localData.length; i++)
                            {
                                var match = false;

                                for (var s = 0; s < searchFields.length; s++)
                                {
                                    //  match = match || (typeof $scope.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && $scope.localData[i][searchFields[s]].toLowerCase().indexOf(str.toLowerCase()) >= 0);
                                    var len = str.length;
                                    match = match || (typeof $scope.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && $scope.localData[i][searchFields[s]].toLowerCase().substring(0, len) == str.toLowerCase());
                                }

                                if (match)
                                {
                                    matches[matches.length] = $scope.localData[i];
                                }
                            }

                            $scope.searching = false;
                            $scope.processResults(matches, str);

                        } else
                        {
                            $http.get($scope.url + str, {}).
                                success(function (responseData, status, headers, config)
                                {
                                    $scope.searching = false;
                                    $scope.processResults((($scope.dataField) ? responseData[$scope.dataField] : responseData), str);
                                }).
                                error(function (data, status, headers, config)
                                {
                                    console.log("error");
                                });
                        }
                    }
                }
				
				$scope.checkCity = function(a){
					return a = $scope.searchStr;
				}

                $scope.hideResults = function (id)
                {
                    $scope.hideTimer = $timeout(function ()
                    {
						var city = $scope.cityId + 'Error';
						$rootScope.formData[city] = true;
						
						angular.forEach($scope.tempList, function (value, key) {
							  if (value && $scope.searchStr) {
                                if (value == $scope.searchStr) {
                                    var city = $scope.cityId + 'Error';
                                    $rootScope.formData[city] = false;
                                    $scope.$apply();
                                } 
                                 // dynamic nominee fields starts here remaining code below 
                                if (id.includes('-')) {
                                    if ($rootScope.additionalAddress.length > 0) {
                                        $rootScope.additionalAddress.forEach(a => {
                                            let len = id.split('-').length;
                                            if (len === 2) {
                                                let index = parseInt(id.split('-')[1]);
                                                let selectedArr = $rootScope.additionalAddress[index];
                                                selectedArr.forEach(field => {
                                                    if (field.field === 'City') {
                                                        field.value = value;
                                                    }
                                                });
                                            }
                                        })
                                        
                                    }
                                    if ($rootScope.GuardadditionalAddress.length > 0) {
                                        $rootScope.GuardadditionalAddress.forEach(b => {
                                            let len = id.split('-').length;
                                            if (len === 3) {
                                                let index = parseInt(id.split('-')[1]);
                                                let selectedArr = $rootScope.GuardadditionalAddress[index];
                                                selectedArr.forEach(field => {
                                                    if (field.field === 'City') {
                                                        field.value = value;
                                                    }
                                                });
                                            }
                                        })
                                        
                                    }
                                }
                            } else {
                                if (id.includes('-')) {
                                    if ($rootScope.additionalAddress.length > 0) {
                                        $rootScope.additionalAddress.forEach(x => {
                                            let len = id.split('-').length;
                                            if (len === 2) {
                                                let index = parseInt(id.split('-')[1]);
                                                let selectedArr = $rootScope.additionalAddress[index];
                                                selectedArr.forEach(field => {
                                                    if (field.field === 'City') {
                                                        field.value = '';
                                                    }
                                                });
                                            }
                                        })
                                        
                                    }
                                    if ($rootScope.GuardadditionalAddress.length > 0) {
                                        $rootScope.GuardadditionalAddress.forEach(z => {
                                            let len = id.split('-').length;
                                            if (len === 3) {
                                                let index = parseInt(id.split('-')[1]);
                                                let selectedArr = $rootScope.GuardadditionalAddress[index];
                                                selectedArr.forEach(field => {
                                                    if (field.field === 'City') {
                                                        field.value = '';
                                                    }
                                                });
                                            }
                                        })
                                    }
                                }
                                 // dynamic nominee fields ends here
                            }
						});
						/*if($scope.searchStr && $scope.searchStr.toLowerCase() == $scope.tempList.find($scope.checkCity)){
							var city = $scope.cityId + 'Error';
							    $rootScope.formData[city] = false;
							    $scope.$apply();
						}else{
							 var city = $scope.cityId + 'Error';
							 $rootScope.formData[city] = true;
						}*/
                        $scope.showDropdown = false;
                    }, $scope.pause);
                };

                $scope.resetHideResults = function ()
                {
                    if ($scope.hideTimer)
                    {
                        $timeout.cancel($scope.hideTimer);
                    };
                };

                $scope.hoverRow = function (index)
                {
                    $scope.currentIndex = index;
                }

                $scope.keyPressed = function (event)
                {
                    if(elem[0].id == 'city'){
                        $scope.showDropdown = true;
                    }
                    if (!(event.which == 38 || event.which == 40 || event.which == 13 || event.which == 9 ))
                    {
                        if (!$scope.searchStr || $scope.searchStr == "")
                        {
                            $scope.showDropdown = false;
                            $scope.lastSearchTerm = null;
                        } else if (isNewSearchNeeded($scope.searchStr, $scope.lastSearchTerm))
                        {
                            $scope.lastSearchTerm = $scope.searchStr;
                            $scope.showDropdown = true;
                            $scope.currentIndex = -1;
                            $scope.results = [];
							$scope.tempList = [];
							$scope.cityId = event.target.id;
							if (event.target.id == "city1_value")
                            {
								$rootScope.formData.cityList = $rootScope.formData.ccityList;
							}
							else if(event.target.id == "city2_value"){
								$rootScope.formData.cityList = $rootScope.formData.pcityList;
							}
							else if(event.target.id == "city3_value"){
								$rootScope.formData.cityList = $rootScope.formData.ncityList1;
							}
							else if(event.target.id == "city4_value"){
								$rootScope.formData.cityList = $rootScope.formData.gcityList1;
							}
							else if(event.target.id == "city5_value"){
								$rootScope.formData.cityList = $rootScope.formData.ncityList2;
							}
							else if(event.target.id == "city6_value"){
								$rootScope.formData.cityList = $rootScope.formData.gcityList2;
							}
							else if(event.target.id == "city7_value"){
								$rootScope.formData.cityList = $rootScope.formData.ncityList3;
							}
							else if(event.target.id == "city8_value"){
								$rootScope.formData.cityList = $rootScope.formData.gcityList3;
							} else if (event.target.id == "city_value") {
                                $rootScope.formData.cityList = $rootScope.formData.gcityList;
                                $rootScope.selectedCity = null;
                                if(event.target.id == "city_value"){
                                    if($scope.searchStr.length >= 3) {
                                        var s_url = "GetNewDIYCityAutoComplete";
                                        var sendData = { City : $scope.searchStr, StateId: '' }

                                        serverService.apiCall(s_url, sendData).then(function (a)
                                        {
											var response = a.data;
                                            $scope.results = [];
                                            $rootScope.formData.city_valueError = false;
                                            if(response.IsSuccess && !$scope.cancel){
                                                var len = response.City.length;
                                                for (var j = 0; j < len; j++)
                                                {
                                                    $scope.results.push(response.City[j].CityName);
                                                    sessionStorage.setItem('CityArray', JSON.stringify($scope.results));
                                                }
                                            }
                                            else
                                            {
                                                $rootScope.formData.city_valueError = true;
                                            }
                                        });
                                    }
                                }
							} else {
                                $rootScope.formData.cityList = $rootScope.newCityList;
                            }

							if ($rootScope.formData.cityList)
							{
							    $scope.len = $rootScope.formData.cityList.length;
							    $scope.a = $rootScope.formData.cityList.reverse();
							    $scope.str = $scope.searchStr.length;
							} 
							
							for (var i = 0; i < $scope.len; i++)
							{							
								var searchKey = $scope.searchStr.toLowerCase();
							    if ($scope.a[i].indexOf(searchKey) != -1)
								{				
							        var b = $scope.a[i].slice(0, $scope.str)
									if(b == searchKey){
									    $scope.tempList.push($scope.a[i]);
									}									
								}
							}				                                    
                            var leng = $scope.tempList.length;   
							
							if(leng > 4 ){
								leng = 4;
							}
							
							for(var j = 0; j < leng; j++){
								$scope.results.push($scope.tempList[j]);
							}
							
							if ($scope.results.length == 0)
							{
							    var city = this.id + 'Error';
							    $rootScope.formData[city] = true;
							}
							else
							{
							    var city = this.id + 'Error';
							    $rootScope.formData[city] = false;
							    $scope.$apply();
							}


                            if ($scope.searchTimer)
                            {
                                $timeout.cancel($scope.searchTimer);
                            }

                            $scope.searching = true;

                            $scope.searchTimer = $timeout(function ()
                            {
                                $scope.searchTimerComplete($scope.searchStr);
                            }, $scope.pause);
                        }
                    }
                    else
                    {
                        event.preventDefault();
                    }
                }

                $scope.selectResult = function (result)
                {
                    if (result instanceof Array)
                    {
                        $scope.arrayVar = true;
                        $scope.searchStr = result[0];
                        $scope.stateNameID = result[1];
                        $scope.selectedObject = result[0];
                        $rootScope.selectedCity = result[0];
                        $scope.results = [];
                    } else
                    {
                        $scope.arrayVar = false;
                        $scope.searchStr = result;
                        $scope.selectedObject = result;
                        $rootScope.selectedCity = result;
                        $scope.results = [];
                    }
					
                    $scope.showDropdown = false;

                    //$scope.$apply();
                }

                $scope.keyResult = function (result)
                {
                    if (result instanceof Array)
                    {
                        $scope.arrayVar = true;
                        $scope.searchStr = result[0];
                        $scope.stateNameID = result[1];
                        $scope.selectedObject = result[0];
                        //$scope.results = [];
                    } else
                    {
                        $scope.arrayVar = false;
                        $scope.searchStr = result;
                        $scope.selectedObject = result;
                       // $scope.results = [];
                    }
                }

                var inputField = elem.find('input');

                inputField.on('keyup', $scope.keyPressed);

                elem.on("keyup", function (event)
                {
                    if (event.which === 40)
                    {
                        if ($scope.results && ($scope.currentIndex + 1) < $scope.results.length)
                        {
                            $scope.currentIndex++;
                            $scope.keyResult($scope.results[$scope.currentIndex]);
                            $scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        }

                        $scope.$apply();
                    } else if (event.which == 38)
                    {
                        if ($scope.currentIndex >= 1)
                        {
                            $scope.currentIndex--;
                            $scope.keyResult($scope.results[$scope.currentIndex]);
                            $scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        }

                    } else if (event.which == 13)
                    {
                        if ($scope.results && $scope.currentIndex >= 0 && $scope.currentIndex < $scope.results.length)
                        {
                            $scope.selectResult($scope.results[$scope.currentIndex]);
                            $scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        } else
                        {
                            $scope.results = [];
                            $scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        }

                    } else if (event.which == 27)
                    {
                        $scope.results = [];
                        $scope.showDropdown = false;
                        $scope.$apply();
                    } else if (event.which == 8)
                    {
                        $scope.selectedObject = null;
                        $scope.$apply();
                    }
                });

            }
        };
    }]);