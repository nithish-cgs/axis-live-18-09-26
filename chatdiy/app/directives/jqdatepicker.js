var datePicker = angular.module('app', []);

angular.module('jqdatepicker', []).directive('jqdatepicker', function ($parse, $http, $sce, $timeout, $rootScope, serverService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            var d = new Date();
            var year = d.getFullYear() - 18;
            element.datepicker({
                dateFormat: 'dd/mm/yy',
				yearRange: '1910:2000',
                onSelect: function (value, ui) {
                    var dateStr = value.split("/");
                    var date = dateStr[0];
                    var month = dateStr[1];
                    var year = dateStr[2];

                    var NewDate = month + "/" + date + "/" + year;

                    $rootScope.formData.fields.DOB = year + "-" + month + "-" + date;

                    //var NewDate = dateStr[1], dateStr[0], dateStr[2];
                    var current = new Date().getTime(), dateSelect = new Date(NewDate).getTime();
                    age = current - dateSelect;
                    ageGet = Math.floor(age / 1000 / 60 / 60 / 24 / 365.25); // age / ms / sec / min / hour / days in a year
                    if(ageGet < 18){
                        $rootScope.less_than_18(ageGet);
                    }else{
                        $rootScope.greater_than_18(ageGet);
                    }
                  
                },
                changeMonth: true,
                changeYear: true,
                defaultDate: '-18yr',
            })//.attr("readonly", "readonly"); //prevent manual changes
        }
    };
});