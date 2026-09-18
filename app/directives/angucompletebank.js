/**
 * Angucomplete
 * Autocomplete directive for AngularJS
 * By Daryl Rowland
 */

angular.module('angucompletebank', [])
    .directive('angucompletebank', function ($parse, $http, $sce, $timeout, $rootScope, serverService)
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
                "tabindex": "@tabindex",
				"label": "@label"
            },
            template: '<div class="angucomplete-holder"><input id="{{id}}_value" tabindex="{{tabindex}}" required class="input-field" ng-model="searchStr" style="text-transform: capitalize;" type="text" placeholder="{{placeholder}}" class="{{inputClass}}" onmouseup="this.select();"  ng-focus="resetHideResults()" ng-blur="hideResults();" only-alphabets autocomplete="off" /><label class="input-label" for="{{id}}_value">{{label}}</label><div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown"><div class="angucomplete-searching" ng-if="searching" style="padding-left: 6px; color: #333;">Searching...</div><div class="angucomplete-searching" ng-if="!searching && (!results || results.length == 0)" style="padding-left: 6px;">No results found</div><div class="angucomplete-row" ng-repeat="result in results track by [$index]" ng-mousedown="selectResult(result)" ng-mouseover="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><span ng-show="!arrayVar" style="text-transform: capitalize;">{{result | lowercase}}</span></div></div></div>',

            link: function ($scope, elem, attrs)
            {
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

                    if (str.length >= $scope.minLength)
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
                                    //console.log("error");
                                });
                        }
                    }
                }

                $scope.hideResults = function ()
                {
                    $scope.hideTimer = $timeout(function ()
                    {
                        $scope.showDropdown = false;
						$scope.getIfsc();
                    }, $scope.pause);
                };
				$('#bankName').on("select2:select", function (e) {$scope.getIfsc(); });			
				
				$scope.getIfsc = function ()
				{

				    if ($rootScope.formData.ifOther)
				    {
				        $scope.bName = $('#bankName_value').val();
				    } else
				    {
				        $scope.bName = $('#pBank').val();
				    }

				    if ($scope.bName && $('#bankCity_value').val() != '')
				    {
				        var url = 'GetBankDetialsAutoFill';



				    var sendData = { 'InputTextBankName': $scope.bName, 'InputTextStateName': $('#bankCity_value').val() }
                    $rootScope.formData.bankListLoading = true;
                    var tokenParams = {
                        'Email': ($rootScope.formData.fields.email !== null && $rootScope.formData.fields.email !== '')? $rootScope.formData.fields.email : localStorage.getItem('RxEmail'),
                        'Mobile': ($rootScope.formData.fields.mobile !== null && $rootScope.formData.fields.mobile !== '')? $rootScope.formData.fields.mobile : localStorage.getItem('RxMobile'),
                        'PanNumber': ($rootScope.formData.fields.panNumber !== null && $rootScope.formData.fields.panNumber !== '')? $rootScope.formData.fields.panNumber : localStorage.getItem('RxPan'),
                        'DOB': ($rootScope.formData.dob !== null && !angular.isUndefined($rootScope.formData.dob) && $rootScope.formData.fields.dob !== '')? $rootScope.formData.dob : localStorage.getItem('DOB'),
                    }
                    serverService.apiTokenCall(url, sendData, tokenParams).success(function (response) {
                        // serverService.apiCall(url, sendData).success(function (response)
				    
				        $rootScope.formData.bankListLoading = false;
						if(response.IsSuccess){
							$rootScope.formData.bankIfscList = response.CBankDetailsList;
							$rootScope.formData.ifscOption = true;
							$rootScope.formData.noData = false;
							setTimeout(function(){
								$('.customcheckradio').iCheck({
									checkboxClass: 'icheckbox_minimal',
									radioClass: 'iradio_minimal'
								});
								$('input[type=radio]').on('ifClicked', function (event)
								{
								    var i = $(this).val();
									$rootScope.formData.fields.ifscCode = $rootScope.formData.bankIfscList[i].IFSCCode;
									$('#ifsc_value').val($rootScope.formData.fields.ifscCode);
									$rootScope.formData.micrCode = $rootScope.formData.bankIfscList[i].MICRCode;
									$scope.$apply();
								});
							},500)
							
						}
						else{
							$rootScope.formData.bankIfscList = '';
							$rootScope.formData.ifscOption = false;
							$rootScope.formData.noData = true;
						};
					});
					}
				}

                $scope.resetHideResults = function ()
                {
					$scope.getIfsc();
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
							
							if(this.id == 'bankCity_value'){							
							    //var sendData = { city: $scope.searchStr, StateId: $rootScope.formData.fields.cState1 }
							    var s_url = "GetStateForAutoFill";

							    if ($rootScope.formData.ifOther)
							    {
							        $scope.bName = $('#bankName_value').val();
							    } else
							    {
							        $scope.bName = $('#pBank').val();
							    }

                                var sendData = {'InputTextBankName': $scope.bName,'InputTextStateName' :  $scope.searchStr}
                                serverService.bankCity(s_url, sendData).success(function (response)
                                {
                                    if (response.IsSuccess)
                                    {										
                                        $scope.results = [];
										var len = response.CStateList.length;
                                        if (len > 4)  {
                                            len = 4;
                                        }
                                        for (var j = 0; j < len; j++)
                                        {
                                            $scope.results.push(response.CStateList[j].City);
                                        }
                                    }

                                });                             
							}
							else{
								var s_url = "GetBankNameForAutoFill";
								var sendData = {'InputTextBankName' :  $scope.searchStr}
                                serverService.bankCity(s_url, sendData).success(function (response)
                                {
                                    if (response.IsSuccess)
                                    {										
                                        $scope.results = [];
										var len = response.CBankNameList.length;
                                        if (len > 4)  {
                                            len = 4;
                                        }
                                        for (var j = 0; j < len; j++)
                                        {
                                            $scope.results.push(response.CBankNameList[j].Bank);
                                        }
                                    }
                                }); 
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
                        $scope.results = [];
                    } else
                    {
                        $scope.arrayVar = false;
                        $scope.searchStr = result;
                        $scope.selectedObject = result;
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
    });

