angular.module('mainApp')
.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      }
   )};
  }]).controller('MyCtrl', function($scope) {
    var str = 'hello http://www.angularjs.org';
    var urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g;
    result = str.replace(urlRegEx, "<a ng-click=\"GotoLink('$1',\'_system\')\">$1</a>");
    $scope.GotoLink = function() { alert(); }
    $scope.name = result;
});
angular.module('onlyDigits', [])
    .directive('onlyDigits', function ()
    {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl)
            {

                modelCtrl.$parsers.push(function (inputValue)
                {
                    var transformedInput = inputValue ? inputValue.replace(/[^\d]/g, '') : null; 
                    if (transformedInput != inputValue)
                    {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        };
    });

angular.module('onlyAlphabets', [])
    .directive('onlyAlphabets', function ()
    {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl)
            {

                modelCtrl.$parsers.push(function (inputValue)
                {
                    var transformedInput = inputValue ? inputValue.replace(/[^A-Za-z ]/g, '') : null;
                    if (transformedInput != inputValue)
                    {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        };
    });
angular.module('onlyAlphabet', [])
    .directive('onlyAlphabet', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {


                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue ? inputValue.replace(/[^A-Za-z .']/g, '') : null;
                    if (transformedInput !== inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        };
    });
angular.module('alphaNumeric', [])
    .directive('alphaNumeric', function ()
    {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl)
            {

                modelCtrl.$parsers.push(function (inputValue)
                {
                    var transformedInput = inputValue ? inputValue.replace(/[^A-Za-z0-9 ]/g, '') : null;
                    if (transformedInput != inputValue)
                    {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        };
    });

    angular.module('restrictSpecialCharacters', [])
    .directive('restrictSpecialCharacters', function ()
    {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl)
            {

                modelCtrl.$parsers.push(function (inputValue)
                {
                   // var transformedInput = inputValue ? inputValue.replace(/[^@!#$%^&*()_+`\-={}|":?><,./;'[\]||'\w\d]/g, '') : null;
				   
				   var transformedInput = inputValue ? inputValue.replace(/[^@!#$%^&*()_+`\-={}|":?><,./;'[\]||'\w\d ]/g, '') : null;
                    if (transformedInput != inputValue)
                    {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        };
    });

    angular.module('alphaSpecial', [])
    .directive('alphaSpecial', function ()
    {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl)
            {

                modelCtrl.$parsers.push(function (inputValue)
                {
                    var transformedInput = inputValue ? inputValue.replace(/[^A-Za-z. ]/g, '') : null;
                    if (transformedInput != inputValue)
                    {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        };
    });

    angular.module('stopCcp', [])
    .directive('stopCcp', function ()
    {
        return {
            require: 'ngModel',
            link:function(scope,element){
                element.on('cut copy paste', function (event) {
                  event.preventDefault();
                });
            }
        };
    });
	
	    angular.module('owlCarousel', [])
    .directive("owlCarousel", ['$timeout',function($timeout) {
        return {
            restrict: 'E',
            transclude: false,
            link: function (scope) {
                  scope.initCarousel = function(element) {
                     $timeout(function () {
                        // provide any default options you want
                          var defaultOptions = {
                          };
                          var customOptions = scope.$eval($(element).attr('data-options'));
                          // combine the two options objects
                          for(var key in customOptions) {
                              defaultOptions[key] = customOptions[key];
                          }
                          // init carousel
                          $(element).owlCarousel(defaultOptions);
                     },50);
              };
            }
        };
    }])
    angular.module('owlCarouselItem', [])
    .directive('owlCarouselItem', [function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element) {
              // wait for the last item in the ng-repeat then call init
                if(scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }]);

    angular.module('ngRightClick', [])
    .directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    });
      angular.module('ngDecimal', [])
      .directive('ngDecimal', function(){
        return {
            restrict: 'A',
            link: function($scope, $element, $attributes){
                var limit = $attributes.ngDecimal;
                function caret(node) {
                    if(node.selectionStart) {
                        return node.selectionStart;
                    }
                    else if(!document.selection) {
                        return 0;
                    }
                    //node.focus();
                    var c		= "\001";
                    var sel	= document.selection.createRange();
                    var txt	= sel.text;
                    var dul	= sel.duplicate();
                    var len	= 0;
                    try{ dul.moveToElementText(node); }catch(e) { return 0; }
                    sel.text	= txt + c;
                    len		= (dul.text.indexOf(c));
                    sel.moveStart('character',-1);
                    sel.text	= "";
                    return len;
                }
                $element.bind('keypress', function(event){
                    var charCode = (event.which) ? event.which : event.keyCode;
                    var elem=document.getElementById($element.attr("id"));
                    if (charCode == 45){
                        var caretPosition=caret(elem);
                        if(caretPosition==0){
                            if($element.val().charAt(0)!="-" ){
                                if($element.val() <=limit){
                                    $element.val("-"+$element.val());
                                }
                            }
                            if($element.val().indexOf("-")!=-1){
                                event.preventDefault();
                                return false;
                            }
                        }
                        else{
                            event.preventDefault();
                        }
                    }
                    if (charCode == 46){
                        if($element.val().length>limit-1){
                            event.preventDefault();
                            return false;
                        }
                        if ($element.val().indexOf('.') !=-1){
                            event.preventDefault();
                            return false;
                        }
                        return true;
                    }
                    if (charCode != 45 && charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
                        event.preventDefault();
                        return false;
                    }
                    if($element.val().length>limit-1){
                        event.preventDefault();
                        return false;
                    }
                    return true;
                });
            }
        };
    });