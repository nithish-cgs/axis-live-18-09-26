mainApp.controller('genLinkController', ['$scope', '$rootScope', '$state', 'serverService', '$timeout', function ($scope, $rootScope, $state, serverService, $timeout) {
    if (sessionStorage.getItem('RMModule') == 'true') {
        $rootScope.formData.RMModule = true;
        $rootScope.gendisabled = false
        $scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
        $scope.getRMLGLCCode = sessionStorage.getItem('RMLGLCCode')
        if ($scope.getRMLGLCCode) {
            $scope.lgCode = $scope.getRMLGLCCode;
            $scope.lcCode = $scope.getRMLGLCCode;
            $scope.lgdisabled = true;
        }
        if (!$rootScope.formData.rmcode) {
            if (sessionStorage.getItem('RMCode')) {
                $rootScope.formData.fields.rmcode = sessionStorage.getItem('RMCode');
            } else {
                sessionStorage.clear();
                $rootScope.emailMobile = true;
                $rootScope.pan = false;
                $state.go('register');
            }
        }
    }
    if (!$rootScope.formData.RMModule) {
        sessionStorage.clear();
        $rootScope.emailMobile = true;
        $rootScope.pan = false;
        $state.go('register');
    }

    $scope.getPlanList = function () {
        var url = "GetALLPlanByBusinessTypeWebRM";
        var m = "W";

        var sendData = {
            ReferenceNumber: '',
            BusinessType: 'DIY',
            Mode: 'W'
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(url, sendData).then(function (a) {
            $rootScope.formData.apiLoading = false;
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            $scope.planList = response;
            if (response) {
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].DefaultProduct) {
                            //$scope.dfPlan = response[i].ProductId;
                        }
                    }

                    if (!$scope.dfPlan) {
                        //$scope.dfPlan = response[0].ProductId;
                    }

                    $scope.owlOptionsTestimonials = {
                        loop: false,
                        autoPlay: 4000,
                        stopOnHover: true,
                        slideSpeed: 300,
                        paginationSpeed: 600,
                        items: 3,
                        nav: true,
                        dots: false,
                        autoWidth: true,
                        navText: ["<img src='assets/images/leftarrowNew.png'>", "<img src='assets/images/rightarrowNew.png'>"],
                        center: false,
                        responsive: {
                            0: {
                                items: 1,
                                nav: true,
                                autoWidth: true,
                            },
                            600: {
                                items: 2,
                                nav: true,
                                autoWidth: true,
                            },
                            1000: {
                                items: 3,
                                nav: true,
                                autoWidth: true,
                            }
                        }
                    }

                    /*setTimeout(function(){
                        document.getElementById($scope.dfPlan).checked = true;
                    })*/
                }
            }
        });
    }

    $scope.getPlanList();

    /* var url = "GetALLPlanList?ReferenceNumber=";
     serverService.getApi(url).then(function (a) {
         var response = a.data;
         $scope.paymentProductId = response[0].ProductId;
         $scope.paymentProductIdTwo = response[1].ProductId;
         $scope.paymentProductIdThree = response[2].ProductId;
     });*/

    $scope.initChecBox = function () {
        $('input[type=checkbox]#derivativesAll').on('ifChecked', function (event) {

            $("input[type=checkbox][name=derivatives]").iCheck('check');
            $("input[type=checkbox][name=derivatives]").iCheck('enable');
            $scope.derivativesSelect = true;

        });

        $('input[type=checkbox]#derivativesAll').on('ifUnchecked', function (event) {

            $("input[type=checkbox][name=derivatives]").iCheck('uncheck');
            $("input[type=checkbox][name=derivatives]").iCheck('disable');
            $scope.derivativesSelect = false;

        });

        $('input[type=checkbox][name=derivatives]').on('ifUnchecked', function (event) {

            if ($("input[type='checkbox'][name='derivatives']:checked").length == 0) {
                $('input[type=checkbox]#derivativesAll').iCheck('uncheck');
                $("input[type=checkbox][name=derivatives]").iCheck('disable');
                $scope.derivativesSelect = false;
            } else {

                $(this).iCheck('disable');
            }

        });
    }

    setTimeout(function () {
        $('#equity').prop('checked', true);
        $('#equity').iCheck('disable');
        $('#mutualfunds').prop('checked', true);
        $('#mutualfunds').iCheck('disable');
        $('.customcheckradio').iCheck({
            checkboxClass: 'icheckbox_minimal',
            radioClass: 'iradio_minimal'
        });
        $scope.initChecBox();
    }, 100);

    $scope.getBankList = function () {
        var s_url = "DIYGetBankName";

        serverService.getApi(s_url).then(function (a) {
            var response = a.data;
            if (response.IsSuccess) {
                $rootScope.formData.bankList = response.BankDetailsList;
                setTimeout(function () {
                    $("select").select2();
                }, 200);
            } else if (!response.IsSuccess && response.ErrorCode == '-1') {
                $rootScope.formData.apiLoading = false;
                $rootScope.formData.panStatus1 = response.ErrorMessage;
                var paninformation = new bootstrap.Modal(document.getElementById('paninformation1'), {
                    backdrop: 'static',
                    keyboard: false
                });
                paninformation.show();
                return
            }
        });
    }

    $scope.getBankList();

    $scope.genLink = function () {
        $scope.fpError = false;
        $rootScope.gendisabled = true
        $rootScope.genUrlError = false;
        var params = null;
        if ($scope.lgCode) {
            params = "lgcode=" + $scope.lgCode;
        }

        if ($scope.lcCode) {
            if (params) {
                params = params + "&lccode=" + $scope.lcCode;
            } else {
                params = "lccode=" + $scope.lcCode;
            }
        }

        if ($('#pBank').val()) {
            if (params) {
                params = params + "&bankname=" + $('#pBank').val();
            } else {
                params = "bankname=" + $('#pBank').val();
            }
        }

        var segment = 1;

        if ($('#equityderivatives').is(':checked') && $('#commodityderivatives').is(':checked') && $('#currency').is(':checked')) {
            segment = 2;
        } else if ($('#commodityderivatives').is(':checked') && $('#currency').is(':checked')) {
            segment = 3;
        } else if ($('#equityderivatives').is(':checked') && $('#currency').is(':checked')) {
            segment = 4;
        } else if ($('#equityderivatives').is(':checked') && $('#commodityderivatives').is(':checked')) {
            segment = 5;
        } else if ($('#equityderivatives').is(':checked')) {
            segment = 6;
        } else if ($('#commodityderivatives').is(':checked')) {
            segment = 7;
        } else if ($('#currency').is(':checked')) {
            segment = 8;
        }

        if (params) {
            params = params + "&segment=" + segment;
        } else {
            params = "segment=" + segment;
        }

        if ($('input[name=axisDirect]:radio:checked').val()) {
            if (params)
                params = params + "&planId=" + $('input[name=axisDirect]:radio:checked').val();
            else {
                params = "planId=" + $('input[name=axisDirect]:radio:checked').val();
            }
            let a = $('input[name=axisDirect]:radio:checked').attr('id').split('-');

            let b = a[1];

            $scope.isfreedonplan = $scope.planList[b].Isfreedomplan;
        }



        if ($('#pBank').val()) {
            if (params) {
                params = params + "&UTM_bank=" + $('#pBank').val();
            } else {
                params = "UTM_bank=" + $('#psBank').val();
            }
            $scope.pBank = $('#pBank').val();
        }
        if ($('#psBank').val()) {
            if (params) {
                params = params + "&bankshortcode=" + $('#psBank').val();
            } else {
                params = "bankshortcode=" + $('#psBank').val();
            }
        }
        if ($('#dpValue').val()) {
            if (params) {
                params = params + "&DP=" + $('#dpValue').val();
            } else {
                params = "DP=" + $('#pBank').val();
            }
        }
        if ($('#isCmlcopy').val()) {
            if (params) {
                params = params + "&IsCMLCopy=" + $('#isCmlcopy').val();
            } else {
                params = "IsCMLCopy=" + $('#isCmlcopy').val();
            }
        }
        if ($("#refCode").val()) {
            if (params) {
                params = params + "&ReferralCode=" + $("#refCode").val();
            } else {
                params = "ReferralCode=" + $("#refCode").val()
            }
        }

        if ($("#promoCode").val()) {
            if (params) {
                params = params + "&PromoCode=" + $("#promoCode").val();
            } else {
                params = "PromoCode=" + $("#promoCode").val();
            }
        }

        if ($scope.isfreedonplan && $scope.pBank != 'AXB') {
            $scope.fpError = true;
            $scope.genUrl = '';
            return false;
        }

        if (params) {
            // $scope.genUrl = window.location.origin + serverService.getHome() + '/register?' + params + '&utm_campaign=Assisted link';
            // $scope.genUrl = `${window.location.origin}${serverService.getHome()}/register? ${params} &utm_campaign=Assisted link`;
            var rmTeamo = $rootScope.formData.RMTeam || sessionStorage.getItem('RMTeam');
			var btypeo = rmTeamo == 'Business Associate' ? 'Business Associate' : 'DIY';
            $scope.fullGenUrl = `${window.location.origin}${serverService.getHome()}axisdiy/register?${params}&utm_campaign=Assisted%20link&rmTeam=${encodeURIComponent(btypeo)}`;
            $scope.genUrl = $scope.fullGenUrl;
            var tinyUrlData = {
                'RMUserName': $rootScope.formData.fields.rmUsername || $rootScope.formData.fields.rmcode,
                'LongUrl': $scope.fullGenUrl,
            };
            var url = 'ConvertToTinyUrl';
            $rootScope.formData.apiLoading = true;
            serverService.apiCall(url, tinyUrlData).then(function (a) {
                var response = a.data;
                $rootScope.formData.apiLoading = false;
                if (response.IsSuccess && response.TinyUrl) {
                    $scope.genUrl = response.TinyUrl;
                }
            }, function () {
                $rootScope.formData.apiLoading = false;
            });
        }

    }
    if ($scope.genUrl == "" || $scope.genUrl == undefined) {
        $rootScope.gendisabled = false
    } else {
        $rootScope.gendisabled = true
    }
    $scope.productSelect = function () {
        $scope.fpError = false;
    }
    $scope.custimzeLinkMbl = function () {
        // $rootScope.formData.fields.cusemail=""
        $scope.cusinvalidMobile = false;
        $scope.cusinvalidEmail = false;
        $scope.cusemailempty = false
        $rootScope.cusempty = false;
        $rootScope.genUrlError = false;
        $scope.error = 0;
        if ($scope.genUrl == "" || $scope.genUrl == undefined) {
            $rootScope.genUrlError = true
            $scope.error++;
        } else {
            $rootScope.genUrlError = false
        }
        if (($rootScope.formData.fields.cusmobile == "" || $rootScope.formData.fields.cusmobile == undefined)) {
            $rootScope.cusempty = true;
            $scope.error++;
        }
        if ($rootScope.formData.fields.cusmobile) {
            if ($rootScope.mobileNumberValidation($rootScope.formData.fields.cusmobile) == false) {
                $scope.cusinvalidMobile = true;
                $scope.error++;
                $('#cusmobile').focus();
            }
        }
        if ($scope.error == 0) {
            $rootScope.cusempty = false;
            $scope.cusinvalidMobile = false;
            var url = "SendCustomizeurl";
            var sendData = {
                'MobileNumber': $rootScope.formData.fields.cusmobile,
                // 'EmailId': $rootScope.formData.fields.cusemail,
                'RMcode': $rootScope.formData.fields.rmcode,
                // 'CustomizeUrl': $scope.genUrl,
                'CustomizeUrl': $scope.fullGenUrl,
            };
            $rootScope.formData.apiLoading = true;
            serverService.apiCall(url, sendData).then(function (a) {
                var response = a.data;
                $rootScope.formData.apiLoading = false;
                $scope.genError = false
                if (response.IsSuccess) {
                    $scope.genError = false
                    $scope.gensuccess = response.SucessMessage
                    var genLinkModal = new bootstrap.Modal(document.getElementById('genLink'), {
                        backdrop: 'static',
                        keyboard: true
                    });
                    genLinkModal.show();
                    setTimeout(function () {
                        genLinkModal.hide();
                    }, 3000)

                } else {
                    $scope.genError = true
                    var genLinkModal = new bootstrap.Modal(document.getElementById('genLink'), {
                        backdrop: 'static',
                        keyboard: true
                    });
                    genLinkModal.show();
                    setTimeout(function () {
                        genLinkModal.hide();
                    }, 3000)
                    $scope.genErrorMessage = response.ErrorMessage
                }
            })
        }
    }
    $scope.custimzeLinkEmail = function () {
        // $rootScope.formData.fields.cusmobile=""
        $scope.cusinvalidEmail = false;
        $scope.cusinvalidMobile = false;
        $rootScope.cusempty = false;
        $scope.cusemailempty = false;
        $rootScope.genUrlError = false;
        $scope.error = 0;
        if ($scope.genUrl == "" || $scope.genUrl == undefined) {
            $rootScope.genUrlError = true
            $scope.error++;
        } else {
            $rootScope.genUrlError = false
        }
        if (($rootScope.formData.fields.cusemail == "" || $rootScope.formData.fields.cusemail == undefined)) {
            $scope.cusemailempty = true;
            $scope.error++;
        } else {
            $scope.cusemailempty = false;
        }
        if ($rootScope.formData.fields.cusemail) {
            $scope.filter = /^[\w-\.]+@[a-zA-Z]{1}([\w-]+\.)+[\w-]{2,4}$/g;
            if (!($scope.filter).test($rootScope.formData.fields.cusemail)) {
                $scope.cusinvalidEmail = true;
                $scope.error++;
                $('#cusemailID').focus();
            }
        }
        if ($scope.error == 0) {
            $rootScope.cusemailempty = false;
            $scope.cusinvalidEmail = false;
            var url = "SendCustomizeurl";
            var sendData = {
                // 'MobileNumber': $rootScope.formData.fields.cusmobile,
                'EmailId': $rootScope.formData.fields.cusemail,
                'RMcode': $rootScope.formData.fields.rmcode,
                // 'CustomizeUrl': $scope.genUrl,
                'CustomizeUrl': $scope.fullGenUrl,
            };
            $rootScope.formData.apiLoading = true;
            serverService.apiCall(url, sendData).then(function (a) {
                var response = a.data;
                $rootScope.formData.apiLoading = false;
                $scope.genError = false
                if (response.IsSuccess) {
                    $scope.genError = false
                    $scope.gensuccess = response.SucessMessage
                    var genLinkModal = new bootstrap.Modal(document.getElementById('genLink'), {
                        backdrop: 'static',
                        keyboard: true
                    });
                    genLinkModal.show();
                    setTimeout(function () {
                        genLinkModal.hide();
                    }, 3000)

                } else {
                    $scope.genError = true
                    var genLinkModal = new bootstrap.Modal(document.getElementById('genLink'), {
                        backdrop: 'static',
                        keyboard: true
                    });
                    genLinkModal.show();
                    setTimeout(function () {
                        genLinkModal.hide();
                    }, 3000)
                    $scope.genErrorMessage = response.ErrorMessage
                }
            })
        }
    }
    $scope.copyTxt = function () {
        const el = document.createElement('textarea');
        el.value = $scope.genUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        $scope.copied = true;
        $timeout(function () {
            $scope.copied = false;
        }, 2000)
    }

}
]);
