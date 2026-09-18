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
    angular.module('onlyAlphabetsDot', [])
    .directive('onlyAlphabetsDot', function ()
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

angular.module('NgEnter', [])
    .directive('ngEnter', function ()
    {
        return function (scope, element, attrs)
        {
            element.bind("keypress", function (e)
            {
                if (e.which === 13)
                {
                    scope.$apply(function ()
                    {
                        scope.$eval(attrs.ngEnter, { 'e': e });
                    });
                    e.preventDefault();
                }
            });
        };
    });
angular.module('focusMe', [])
    .directive('focusMe', function ($timeout)
    {
        return {
            scope: { trigger: '@focusMe' },
            link: function (scope, element)
            {
                scope.$watch('trigger', function (value)
                {
                    if (value === "true")
                    {
                        // console.log('trigger',value);
                        $timeout(function ()
                        {
                            element[0].focus();
                        });
                    }
                });
            }
        }
    });

angular.module('progressBar', [])
.directive('progressBar', [
        function ()
        {
            return {
                link: function ($scope, el, attrs)
                {
                    $scope.$watch(attrs.progressBar, function (newValue)
                    {
                        el.css('width', newValue.toString() + '%');
                    });
                }
            };
        }
]);

angular.module('components', [])
   .directive('uppercased', function () {
       return {
           require: 'ngModel',
           link: function (scope, element, attrs, modelCtrl) {
               modelCtrl.$parsers.push(function (input) {
                   return input ? input.toUpperCase() : "";
               });
               element.css("text-transform", "uppercase");
           }
       };
   });


angular.module('loadingPane', [])
    .directive('loadingPane', function ($timeout, $window) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var directiveId = 'loadingPane';

                var targetElement;
                var paneElement;
                var throttledPosition;

                function init(element) {
                    targetElement = element;

                    paneElement = angular.element('<div>');
                    paneElement.addClass('loading-pane');

                    if (attr['id']) {
                        paneElement.attr('data-target-id', attr['id']);
                    }

                    var spinnerImage = angular.element('<div>');
                    spinnerImage.addClass('spinner-image');
                    spinnerImage.appendTo(paneElement);

                    angular.element('body').append(paneElement);

                    setZIndex();

                    //reposition window after a while, just in case if:
                    // - watched scope property will be set to true from the beginning
                    // - and initial position of the target element will be shifted during page rendering
                    $timeout(position, 100);
                    $timeout(position, 200);
                    $timeout(position, 300);

                    //throttledPosition = _.throttle(position, 50);
                    angular.element($window).scroll(throttledPosition);
                    angular.element($window).resize(throttledPosition);
                }

                function updateVisibility(isVisible) {
                    if (isVisible) {
                        show();
                    } else {
                        hide();
                    }
                }

                function setZIndex() {
                    var paneZIndex = 500;

                    paneElement.css('zIndex', paneZIndex).find('.spinner-image').css('zIndex', paneZIndex + 1);
                }

                function position() {
                    paneElement.css({
                        'left': targetElement.offset().left,
                        'top': targetElement.offset().top,
                        'width': targetElement.outerWidth(),
                        'height': targetElement.outerHeight()
                    });
                }

                function show() {
                    paneElement.show();
                    position();
                }

                function hide() {
                    paneElement.hide();
                }

                init(element);

                scope.$watch(attr[directiveId], function (newVal) {
                    updateVisibility(newVal);
                });

                scope.$on('$destroy', function cleanup() {
                    paneElement.remove();
                    $(window).off('scroll', throttledPosition);
                    $(window).off('resize', throttledPosition);
                });
            }
        };
    });
	
	
	

