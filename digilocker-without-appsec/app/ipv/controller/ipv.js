mainApp.controller('ipvController', ['$scope', '$rootScope', '$state', 'serverService', '$timeout' , '$sce' , function ($scope, $rootScope, $state, serverService, $timeout , $sce) {
    $scope.IPVSection = true;
    $scope.IPVApiError = false;
    $scope.IpvFinsh = false;
    $scope.showVideo = false;
    $scope.videoUrl = "";
    $scope.IPVCount = 0;

    // $scope.IpvOverall = function () {
    //     var s_geturl = "GetOverallStatusDIY";
    //     $rootScope.formData.apiLoading = true;
    //     var sendData = {
    //         ReferenceNumber: $rootScope.formData.eRefNumber
    //     };
    //     serverService.apiCall(s_geturl, sendData).then(function (a) {
    //         var response = a.data;
    //         $rootScope.formData.apiLoading = false;
    //         if(response.Digilocker != "Y"){
    //             $scope.IPVSection = true;
    //         }
    //     })
    // }
    $rootScope.startIPV = function (){
        var s_geturl = "IdfyVideoIpvTracking";
                $rootScope.formData.apiLoading = true;
                var sendData = {
                    ReferenceNumber: $rootScope.formData.eRefNumber,
                    VideoIPV:true,
                    Status:"I"
                };
                serverService.apiCall(s_geturl, sendData).then(function (a) {
                    var response = a.data;
                    $rootScope.formData.apiLoading = false;
                    if(response.IsSuccess){
                        $rootScope.UploadIpv();
                    } else {
                        console.log(response['ErrorMessage'])
                    }
                })
    }
    $rootScope.UploadIpv = function () {
        var s_url = "IdfyCreateProfile";
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber,
            VideoIPV: true
        };
        $rootScope.formData.apiLoading = true;
        
        serverService.apiCall(s_url, sendData).then(function (d) {
            $rootScope.formData.apiLoading = false;
            var response = d.data;
            
            if (response.IsSuccess) {
                $scope.IPVLink = response.IdfyServiceUrl;
                $scope.IdfyDownLoadLink = response.profile_id;
                // location.assign(response.IdfyServiceUrl);
                $scope.ipvWindow = window.open(response.IdfyServiceUrl, '_blank', 'location=yes,scrollbars=yes,status=yes');
                $rootScope.callCheckApi = true;
                $scope.startInterval();
            } else {
                $scope.IPVApiError = true;
                $scope.IPVApiError = response.SuccessMessage;
            }
        });
    };
    
    $scope.startInterval = function () {
        $scope.intervalId = setInterval(function () {
            if ($rootScope.callCheckApi) {
                var s_geturl = "IdfyRecordListDownload";
                $rootScope.formData.apiLoading = true;
                
                var sendData = {
                    ReferenceNumber: $rootScope.formData.eRefNumber,
                    IdfyDownLoadLink: $scope.IdfyDownLoadLink
                };
                
                serverService.apiCall(s_geturl, sendData).then(function (a) {
                    var response = a.data;
                    $scope.IPVCount++;
                    if (response.IsSuccess) {
                        $rootScope.formData.apiLoading = false;
                        $rootScope.callCheckApi = false;
                        clearInterval($scope.intervalId);
                        
                        if ($scope.ipvWindow && !$scope.ipvWindow.closed) {
                            $scope.ipvWindow.close();
                        }
						 $scope.IPVCount = 0;
                        $scope.overall();
                    } else if ($scope.IPVCount == 15) {
                        $rootScope.formData.apiLoading = false;
                        $rootScope.callCheckApi = false;
                        clearInterval($scope.intervalId);
                        
                        if ($scope.ipvWindow && !$scope.ipvWindow.closed) {
                            $scope.ipvWindow.close();
                        }
                        $scope.IPVCount = 0;
                        const id = "commonModal";
                        var modal = new bootstrap.Modal(document.getElementById(id), {
                            backdrop: 'static',
                            keyboard: false
                        });
                        modal.show();
                    } else {
                        $rootScope.callCheckApi = true;
                    }
                });
            }
        }, 15000);
    };

    $scope.overall = function() {
        $rootScope.formData.apiLoading = true;
        const url = "GetOverallStatusDIY";
        const params = {
            ReferenceNumber: $rootScope.formData.eRefNumber
        }
        serverService.apiCall(url, params).then(function (a) {
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            if ($scope.ipvWindow && !$scope.ipvWindow.closed) {
                $scope.ipvWindow.close();
            }
            if (response && response.IsSuccess) {
                $rootScope.ipvRetakeCount = response.RetakeMaxCount;
                if (response.OverallStatusList[8].SPStatus == "Y") {
                    $scope.getImages();
                }
            }
        })
    }

    $scope.getImages = function () {
        $rootScope.formData.apiLoading = true;
        const url = 'DIYGetImagesByReferenceNumberFlag';
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber,
            IsDiy: true,
            EncryptToken: $rootScope.EncryptToken,
            Mobile: $rootScope.formData.fields.mobile,
            Email: $rootScope.formData.fields.email,
        }
        serverService.apiCall(url, sendData).then(function (a) {
            var response = a.data;
            $rootScope.formData.apiLoading = false;
            console.log(response);
            if (response.IsSuccess && response.IpvPOAandNomineeList.length > 0) {   
                let imageRes = response.IpvPOAandNomineeList.filter(data => data.ImageName == "IPVVideo");
                console.log(imageRes,"imageRes");
                if (imageRes[0].ImageFlag == "Y") {
                    // $scope.bindImage(imageRes[0].ImageName);
                    $scope.IpvFinsh = true;
                }
                
            }
            
        })
    }
    $scope.getImages();

    $scope.bindImage = function (img) {
        var s_url = "DIYGetImagebyRefNum";
        var sendData = {
            ReferenceNumber: $rootScope.formData.eRefNumber,
            IsDiy: true,
            ImageName: img
        }
        $rootScope.formData.apiLoading = true;
        serverService.apiCall(s_url, sendData).then(function (a) {
            $rootScope.formData.apiLoading = false;
            var res = a.data;
            console.log(res);
            if (res && res.IsSuccess && res.IpvPOAandNomineeList.length > 0 && res.IpvPOAandNomineeList[0].ImageUrl) {
                let base64Data = res.IpvPOAandNomineeList[0].ImageUrl;
                $scope.videoUrl = `data:video/webm;base64,${base64Data}`;
                $scope.showVideo = true;
            }
        })
    }
    
    $scope.goTO = function () {
         $state.go('Sip', { mobile: $rootScope.formData.EncMobile });
    }

    
}
]);