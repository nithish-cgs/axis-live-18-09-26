/**
 * Angucomplete
 * Autocomplete directive for AngularJS
 * By Daryl Rowland
 */

angular.module('angucompleteifsc', [])
.directive('angucompleteifsc', ['$parse', '$http', '$sce', '$timeout', '$rootScope', 'serverService', function ($parse, $http, $sce, $timeout, $rootScope, serverService) {
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
			"disableInput": "=disableInput"
		},
		template: '<div class="angucomplete-holder"><input  ng-change="filterResults()" id="{{id}}_value" class="input-field form-control" required maxlength="11"  tabindex="{{tabindex}}" autocomplete="off" ng-blur="hideResults(id);" ng-model="searchStr" stop-ccp ng-right-click type="text" placeholder="{{placeholder}}" onmouseup="this.select();" ng-focus="resetHideResults()" ng-keyup="errorClear(id);" /><div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown"><div class="angucomplete-searching" ng-show="searching" style="padding-left: 6px;">Searching...</div><div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" style="padding-left: 6px;">No results found</div><div class="angucomplete-row" ng-repeat="result in results track by [$index]" ng-mousedown="selectResult(result)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><span ng-show="!arrayVar">{{result}}</span><span ng-show="arrayVar">{{result[0]}}</span></div></div></div>',

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
			$scope.find = false;
			$scope.results = [];
			if ($scope.minLengthUser && $scope.minLengthUser != "") {
				$scope.minLength = $scope.minLengthUser;
			}

			if ($scope.userPause) {
				$scope.pause = $scope.userPause;
			}

			isNewSearchNeeded = function (newTerm, oldTerm) {
				return newTerm.length >= $scope.minLength && newTerm != oldTerm
			}
			$scope.errorClear = function () {
				$('#errorifsc_value').css('display', 'none');

			}
			$scope.processResults = function (responseData, str) {
				if (responseData && responseData.length > 0) {
					$scope.results = [];

					var titleFields = [];
					if ($scope.titleField && $scope.titleField != "") {
						titleFields = $scope.titleField.split(",");
					}

					for (var i = 0; i < responseData.length; i++) {
						// Get title variables
						var titleCode = [];

						for (var t = 0; t < titleFields.length; t++) {
							titleCode.push(responseData[i][titleFields[t]]);
						}

						var description = "";
						if ($scope.descriptionField) {
							description = responseData[i][$scope.descriptionField];
						}

						var imageUri = "";
						if ($scope.imageUri) {
							imageUri = $scope.imageUri;
						}

						var image = "";
						if ($scope.imageField) {
							image = imageUri + responseData[i][$scope.imageField];
						}

						var text = titleCode.join(' ');
						if ($scope.matchClass) {
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

				} else {
					//$scope.results = [];
				}
			}

			$scope.searchTimerComplete = function (str) {
				// Begin the search

				if (str.length >= $scope.minLength) {
					if ($scope.localData) {
						var searchFields = $scope.searchFields.split(",");

						var matches = [];

						for (var i = 0; i < $scope.localData.length; i++) {
							var match = false;

							for (var s = 0; s < searchFields.length; s++) {
								//  match = match || (typeof $scope.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && $scope.localData[i][searchFields[s]].toLowerCase().indexOf(str.toLowerCase()) >= 0);
								var len = str.length;
								match = match || (typeof $scope.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && $scope.localData[i][searchFields[s]].toLowerCase().substring(0, len) == str.toLowerCase());
							}

							if (match) {
								matches[matches.length] = $scope.localData[i];
							}
						}

						$scope.searching = false;
						$scope.processResults(matches, str);

					} else {
						$http.get($scope.url + str, {}).
						success(function (responseData, status, headers, config) {
							$scope.searching = false;
							$scope.processResults((($scope.dataField) ? responseData[$scope.dataField] : responseData), str);
						}).
						error(function (data, status, headers, config) {
							console.log("error");
						});
					}
				}
			}

			$scope.clearMICR = function () {
				$rootScope.formData.fields.micrCode = '';
				$rootScope.formData.ifscChanged = true;
				$rootScope.formData.ifscDetails = false;
				$('select#ddlMicrCode option:not(:first)').remove().end();
			}

			$scope.hideResults = function () {

				$scope.hideTimer = $timeout(function () {
						$scope.showDropdown = false;
						$('#acc1').focus();
					}, $scope.pause);

			};

			$scope.resetHideResults = function () {
				if ($scope.hideTimer) {
					$timeout.cancel($scope.hideTimer);
				};
			};

			$scope.hoverRow = function (index) {
				$scope.currentIndex = index;
			}

			$scope.keyPressed = function (event) {
				if($scope.searchStr == ""||$scope.searchStr==undefined){
					// $scope.find = false;
					$scope.results=[];
				}
				if (!(event.which == 38 || event.which == 40 || event.which == 13 || event.which == 9)) {
					if (!$scope.searchStr || $scope.searchStr == "") {
						$scope.showDropdown = false;
						$scope.lastSearchTerm = null;
					} else if (isNewSearchNeeded($scope.searchStr, $scope.lastSearchTerm)&&$scope.searchStr.length>=3) {
						$scope.lastSearchTerm = $scope.searchStr;
						$scope.showDropdown = true;
						$scope.currentIndex = -1;
						if ($scope.searchStr.length != 11) {
							$scope.cancel = false;
						}
						var s_url;
						if($scope.results.length > 0) {
							$scope.results.some(function (str) {
								if(str.includes($scope.searchStr.toUpperCase())){
									$scope.find = true;
									$scope.filterResults();
									return true;
								}else {
									$scope.find = false;
									return false;
								}
							})
						}
						if($scope.searchStr.length>=3){
							$scope.find = false;
						}
						if(($scope.results.length == 0 || !$scope.find) && $scope.CheckAlphapet($scope.searchStr)){
						if(!$rootScope.webkarvy){
							s_url = "DIYGetBankNameIFSCCode?BankName=" + $rootScope.formData.fields.bankName + "&IFSCCode=" + $scope.searchStr;
						}else{
							s_url = "GetIFSCCodeForAutoFill?BankName=" + $rootScope.formData.fields.bankName + "&IFSCCode=" + $scope.searchStr;
						}

						serverService.getApi(s_url).then(function (a)
						{
							var response = a.data;
							$scope.results = [];
							$rootScope.ifscError = false;
							if (response.IsSuccess && !$scope.cancel) {
								var len = response.BankDetailsList.length;
								if($rootScope.webkarvy){
									//$rootScope.formData.fields.bankName = response.BankDetailsList[0].Bank;
									$rootScope.formData.fields.micrCode = '';
								}
								if (len == 0) {
									$scope.cancel = true;
								}
								for (var j = 0; j < len; j++) {
									$scope.results.push(response.BankDetailsList[j].IFSCCode);
								}
							} else {
								$rootScope.ifscError = true;
							}
						});

						if ($scope.searchTimer) {
							$timeout.cancel($scope.searchTimer);
						}

						$scope.searching = true;

						$scope.searchTimer = $timeout(function () {
								$scope.searchTimerComplete($scope.searchStr);
							}, $scope.pause);

					}
					else{
						$rootScope.ifscError = true;
					}
				} else {
					event.preventDefault();
				}
			}
			}

			$scope.CheckAlphapet = function(keys){
				const regex = /^[a-zA-Z]{3}/;
				return regex.test(keys.slice(0, 3));
			}


			$scope.filterResults = function() {
				if($scope.results.length > 0){
					$scope.results = $scope.results.filter(function(str) {
						return str.toUpperCase().includes($scope.searchStr.toUpperCase());
					  });
				}
				$scope.showDropdown = $scope.results.length > 0;
			  };

			$scope.selectResult = function (result) {
				if (result instanceof Array) {
					$scope.arrayVar = true;
					$scope.searchStr = result[0];
					$scope.stateNameID = result[1];
					$scope.selectedObject = result[0];
					$scope.results = [];
				} else {
					$scope.arrayVar = false;
					$scope.searchStr = result;
					$scope.selectedObject = result;
					$scope.results = [];
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
					$scope.searchStr = result;
					$scope.selectedObject = result;
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
						$scope.selectResult($scope.results[$scope.currentIndex]);
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
