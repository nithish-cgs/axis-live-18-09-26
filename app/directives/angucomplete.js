/**
 * Angucomplete
 * Autocomplete directive for AngularJS
 * By Daryl Rowland
 */

angular.module('angucomplete', [])
    .directive('angucomplete', ['$parse', '$http', '$sce', '$timeout', '$rootScope', 'serverService', function ($parse, $http, $sce, $timeout, $rootScope, serverService) {
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
                "tabindex": "@tabindex"
            },
            template: '<div class="angucomplete-holder"><input id="{{id}}_value" class="input-field form-control" required maxlength="6" tabindex="{{tabindex}}" autocomplete="nope" ng-blur="hideResults(id);" onkeypress="$(this).removeClass(\'error\');"  ng-keypress="$event.keyCode == 13 ? $event.preventDefault(): null;" only-digits ng-model="searchStr"  type="text" placeholder="{{placeholder}}" onmouseup="this.select();" ng-focus="resetHideResults()" ng-disabled="profileApproved" ng-keyup="errorClear(id);" /><div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown"><div class="angucomplete-searching" ng-show="searching" style="padding-left: 6px;">Searching...</div><div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" style="padding-left: 6px;">No results found</div><div class="angucomplete-row" ng-repeat="result in results track by [$index]" ng-mousedown="selectResult(result,$index)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><span ng-show="!arrayVar">{{result.Pincode}}</span></div></div></div>',

            link: function ($scope, elem, attrs) {
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

                if ($scope.minLengthUser && $scope.minLengthUser != "") {
                    $scope.minLength = $scope.minLengthUser;
                }

                if ($scope.userPause) {
                    $scope.pause = $scope.userPause;
                }

                isNewSearchNeeded = function (newTerm, oldTerm) {
                    return newTerm.length >= $scope.minLength && newTerm != oldTerm
                }
                $scope.errorClear = function (e) {
                    if (e == "city1") {
                        $('#errorcity1_value').css('display', 'none');
                    }
                    else if (e == "city2") {
                        $('#errorcity2_value').css('display', 'none');
                    }
                    else if (e == 'gcity1') {
                        $('#errorgcity1_value').css('display', 'none');
                    }
                    else if (e == 'ncity1') {
                        $('#errorncity1_value').css('display', 'none');
                    }
                }


                $scope.hideResults = function (a) {
                    $scope.search = false;
                    setTimeout(function () {
                        angular.forEach($scope.results, function (pin, key) {
                            if ($scope.searchStr == pin.Pincode) {
                                $scope.search = true;
                            }
                            else {
                                if (a == "cPin") {
                                    $rootScope.formData.cPin_valueError = true;
                                }
                                else if (a == "pPin") {
                                    $rootScope.formData.pPin_valueError = true;
                                }
                                else if (a == "nPin") {
                                    $rootScope.formData.nPin_valueError = true;
                                }
                                else {
                                    $rootScope.formData.gPin_valueError = true;
                                }
                            }
                        });

                        $scope.showDropdown = false;
                        $scope.hideTimer = $timeout(function () {
                            if (!$scope.arrayNo) {
                                $scope.arrayNo = 0;
                            }
                            if ($scope.search && $scope.results[$scope.arrayNo] != undefined) {
                                if (a == "cPin") {
                                    $rootScope.formData.cPin_valueError = false;
                                    $rootScope.formData.fields.cPin = $scope.searchStr;
                                    $rootScope.formData.fields.cPinTemp = $scope.results[$scope.arrayNo].Pincode;
                                    $rootScope.formData.fields.cDistrict = $scope.results[$scope.arrayNo].District;
                                    $rootScope.formData.fields.cStateId = $scope.results[$scope.arrayNo].StateId;
                                    $rootScope.formData.fields.cStateName = $scope.results[$scope.arrayNo].StateName;
                                    $rootScope.formData.cdValid = true;
                                }
                                else if (a == "pPin") {
                                    $rootScope.formData.pPin_valueError = false;
                                    $rootScope.formData.fields.pPin = $scope.results[$scope.arrayNo].Pincode;
                                    $rootScope.formData.fields.pDistrict = $scope.results[$scope.arrayNo].District;
                                    $rootScope.formData.fields.pStateId = $scope.results[$scope.arrayNo].StateId;
                                    $rootScope.formData.fields.pStateName = $scope.results[$scope.arrayNo].StateName;
                                    $rootScope.formData.pdValid = true;
                                }
                                else if (a == "nPin1") {
                                    $rootScope.formData.nPin1_valueError = false;
                                    $rootScope.formData.fields.nPin1 = $scope.results[$scope.arrayNo].Pincode;
                                    $rootScope.formData.fields.nDistrict1 = $scope.results[$scope.arrayNo].District;
                                    $rootScope.formData.fields.nStateId1 = $scope.results[$scope.arrayNo].StateId;
                                    $rootScope.formData.fields.nStateName1 = $scope.results[$scope.arrayNo].StateName;
                                    $rootScope.formData.ndValid = true;
                                }
                                else if (a == "nPin2") {
                                    $rootScope.formData.nPin2_valueError = false;
                                    $rootScope.formData.fields.nPin2 = $scope.results[$scope.arrayNo].Pincode;
                                    $rootScope.formData.fields.nDistrict2 = $scope.results[$scope.arrayNo].District;
                                    $rootScope.formData.fields.nStateId2 = $scope.results[$scope.arrayNo].StateId;
                                    $rootScope.formData.fields.nStateName2 = $scope.results[$scope.arrayNo].StateName;
                                    $rootScope.formData.ndValid = true;
                                }
                                else if (a == "nPin3") {
                                    $rootScope.formData.nPin3_valueError = false;
                                    $rootScope.formData.fields.nPin3 = $scope.results[$scope.arrayNo].Pincode;
                                    $rootScope.formData.fields.nDistrict3 = $scope.results[$scope.arrayNo].District;
                                    $rootScope.formData.fields.nStateId3 = $scope.results[$scope.arrayNo].StateId;
                                    $rootScope.formData.fields.nStateName3 = $scope.results[$scope.arrayNo].StateName;
                                    $rootScope.formData.ndValid = true;
                                }
                                else if(a == "gPin1"){
                                    $rootScope.formData.gPin1_valueError = false;
                                    $rootScope.formData.fields.gPin1 = $scope.results[$scope.arrayNo].Pincode;
                                    $rootScope.formData.fields.gDistrict1 = $scope.results[$scope.arrayNo].District;
                                    $rootScope.formData.fields.gStateId1 = $scope.results[$scope.arrayNo].StateId;
                                    $rootScope.formData.fields.gStateName1 = $scope.results[$scope.arrayNo].StateName;
                                    $rootScope.formData.gdValid = true;
                                }
                                else if(a == "gPin2"){
                                    $rootScope.formData.gPin2_valueError = false;
                                    $rootScope.formData.fields.gPin2 = $scope.results[$scope.arrayNo].Pincode;
                                    $rootScope.formData.fields.gDistrict2 = $scope.results[$scope.arrayNo].District;
                                    $rootScope.formData.fields.gStateId2 = $scope.results[$scope.arrayNo].StateId;
                                    $rootScope.formData.fields.gStateName2 = $scope.results[$scope.arrayNo].StateName;
                                    $rootScope.formData.gdValid = true;
                                }
                                else if(a == "gPin3"){
                                    $rootScope.formData.gPin3_valueError = false;
                                    $rootScope.formData.fields.gPin3 = $scope.results[$scope.arrayNo].Pincode;
                                    $rootScope.formData.fields.gDistrict3 = $scope.results[$scope.arrayNo].District;
                                    $rootScope.formData.fields.gStateId3 = $scope.results[$scope.arrayNo].StateId;
                                    $rootScope.formData.fields.gStateName3 = $scope.results[$scope.arrayNo].StateName;
                                    $rootScope.formData.gdValid = true;
                                } else {
                                     // dynamic nominee fields starts
                                    if ($rootScope.additionalAddress.length > 0) {
                                        $rootScope.additionalAddress.forEach(q => {
                                            let len = a.split('-').length;
                                            if (len === 2) {
                                                let index = parseInt(a.split('-')[1]);
                                                let selectedArr = $rootScope.additionalAddress[index];
                                                selectedArr.forEach(field => {
                                                    if (field.field === 'Pincode') {
                                                        field.value = $scope.results[$scope.arrayNo].Pincode;
                                                    } else if (field.field === 'State') {
                                                        field.value = $scope.results[$scope.arrayNo].StateName;
                                                    } else if (field.field === 'District') {
                                                        field.value = $scope.results[$scope.arrayNo].District;
                                                    }
                                                    $rootScope.formData.getStateId = $scope.results[$scope.arrayNo].StateId;
                                                });
                                            }
                                        })
                                    }
                                    if ($rootScope.GuardadditionalAddress.length > 0) {
                                        $rootScope.GuardadditionalAddress.forEach(r => {
                                            let len = a.split('-').length;
                                            if (len === 3) {
                                                let index = parseInt(a.split('-')[1]);
                                                let selectedArr = $rootScope.GuardadditionalAddress[index];
                                                selectedArr.forEach(field => {
                                                    if (field.field === 'Pincode') {
                                                        field.value = $scope.results[$scope.arrayNo].Pincode;
                                                    } else if (field.field === 'State') {
                                                        field.value = $scope.results[$scope.arrayNo].StateName;
                                                    } else if (field.field === 'District') {
                                                        field.value = $scope.results[$scope.arrayNo].District;
                                                    }
                                                    $rootScope.formData.getStateId = $scope.results[$scope.arrayNo].StateId;
                                                });
                                            }
                                        })
                                    }
                                     // dynamic nominee fields ends remaining code below 
                                }

                            }
                            else {
                                if (a == "cPin") {
                                    $rootScope.formData.fields.cState = '';
                                }
                                else if (a == "pPin") {
                                    $rootScope.formData.fields.pState = '';
                                }
                                else if (a == "nPin") {
                                    $rootScope.formData.fields.nState = '';
                                }  
                                 // dynamic nominee fields starts
                                else if (a.includes('-')) {
                                    if ($rootScope.additionalAddress.length > 0) {
                                        $rootScope.additionalAddress.forEach(x => {
                                            let len = a.split('-').length;
                                            if (len === 2) {
                                                let index = parseInt(a.split('-')[1]);
                                                let selectedArr = $rootScope.additionalAddress[index];
                                                selectedArr.forEach(field => {
                                                    if (field.field === 'Pincode') {
                                                        field.value = field.value ? field.value : '';
                                                    } else if (field.field === 'State') {
                                                        field.value = field.value ? field.value : '';
                                                    } else if (field.field === 'District') {
                                                        field.value = field.value ? field.value : '';
                                                    }
                                                });
                                            }
                                            
                                        })
                                    }
                                    if ($rootScope.GuardadditionalAddress.length > 0) {
                                        $rootScope.GuardadditionalAddress.forEach(r => {
                                            let len = a.split('-').length;
                                            if (len === 3) {
                                                let index = parseInt(a.split('-')[1]);
                                                let selectedArr = $rootScope.GuardadditionalAddress[index];
                                                selectedArr.forEach(field => {
                                                    if (field.field === 'Pincode') {
                                                        field.value = field.value ? field.value : '';
                                                    } else if (field.field === 'State') {
                                                        field.value = field.value ? field.value : '';
                                                    } else if (field.field === 'District') {
                                                        field.value = field.value ? field.value : '';
                                                    }
                                                });
                                            }
                                        })
                                    }
                                } 
                                // dynamic nominee fields ends remaining code below 
                                else {
                                    $rootScope.formData.fields.gState = '';
                                }
                            }
                            $scope.getCity(a);
                        }, 100);
                    }, 500)
                };

                $scope.getCity = function (a) {
                   
                    $rootScope.formData.cityList = [];

                    if (a == "cPin") {
                        $rootScope.formData.getStateId = $rootScope.formData.fields.cStateId;
                    } else if (a == "pPin") {
                        $rootScope.formData.getStateId = $rootScope.formData.fields.pStateId;
                    }
                    else if (a == "nPin1") {
                        $rootScope.formData.getStateId = $rootScope.formData.fields.nStateId1;
                    }
                    else if (a == "nPin2") {
                        $rootScope.formData.getStateId = $rootScope.formData.fields.nStateId2;
                    }
                    else if (a == "nPin3") {
                        $rootScope.formData.getStateId = $rootScope.formData.fields.nStateId3;
                    }
                    else if (a == "gPin1") {
                        $rootScope.formData.getStateId = $rootScope.formData.fields.gStateId1;
                    }
                    else if (a == "gPin2") {
                        $rootScope.formData.getStateId = $rootScope.formData.fields.gStateId2;
                    }
                    else if (a == "gPin3") {
                        $rootScope.formData.getStateId = $rootScope.formData.fields.gStateId3;
                    }
                    if ($rootScope.formData.getStateId) {
                        var s_url = "DIYGetCityListForAutoFill?StateID=" + $rootScope.formData.getStateId;
                        serverService.getApi(s_url).then(function (res)
                        {
							var response = res.data;
                            var len = response.StateDetailsList.length;
                            for (var j = 0; j < len; j++) {
                                $rootScope.formData.cityList.push(response.StateDetailsList[j].City.toLowerCase());
                            }
                        })

                        if (a == "cPin") {
                            $rootScope.formData.ccityList = $rootScope.formData.cityList;
                            //   $('#city1_value').val('');
                        } else if (a == "pPin") {
                            $rootScope.formData.pcityList = $rootScope.formData.cityList;
                            //   $('#city2_value').val('');
                        }
                        else if (a == "nPin1") {
                            $rootScope.formData.ncityList1 = $rootScope.formData.cityList;
                            //   $('#city3_value').val('');
                        }
                        else if (a == "nPin2") {
                            $rootScope.formData.ncityList2 = $rootScope.formData.cityList;
                            //   $('#city3_value').val('');
                        }
                        else if (a == "nPin3") {
                            $rootScope.formData.ncityList3 = $rootScope.formData.cityList;
                            //   $('#city3_value').val('');
                        }
                        else if (a == "gPin1") {
                            $rootScope.formData.gcityList1 = $rootScope.formData.cityList;
                            // $('#city4_value').val('');
                        }
                        else if (a == "gPin2") {
                            $rootScope.formData.gcityList2 = $rootScope.formData.cityList;
                            // $('#city4_value').val('');
                        }
                        else if (a == "gPin3") {
                            $rootScope.formData.gcityList3 = $rootScope.formData.cityList;
                            // $('#city4_value').val('');
                        }
                        // dynamic nominee fields starts
                        else if (a.includes('-')) {
                            if ($rootScope.additionalAddress.length > 0 || $rootScope.GuardadditionalAddress.length > 0) {
                                $rootScope.newCityList = $rootScope.formData.cityList;
                            }
                        }
                         // dynamic nominee fields ends thatsall
                    }
                }

                $scope.resetHideResults = function () {
                    if ($scope.hideTimer) {
                        $timeout.cancel($scope.hideTimer);
                    };
                };

                $scope.hoverRow = function (index) {
                    $scope.currentIndex = index;
                }
                $scope.cancel = false;
                $scope.keyPressed = function (event) {
                    
                    if (!(event.which == 38 || event.which == 40 || event.which == 13 || event.which == 9)) {
                        if (!$scope.searchStr || $scope.searchStr == "") {
                            $scope.showDropdown = false;
                            $scope.lastSearchTerm = null;
                        } else if (isNewSearchNeeded($scope.searchStr, $scope.lastSearchTerm)) {
                            $scope.lastSearchTerm = $scope.searchStr;
                            $scope.showDropdown = true;
                            $scope.currentIndex = -1;

                            if (event.target.id == 'cPin_value') {
                                $rootScope.formData.cPin_valueError = false;
                                $rootScope.formData.fields.cStateName = '';
                                $rootScope.formData.fields.cDistrict = '';
                                $('#city1_value').val('');
                            }
                            else if (event.target.id == 'pPin_value') {
                                $rootScope.formData.pPin_valueError = false;
                                $rootScope.formData.fields.pStateName = '';
                                $rootScope.formData.fields.pDistrict = '';
                                $('#city2_value').val('');
                            }
                            else if (event.target.id == "nPin_value") {
                                $rootScope.formData.nPin_valueError = false;
                                $rootScope.formData.fields.nDistrict = '';
                                $rootScope.formData.fields.nStateName = '';
                                $rootScope.formData.ndValid = true;
                            }
                            else {
                                $rootScope.formData.gPin_valueError = false;
                                $rootScope.formData.fields.gDistrict = '';
                                $rootScope.formData.fields.gStateName = '';
                            }

                            var s_url = "DIYAutoPincode?Pincode=" + $scope.searchStr;
                            if ($scope.searchStr.length != 6) {
                                $scope.cancel = false;
                            }
                            serverService.getApi(s_url).then(function (a)
                            {
								var response = a.data;
                                if (response.IsSuccess && !$scope.cancel) {
                                    $scope.results = [];
                                    var len = response.PincodeList.length;
                                    if (len == 1) {
                                        $scope.cancel = true;
                                    }
                                    if (len > 4) {
                                        len = 4;
                                    }
                                    for (var j = 0; j < len; j++) {
                                        $scope.results.push(response.PincodeList[j]);

                                    }
                                } else if ($scope.searchStr.length == 6 && !response.IsSuccess) {
                                    if (event.target.id == 'cPin_value') {
                                        $rootScope.formData.cPin_valueError = true;
                                    }
                                    else if (event.target.id == 'pPin_value') {
                                        $rootScope.formData.pPin_valueError = true;
                                    }
                                    else if (event.target.id == "nPin") {
                                        $rootScope.formData.nPin_valueError = true;
                                    }
                                    else {
                                        $rootScope.formData.gPin_valueError = true;
                                    }
                                }

                            });


                            // $scope.searching = false;

                        }
                    } else {
                        event.preventDefault();
                    }
                }


                $scope.selectResult = function (result, i) {
                    //console.log("Select Pincode");
                    //console.log(result);
                    if (result instanceof Array) {
                        $scope.arrayVar = true;
                        $scope.searchStr = result[0];
                        $scope.stateID = result[4];
                        $scope.districtName = result[1];
                        $scope.selectedObject = result[0];
                        //  $scope.results = [];
                    } else {
                        $scope.arrayVar = false;
                        $scope.searchStr = (result.Pincode);
                        $scope.selectedObject = (result.Pincode);
                        $scope.selectedObjectId = result.StateId;
                        $scope.selectedObjectName = result.District;
                        //$scope.results = [];
                    }
                    $scope.showDropdown = false;

                    //$scope.$apply();
                }

                $scope.keyResult = function (result) {
                    if (result instanceof Array) {
                        $scope.arrayVar = true;
                        $scope.searchStr = result[0];
                        $scope.stateNameID = result[1];
                        $scope.selectedObject = result[0];
                        //$scope.results = [];
                    } else {
                        $scope.arrayVar = false;
                        $scope.searchStr = result.Pincode;
                        $scope.selectedObject = result.Pincode;
                        // $scope.results = [];
                    }
                    //  $scope.showDropdown = false;

                    //$scope.$apply();
                }

                var inputField = elem.find('input');

                inputField.on('keyup', $scope.keyPressed);

                elem.on("keyup", function (event) {
                    if (event.which === 40) {
                        if ($scope.results && ($scope.currentIndex + 1) < $scope.results.length) {
                            $scope.currentIndex++;
                            $scope.keyResult($scope.results[$scope.currentIndex]);
                            $scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        }

                        $scope.$apply();
                    } else if (event.which == 38) {
                        if ($scope.currentIndex >= 1) {
                            $scope.currentIndex--;
                            $scope.keyResult($scope.results[$scope.currentIndex]);
                            $scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        }

                    } else if (event.which == 13) {
                        if ($scope.results && $scope.currentIndex >= 0 && $scope.currentIndex < $scope.results.length) {
                            $scope.selectResult($scope.results[$scope.currentIndex], $scope.currentIndex);
                            $scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        } else {
                            $scope.results = [];
                            $scope.$apply();
                            event.preventDefault;
                            event.stopPropagation();
                        }

                    } else if (event.which == 27) {
                        $scope.results = [];
                        $scope.showDropdown = false;
                        $scope.$apply();
                    } else if (event.which == 8) {
                        $scope.selectedObject = null;
                        $scope.$apply();
                    }
                });

            }
        };
    }]);