angular.module("otpInputDirective", [])
.directive('otpInputDirective', ['$timeout', '$rootScope', function($timeout,$rootScope) {
    return {
        restrict: 'A', // restrict by attribute
        scope: {
            options: "="
        },
        template: "<div>" +
        "<input type='{{type}}' ng-paste='handlePaste($event)' autocomplete='one-time-code' inputmode='numeric' ng-repeat=\"c in characters\" ng-keyup='onKeyUp($index,$event)' ng-keydown='onKeyDown($index,$event)' class='otpvalue otp{{$index}}' ng-model='c.value' id='otpInput{{c.index}}' name='otpInput{{c.index}}' ng-style=\"style\" placeholder=\"{{placeholder}}\" maxlength=\"1\"  />\n" +
        "</div>",
        link: function($scope, elem) {
            var size = parseInt($scope.options.size) || 6;
            var width = 100 / (size + 1);
            var margin = width / size;
            var tmp = [],
                elementArr = [];
            var DEFAULT_COLOR = "black";
            bColor="#5c5c5c";
            //generating a random number to attach to id
            var randomNumber = Math.floor(Math.random() * 10000) + 100
            $scope.style = {
                "margin-right": margin + "%",
                "border": "2px solid",
                "border-radius": "5px",
                "display": "inline-block",
                "width": width + "%",
                "text-align": "center",
                "padding": "5px 0px",
                "outline":"none",
                "box-shadow":"none",
                "background":"transparent",
                "border-color": bColor,
                "color":  DEFAULT_COLOR,
                "font-size": $scope.options.style && $scope.options.style.fontSize ? scope.options.style.fontSize : "20px"
            };

            $scope.type = $scope.options.type ? $scope.options.type : "text";
            $scope.placeholder = $scope.options.placeholder && $scope.options.placeholder.length === 1 ? $scope.options.placeholder : "";
           
            $scope.setOtpValue = function() {
                $scope.options.value = "";
                var done = true;
                angular.forEach($scope.characters, function(v, k) {
                    if (v.value.length !== 1) {
                        done = false;
                        return false;
                    }
                    $scope.options.value = $scope.options.value + v.value;
                });
                if (done) {
                    if (typeof($scope.options.onDone) === "function") {
                        $scope.options.onDone($scope.options.value);
                    }
                }
            };
            $scope.onKeyUp = function(index, e) {
                var key = e.keyCode || e.which;
                var old = $scope.options.value;
                // $scope.paste()
                $scope.setOtpValue();
                if ($scope.characters[index].value.length > 0 && key !== 8 && index != size - 1) {
                    $timeout(function() {
                        elementArr[index + 1][0].focus();
                    });
                }
                if (typeof($scope.options.onChange) === "function" && old !== $scope.options.value) {
                    $scope.options.onChange($scope.options.value);
                }

            };

            $scope.onKeyDown = function(index, e) {
                var key = e.keyCode || e.which;
                if (key === 8 && $scope.characters[index].value === "" && index !== 0) {
                    $timeout(function() {
                        elementArr[index - 1][0].focus();
                    });
                }
                $scope.options.onChange($scope.options.value);
            };
            $scope.validateNumber = function(val){
                return val && /^\d*\.?\d*$/.test(val);
            }
           
            $scope.handlePaste = function(e) {
                // Get pasted data via clipboard API
                let clipboardData = e.originalEvent.clipboardData;
                if(clipboardData){
                 var pastedData =clipboardData.getData('Text').trim();
                }
                // Stop data actually being pasted into div
                e.stopPropagation();
                e.preventDefault();
                if (!pastedData || (!$scope.validateNumber(pastedData))) {
                  return;
                }
                $scope.options.value = pastedData
                var $inp = $scope.characters
                const s = [...pastedData]; 
                $scope.dataval = s;
                setTimeout(function(){
                    $rootScope.formData.fields.MobileResumeOTP = pastedData;
                    $rootScope.formData.fields.MobileTrackStatusOTP  = pastedData;
                    $rootScope.formData.fields.registerResumeOTP  = pastedData;
                    $rootScope.formData.fields.MobileNewOTP  = pastedData;
                },200)
                for(i=0;i < $scope.dataval.length; i++){
                    $('.otp'+i).val($scope.dataval[i])
                }
              
            }
            for (var i = 0; i < size; i++) {
                tmp.push({
                    index: randomNumber + "-" + i,
                    value: ""
                });
            }
            $scope.characters = tmp;

            $timeout(function() {
                for (var i = 0; i < size; i++) {
                    elementArr.push(angular.element(document.querySelector("#otpInput" + randomNumber + "-" + i)));
                }
            });
        }
    }
}]);