jQuery(document).bind("keyup keydown", function (e) {

            $('input[type=checkbox]').attr('disabled', 'true');

            //if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117)) {//Alt+c, Alt+v will also be disabled sadly.
            //    alert('not allowed');
            //}
            //return false;
        });
		
 $(document).ready(function () {
            var date = new Date();
            var dd = date.getDate();
            var mm = (date.getMonth() + 1);
            var yyyy = date.getFullYear();

            //var today='25082021';
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var strDate = dd.toString() + mm.toString() + yyyy.toString();
            if (date.getDate() < 8) {

            }
            for (var i = 0; i <= 7; i++) {
                var j = i + 1;
                $("#CurrentDate" + j).text(strDate[i]);

            }

            $('input[type=checkbox]').attr('disabled', 'true');
            document.addEventListener('contextmenu', event => event.preventDefault());
            // $(document).on("keydown", function (e) { if (e.keyCode >= 37 && e.keyCode <= 40) { e.stopImmediatePropagation(); return; } });
            BindData();
        });
        var RefNo = '';
        var token = '';
        function BindData() {

            RefNo = getParameterByName("ReferenceNumber");
            token = getParameterByName("token");
            var RxDigifinAppFromRequestObject = new Object();
            RxDigifinAppFromRequestObject.ReferenceNumber = RefNo;
            RxDigifinAppFromRequestObject.EncryptToken = token;
            var dataToSend = JSON.stringify(RxDigifinAppFromRequestObject);
            //var apiurl = WebAPILayer + "api/DIY/GetAppFormDetailsDIY";
            var apiurl = WebAPILayer + "api/DIY/GetAppFormDetailsDIYForPDFPreview";
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: dataToSend,
                url: apiurl,
                success: function (msg, status) {

                    var data = msg;
                    if (msg.IsSuccess == true) {
                        RefNo = msg.CRxDigifinAppFormInfoList[0].ReferenceNumber;
                        JsBarcode("#barcodeImage1", RefNo, {
                            width: 2,
                            height: 40,
                            displayValue: true
                        });
                        JsBarcode("#barcodeImage2", RefNo, {
                            width: 2,
                            height: 40,
                            displayValue: true
                        });
                        JsBarcode("#barcodeImage3", RefNo, {
                            width: 2,
                            height: 40,
                            displayValue: true
                        });
                        JsBarcode("#barcodeImage4", RefNo, {
                            width: 2,
                            height: 40,
                            displayValue: true
                        });

                    JsBarcode("#barcodeImage5", RefNo, {
                            width: 2,
                            height: 40,
                            displayValue: true
                        });
                        //Document are hide as per CR

                        //Document binding
                        // client photo
                        if (msg.CRxDigifinAppFormInfoList[0].ClientPhoto) {
                            $("#ax-section-clientphoto").show();
                            var PanImageBase64 = msg.CRxDigifinAppFormInfoList[0].ClientPhoto;
                            $("#ax-clientphoto").attr("src", PanImageBase64);
                        } else {
                            $("#ax-section-clientphoto").hide();
                        }
                        //Sign
                        if (msg.CRxDigifinAppFormInfoList[0].ClientSignuture) {
                            $("#ax-section-clientSign").show();
                            var PanImageBase64 = msg.CRxDigifinAppFormInfoList[0].ClientSignuture;
                            $("#ax-clientSign").attr("src", PanImageBase64);
                        } else {
                            $("#ax-section-clientSign").hide();
                        }

                        //Pan
                        if (msg.CRxDigifinAppFormInfoList[0].PanImageBase64) {
                            $("#ax-section-pancard").show();
                            var PanImageBase64 = msg.CRxDigifinAppFormInfoList[0].PanImageBase64;
                            $("#ax-pancard").attr("src", PanImageBase64);
                        } else {
                            $("#ax-section-pancard").hide();
                        }

                        $('#NameOfBankAccountFirstHolders,#CDName1').html(msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase());
                        $('#NameOfBankAccountSecondHolders,#CDName2').html(msg.CRxDigifinAppFormInfoList[0].SecondHoldername.toUpperCase());
                        $('#NameOfBankAccountThirdHolders,#CDName3').html(msg.CRxDigifinAppFormInfoList[0].ThirdrHoldername.toUpperCase());
                        var SecHolderName = msg.CRxDigifinAppFormInfoList[0].SecondHoldername.toUpperCase();
                        var ThirdHolderName = msg.CRxDigifinAppFormInfoList[0].ThirdrHoldername.toUpperCase();

                        $('#ax-page6-sole1stHolder,#ax-page8-sole1stHolder').html(msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase());
                        $('#ax-page6-2ndHolderBankAC').html(msg.CRxDigifinAppFormInfoList[0].SecondHoldername.toUpperCase());
                        $('#ax-page6-3ndHolderBankAC').html(msg.CRxDigifinAppFormInfoList[0].ThirdrHoldername.toUpperCase());




                        //Name Declaration
                        if (msg.CRxDigifinAppFormInfoList[0].Threein1Status == 'Y') {
                            $("#ax-section-NameDeclaration").addClass('page-setup');
                            $("#ax-section-NameDeclaration").show();
                            var today = new Date();
                            var dd = today.getDate();
                            var mm = today.getMonth() + 1; //January is 0!

                            var yyyy = today.getFullYear();
                            if (dd < 10) {
                                dd = '0' + dd;
                            }
                            if (mm < 10) {
                                mm = '0' + mm;
                            }
                            var today = dd + '/' + mm + '/' + yyyy;
                            $("#tdNameDescDate").text(today);

                            if (msg.CRxDigifinAppFormInfoList[0].ClientName) {
                                var CustomerName = msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase();
                                if (CustomerName != "") {
                                    $("#tdNameDeclaration").text(CustomerName);
                                    $("#tdClientPANName").val(CustomerName);
                                    $("#IdPANDataBaseName").text(CustomerName);
                                    $("#tdClientPANName1").text(CustomerName);


                                }
                            }
                            if (msg.CRxDigifinAppFormInfoList[0].CorrentAddress) {
                                var CorrespondenceAddress = msg.CRxDigifinAppFormInfoList[0].CorrentAddress.toUpperCase();
                                if (CorrespondenceAddress != "") {
                                    $("#tdNameDescAddress").text(CorrespondenceAddress);
                                }
                            }

                            if (msg.CRxDigifinAppFormInfoList[0].CCity) {
                                var CCity = msg.CRxDigifinAppFormInfoList[0].CCity.toUpperCase();
                                var CPinCode = msg.CRxDigifinAppFormInfoList[0].CPinCode;
                                if ((CCity != "") && (CPinCode != "")) {
                                    var citypin = CCity + ',' + CPinCode;
                                    $("#tdCityPIN").text(citypin);
                                }
                            }
                            if (msg.CRxDigifinAppFormInfoList[0].CState) {
                                var CState = msg.CRxDigifinAppFormInfoList[0].CState.toUpperCase();

                                if (CState != "") {
                                    var CCountry = "INDIA";
                                    var statecountry = CState + ',' + CCountry;
                                    $("#tdStateCountry").text(statecountry);

                                }
                            }
                            if (msg.CRxDigifinAppFormInfoList[0].ClientName3in1) {
                                var ClientName3in1 = msg.CRxDigifinAppFormInfoList[0].ClientName3in1.toUpperCase();
                                if (ClientName3in1 != "") {
                                    $("#IdAdharName").text(ClientName3in1);
                                }
                            }
                            if (msg.CRxDigifinAppFormInfoList[0].ClientSignuture) {
                                var ClientSignuture = msg.CRxDigifinAppFormInfoList[0].ClientSignuture;
                                if (ClientSignuture != "data:image/jpg;base64,") {
                                    $("#NameDeclarationSign").html("<img id='theclientSign44' />");
                                    $("#theclientSign44").attr("src", ClientSignuture);
                                }
                            }
                        }
                        else {
                            $("#ax-section-NameDeclaration").hide();
                        }

                        //Name Declaration





                        //Facta
                        $("#crsDeclarationTax1,#crsAddressCommunication,#quarterly").attr("checked", "checked");
                        $("#crsCountryOfBirth").val("INDIA");
                        $("#crsAddressResidetial").attr("checked", "checked");
                        $("#crsDeclareCountry1").text("INDIA");
                        $("#fatcaPlace").val(msg.CRxDigifinAppFormInfoList[0].CCity.toUpperCase());
                        if (msg.CRxDigifinAppFormInfoList[0].PANNumber) {
                            $("#crsDeclareIdentityNumber1").text(msg.CRxDigifinAppFormInfoList[0].PANNumber);
                        }
                        $("#crsDeclareTIN1").text("PAN");
                        if (msg.CRxDigifinAppFormInfoList[0].CorrentAddress) {
                            var CorrespondenceAddress = msg.CRxDigifinAppFormInfoList[0].CorrentAddress.toUpperCase();
                            $("#crsDeclareTaxPurpose1").text(CorrespondenceAddress);
                        }
                        ///Start IPV Section ////
                        if (msg.CRxDigifinAppFormInfoList[0].PersonOfIPV) {
                            var PersonOfIPV = msg.CRxDigifinAppFormInfoList[0].PersonOfIPV;
                            if (PersonOfIPV != "") {
                                for (var i = 0; i < PersonOfIPV.length; i++) {
                                    var j = i + 1;
                                    $("#officeUseIPV" + j).text(PersonOfIPV[i]);
                                }
                            }
                        }

                        $("#officeUseDesignation").val(msg.CRxDigifinAppFormInfoList[0].IPVDesignation);

                        if (msg.CRxDigifinAppFormInfoList[0].OrganisationName) {
                            var OrganisationName = msg.CRxDigifinAppFormInfoList[0].OrganisationName;
                            if (OrganisationName != "") {
                                for (var i = 0; i < OrganisationName.length; i++) {
                                    var j = i + 1;
                                    $("#officeUseorganisation" + j).text(OrganisationName[i]);
                                }
                            }
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].IPVDate) {
                            var IPVDate = msg.CRxDigifinAppFormInfoList[0].IPVDate;
                            IPVDate = IPVDate.replace('/', '');
                            IPVDate = IPVDate.replace('/', '');
                            if (IPVDate != "") {
                                for (var i = 0; i < IPVDate.length; i++) {
                                    var j = i + 1;
                                    $("#officeUseDate" + j).text(IPVDate[i]);
                                }
                            }
                        }
                        //////End--IPV Office Use////

                        //Second Page
                        if (msg.CRxDigifinAppFormInfoList[0].ClientAccountNumber) {
                            var ClientAccountNumber = msg.CRxDigifinAppFormInfoList[0].ClientAccountNumber;
                            $("#ax-page7-scheduleSecuritiesAcDetailsACNo").text(ClientAccountNumber);
                            if (ClientAccountNumber != "") {
                                for (var i = 0; i < ClientAccountNumber.length; i++) {
                                    var j = i + 1;
                                    $("#dematClientId" + j).text(ClientAccountNumber[i]);
                                    $("#nominationClientId" + j).text(ClientAccountNumber[i]);
                                    $("#bankdematBOID" + j).text(ClientAccountNumber[i]);
                                    $("#scheduleBankAcDetailsACCLINo" + j).text(ClientAccountNumber[i]);
                                }
                            }
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].DpIdNumber) {
                            var DPClientAccountNumber = msg.CRxDigifinAppFormInfoList[0].DpIdNumber;
                            if (DPClientAccountNumber != "") {
                                for (var i = 0; i < DPClientAccountNumber.length; i++) {
                                    var j = i + 1;
                                   
                                    $("#scheduleBankAcDetailsACCLINo" + j).text(DPClientAccountNumber[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].OccupationID) {
                            if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "1") {
                                $("#p7chkSFH_Occ_PublicSector").attr("checked", "checked");
                                $("#primaryApplicationPublic").attr("checked", "checked");
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "2") {
                                $("#p7chkSFH_Occ_PrivateSectorService").attr("checked", "checked");
                                $("#primaryApplicationPrivate").attr("checked", "checked");
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "3") {
                                $("#p7chkSFH_Occ_GovernmentService").attr("checked", "checked");
                                $("#primaryApplicationGvService").attr("checked", "checked");
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "4") {
                                $("#p7chkSFH_Occ_Business").attr("checked", "checked");
                                $("#primaryApplicationBusiness").attr("checked", "checked");

                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "5") {
                                $("#p7chkSFH_Occ_Professional").attr("checked", "checked");
                                $("#primaryApplicationProfessional").attr("checked", "checked");

                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "6") {
                                $("#p7chkSFH_Occ_Agriculturist").attr("checked", "checked");
                                $("#primaryApplicationSelfEmp").attr("checked", "checked");
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "7") {
                                $("#p7chkSFH_Occ_Retired").attr("checked", "checked");
                                $("#primaryApplicationRetired").attr("checked", "checked");
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "8") {
                                $("#p7chkSFH_Occ_Housewife").attr("checked", "checked");
                                $("#primaryApplicationHousewife").attr("checked", "checked");

                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "9") {
                                $("#p7chkSFH_Occ_Student").attr("checked", "checked");
                                $("#primaryApplication2Student").attr("checked", "checked");
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].OccupationID == "10") {
                                $("#p7chkSFH_Occ_ForexDealer").attr("checked", "checked");
                            }
                            else {
                                $("#p7chkSFH_Occ_Others").attr("checked", "checked");
                                $("#p7txtSFH_Occ_Others ").val(msg.CRxDigifinAppFormInfoList[0].Occupation.toUpperCase());
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].PoliticalExposure == "Y") {
                            $("#politicalExposedPerson1").attr("checked", "checked");
                        }
                        else if (msg.CRxDigifinAppFormInfoList[0].PoliticalExposure == "R") {
                            $("#relatedToPep1").attr("checked", "checked");
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].FatherCombineName) {
                            var FatherCombineName = msg.CRxDigifinAppFormInfoList[0].FatherCombineName.toUpperCase();
                            if (FatherCombineName != "") {
                                for (var i = 0; i < FatherCombineName.length; i++) {
                                    var j = i + 1;
                                    $("#OnefatherHusbandHolder" + j).text(FatherCombineName[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].BankName)
                            $("#userbank").text(msg.CRxDigifinAppFormInfoList[0].BankName);

                        if (msg.CRxDigifinAppFormInfoList[0].AccountNumber) {
                            var p12tdCID = msg.CRxDigifinAppFormInfoList[0].AccountNumber;
                            $("#ax-page7-scheduleBankAcDetailsACNo").text(msg.CRxDigifinAppFormInfoList[0].AccountNumber);
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].AccountNumber) {
                            var p12tdCID = msg.CRxDigifinAppFormInfoList[0].AccountNumber;
                            if (p12tdCID != "") {
                                for (var i = 0; i < p12tdCID.length; i++) {
                                    var j = i + 1;
                                    $("#p12tdCID" + j).text(p12tdCID[i]);

                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].AccountNumber) {
                            var AccountNumber = msg.CRxDigifinAppFormInfoList[0].AccountNumber;

                            if (AccountNumber != "") {
                                for (var i = 0; i < AccountNumber.length; i++) {
                                    var j = i + 1;
                                    $("#scheduleBankAcDetailsACNo" + j).text(AccountNumber[i]);
                                }
                            }
                        }
                        //if (msg.CRxDigifinAppFormInfoList[0].InterestInToBank == "Y")
                        //{
                        //    $("#bsda").text("Yes");
                        //}
                        //else {
                        //    $("#bsda").text("No");
                        //}

                        $("#bsda").text("N");
                        if (msg.CRxDigifinAppFormInfoList[0].ProductPlan == "Pr") {
                            $("#tariffFixedBrokeragePlan").attr("checked", "checked");
                        }
                        else if ((msg.CRxDigifinAppFormInfoList[0].ProductPlan != "Pr") && (msg.CRxDigifinAppFormInfoList[0].ProductPlan == "PA" || msg.CRxDigifinAppFormInfoList[0].ProductPlan == "IN")) {
                            $("#dematTariffForRetailOthers").attr("checked", "checked");
                            $("#tariffPlanCode").val(msg.CRxDigifinAppFormInfoList[0].SuitedFor);
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].IsThirdpartDp = "Y") {
                            if (msg.CRxDigifinAppFormInfoList[0].DematType == "NSDL") {
                                $("#nsdl1").text("Y");
                                $("#nominationNSDL").attr("checked", "checked");
                                $("#ChkNSDL").attr("checked", "checked");
                                $("#bankdematDP").val("NSDL");
                                var BankThirdDematID = msg.CRxDigifinAppFormInfoList[0].BankID;
                                if (BankThirdDematID) {
                                    for (var i = 0; i < BankThirdDematID.length; i++) {
                                        var j = i + 1;
                                        $("#p12tdBOID" + j).text(BankThirdDematID[i]);
                                    }
                                }
                            }
                            else {
                                $("#cdsl1").text("Y");
                                $("#nominationCDSL").attr("checked", "checked");
                                $("#ChkCDSL").attr("checked", "checked");
                                $("#bankdematDP").val("CDSL");

                                var BankThirdDematID = msg.CRxDigifinAppFormInfoList[0].BankID;
                                if (BankThirdDematID) {
                                    for (var i = 0; i < BankThirdDematID.length; i++) {
                                        var j = i + 1;
                                        $("#p12tdBOID" + j).text(BankThirdDematID[i]);
                                    }
                                }

                            }
                        }
                        else if (msg.CRxDigifinAppFormInfoList[0].DematType == "NSDL") {
                            $("#nsdl1").text("Y");
                            $("#nominationNSDL").attr("checked", "checked");
                            $("#ChkNSDL").attr("checked", "checked");
                            $("#bankdematDP").val("NSDL");
                            $("#p12tdBOID1").html("I");
                            $("#p12tdBOID2").html("N");
                            $("#p12tdBOID3").html("3");
                            $("#p12tdBOID4").html("0");
                            $("#p12tdBOID5").html("4");
                            $("#p12tdBOID6").html("2");
                            $("#p12tdBOID7").html("9");
                            $("#p12tdBOID8").html("5");

                        }
                        else {
                            $("#cdsl1").text("Y");
                            $("#nominationCDSL").attr("checked", "checked");
                            $("#ChkCDSL").attr("checked", "checked");
                            $("#bankdematDP").val("CDSL");
                            $("#p12tdBOID1").html("1");
                            $("#p12tdBOID2").html("2");
                            $("#p12tdBOID3").html("0");
                            $("#p12tdBOID4").html("4");
                            $("#p12tdBOID5").html("9");
                            $("#p12tdBOID6").html("2");
                            $("#p12tdBOID7").html("0");
                            $("#p12tdBOID8").html("0");

                        }


                        if (msg.CRxDigifinAppFormInfoList[0].NSEEquityCash == "Y") {
                            $("#nsecash").attr("checked", "checked");

                        }
                        if (msg.CRxDigifinAppFormInfoList[0].BSEEquityCash == "Y") {
                            $("#bseCash").attr("checked", "checked");
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].NSEEquityFandO == "Y") {
                            $("#nseFO").attr("checked", "checked");
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].MCXCommodity == "Y") {
                            $("#mcxCommodity").attr("checked", "checked");
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].NCDXCommodity == "Y") {
                            $("#ncdexCommodity").attr("checked", "checked");
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].NSECurrencyFandO == "Y") {
                            $("#nscCurrency").attr("checked", "checked");
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].AccountNumber) {
                            var p12tdCID = msg.CRxDigifinAppFormInfoList[0].AccountNumber;
                            if (p12tdCID != "") {
                                for (var i = 0; i < p12tdCID.length; i++) {
                                    var j = i + 1;
                                    $("#standingInstructionACNo" + j).text(p12tdCID[i]);

                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].IsNominee) {
                            var IsNominee = msg.CRxDigifinAppFormInfoList[0].IsNominee;
                            if (IsNominee == "1") {
                                $('#isNominee').prop('checked', true);
                            }
                            else {
                                $('#isNonominee').prop('checked', true);
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].NomineeProofId) {
                            if (msg.CRxDigifinAppFormInfoList[0].NomineeProofId == 111)//Aadhar
                            {
                                if (msg.CRxDigifinAppFormInfoList[0].NomineeIDProofNumber) {
                                    var NomineePfNumber = msg.CRxDigifinAppFormInfoList[0].NomineeIDProofNumber;
                                    if (NomineePfNumber != "") {
                                        for (var i = 0; i < NomineePfNumber.length; i++) {
                                            var j = i + 1;
                                            $("#dpNomineeAadhaarNo" + j).text(NomineePfNumber[i]);
                                        }
                                    }
                                }
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].NomineeProofId == 118)//Pan
                            {
                                if (msg.CRxDigifinAppFormInfoList[0].NomineeIDProofNumber) {
                                    var NomineePfNumber = msg.CRxDigifinAppFormInfoList[0].NomineeIDProofNumber;
                                    if (NomineePfNumber != "") {
                                        for (var i = 0; i < NomineePfNumber.length; i++) {
                                            var j = i + 1;
                                            $("#dpNomineePanNo" + j).text(NomineePfNumber[i]);
                                            $("#nomineePAN" + j).text(NomineePfNumber[i]);
                                        }
                                    }
                                }

                            }
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].GuardianProofId) {
                            if (msg.CRxDigifinAppFormInfoList[0].GuardianProofId == 111)//Aadhar
                            {
                                if (msg.CRxDigifinAppFormInfoList[0].GuardianIDProofNumber) {
                                    var GuardianIDProofNumber = msg.CRxDigifinAppFormInfoList[0].GuardianIDProofNumber;
                                    if (GuardianIDProofNumber != "") {
                                        for (var i = 0; i < GuardianIDProofNumber.length; i++) {
                                            var j = i + 1;
                                            $("#dpGuardianAadhaarNo" + j).text(GuardianIDProofNumber[i]);
                                        }
                                    }
                                }
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].GuardianProofId == 118)//Pan
                            {
                                if (msg.CRxDigifinAppFormInfoList[0].GuardianIDProofNumber) {
                                    var GuardianIDProofNumber = msg.CRxDigifinAppFormInfoList[0].GuardianIDProofNumber;
                                    if (GuardianIDProofNumber != "") {
                                        for (var i = 0; i < GuardianIDProofNumber.length; i++) {
                                            var j = i + 1;
                                            $("#dpGuardianPanNo" + j).text(GuardianIDProofNumber[i]);
                                        }
                                    }
                                }

                            }
                        }


                        if (msg.CRxDigifinAppFormInfoList[0].DPID) {
                            $('#dematACID1').val(msg.CRxDigifinAppFormInfoList[0].DPID);
                        }
                        $('#dematACID2').val(msg.CRxDigifinAppFormInfoList[0].ClientAccountNumber);
                        if (msg.CRxDigifinAppFormInfoList[0].ClientName) {
                            $('#oneAdditionalDetailsHolder1').val(msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase());
                        }
                        $("#electonicReport").attr("checked", "checked");
                        //Client req 23/07/2019
                        //  $('#CDClientCode').text(msg.CRxDigifinAppFormInfoList[0].ClientAccountNumber);
                        if (msg.CRxDigifinAppFormInfoList[0].ShareEmailWithRTA == "Y") {
                            $("#dpShareWithRTA").text(msg.CRxDigifinAppFormInfoList[0].ShareEmailWithRTA);
                        }
                        else {
                            $("#dpShareWithRTA").text('N');
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].UID) {
                            var UID = msg.CRxDigifinAppFormInfoList[0].UID;
                            if (UID != "") {
                                for (var i = 0; i < UID.length; i++) {
                                    var j = i + 1;
                                    $("#tdAadhaarNumber" + j).text(UID[i]);
                                }
                            }
                        }
                        //Secod Page

                        $("#applicationNew").attr("checked", "checked");
                        if (msg.CRxDigifinAppFormInfoList[0].ClientName) {
                            var CustomerName = msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase();
                            if (CustomerName != "") {
                                for (var i = 0; i < CustomerName.length; i++) {
                                    var j = i + 1;
                                    $("#tdCustomerName_" + j).text(CustomerName[i]);
                                }
                            }
                        }
                        // client name
                        if (msg.CRxDigifinAppFormInfoList[0].Title) {
                            var Title = msg.CRxDigifinAppFormInfoList[0].Title.toUpperCase();
                            if (Title != "") {
                                for (var i = 0; i < Title.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationNamePre" + j).text(Title[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].FirstName) {
                            var FirstName = msg.CRxDigifinAppFormInfoList[0].FirstName.toUpperCase();
                            if (FirstName != "") {
                                for (var i = 0; i < FirstName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationNameFname" + j).text(FirstName[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].MiddleName) {
                            var MiddleName = msg.CRxDigifinAppFormInfoList[0].MiddleName.toUpperCase();
                            if (MiddleName != "") {
                                for (var i = 0; i < MiddleName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationNameMname" + j).text(MiddleName[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].LastName) {
                            var LastName = msg.CRxDigifinAppFormInfoList[0].LastName.toUpperCase();
                            if (LastName != "") {
                                for (var i = 0; i < LastName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationNameLname" + j).text(LastName[i]);
                                }
                            }
                        }
                        //Maiden name
                        if ((msg.CRxDigifinAppFormInfoList[0].MaidenNamePrefix) & (msg.CRxDigifinAppFormInfoList[0].MaidenNamePrefix != "0")) {
                            var MaidenNamePrefix = msg.CRxDigifinAppFormInfoList[0].MaidenNamePrefix.toUpperCase();
                            if (MaidenNamePrefix != "") {
                                for (var i = 0; i < MaidenNamePrefix.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationMaidenPre" + j).text(MaidenNamePrefix[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].MaidenNameFirstName) {
                            var MaidenNameFirstName = msg.CRxDigifinAppFormInfoList[0].MaidenNameFirstName.toUpperCase();
                            if (MaidenNameFirstName != "") {
                                for (var i = 0; i < MaidenNameFirstName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationMaidenFname" + j).text(MaidenNameFirstName[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].MaidenNameMiddleName) {
                            var MaidenNameMiddleName = msg.CRxDigifinAppFormInfoList[0].MaidenNameMiddleName.toUpperCase();
                            if (MaidenNameMiddleName != "") {
                                for (var i = 0; i < MaidenNameMiddleName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationMaidenMname" + j).text(MaidenNameMiddleName[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].MaidenNameLastName) {
                            var MaidenNameLastName = msg.CRxDigifinAppFormInfoList[0].MaidenNameLastName.toUpperCase();
                            if (MaidenNameLastName != "") {
                                for (var i = 0; i < MaidenNameLastName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationMaidenLname" + j).text(MaidenNameLastName[i]);
                                }
                            }
                        }
                        //Father name
                        if (msg.CRxDigifinAppFormInfoList[0].FSPrefix) {
                            var FSPrefix = msg.CRxDigifinAppFormInfoList[0].FSPrefix.toUpperCase();
                            if (FSPrefix != "") {
                                for (var i = 0; i < FSPrefix.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationFatherPre" + j).text(FSPrefix[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].FatherHusName) {
                            var FatherHusName = msg.CRxDigifinAppFormInfoList[0].FatherHusName.toUpperCase();
                            if (FatherHusName != "") {
                                for (var i = 0; i < FatherHusName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationFatherFname" + j).text(FatherHusName[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].FatherMiddleName) {
                            var FatherMiddleName = msg.CRxDigifinAppFormInfoList[0].FatherMiddleName.toUpperCase();
                            if (FatherMiddleName != "") {
                                for (var i = 0; i < FatherMiddleName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationFatherMname" + j).text(FatherMiddleName[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].FatherLastName) {
                            var FatherLastName = msg.CRxDigifinAppFormInfoList[0].FatherLastName.toUpperCase().trim();
                            if (FatherLastName != "") {
                                for (var i = 0; i < FatherLastName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationFatherLname" + j).text(FatherLastName[i]);
                                }
                            }
                        }

                        //Mother name
                        if (msg.CRxDigifinAppFormInfoList[0].MotherNamePrefix) {
                            var MotherNamePrefix = msg.CRxDigifinAppFormInfoList[0].MotherNamePrefix.toUpperCase();
                            if (MotherNamePrefix != "") {
                                for (var i = 0; i < MotherNamePrefix.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationMotherPre" + j).text(MotherNamePrefix[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].MotherName) {
                            var MotherName = msg.CRxDigifinAppFormInfoList[0].MotherName.toUpperCase();
                            if (MotherName != "") {
                                for (var i = 0; i < MotherName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationMotherFname" + j).text(MotherName[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].MotherNameMiddleName) {
                            var MotherNameMiddleName = msg.CRxDigifinAppFormInfoList[0].MotherNameMiddleName.toUpperCase();
                            if (MotherNameMiddleName != "") {
                                for (var i = 0; i < MotherNameMiddleName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationMotherMname" + j).text(MotherNameMiddleName[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].MotherNameLastName) {
                            var MotherNameLastName = msg.CRxDigifinAppFormInfoList[0].MotherNameLastName.toUpperCase().trim();
                            if (MotherNameLastName != "") {
                                for (var i = 0; i < MotherNameLastName.length; i++) {
                                    var j = i + 1;
                                    $("#primaryApplicationMotherLname" + j).text(MotherNameLastName[i]);
                                }
                            }
                        }



                        //IDENTITY DETAILS
                        if (msg.CRxDigifinAppFormInfoList[0].FatherCombineName) {
                            var FatherCombineName = msg.CRxDigifinAppFormInfoList[0].FatherCombineName.toUpperCase();
                            if (FatherCombineName != "") {
                                for (var i = 0; i < FatherCombineName.length; i++) {
                                    var j = i + 1;
                                    $("#tdFatherHusName_" + j).text(FatherCombineName[i]);
                                }
                            }
                        }

                        //Gender Status
                        if (msg.CRxDigifinAppFormInfoList[0].Gender == "M")
                            $("#chkMale").attr("checked", "checked");

                        if (msg.CRxDigifinAppFormInfoList[0].Gender == "F")
                            $("#chkFemale").attr("checked", "checked");

                        //Martail Status
                        //*************
                        if (msg.CRxDigifinAppFormInfoList[0].MaritialStatus == "S")
                            $("#chkSingle").attr("checked", "checked");

                        if (msg.CRxDigifinAppFormInfoList[0].MaritialStatus == "M")
                            $("#chkMarried").attr("checked", "checked");

                        if (msg.CRxDigifinAppFormInfoList[0].DOB) {
                            var CusDateofBirth = msg.CRxDigifinAppFormInfoList[0].DOB;
                            CusDateofBirth = CusDateofBirth.replace('/', '');
                            CusDateofBirth = CusDateofBirth.replace('/', '');
                            if (CusDateofBirth != "") {
                                for (var i = 0; i < CusDateofBirth.length; i++) {
                                    var j = i + 1;
                                    $("#ddCusDob" + j).text(CusDateofBirth[i]);
                                }
                            }
                        }

                        $("#chkNationalityIndian").attr("checked", "checked");
                        $("#chkStatusResidentIndividual").attr("checked", "checked");

                        //Pan Box
                        if (msg.CRxDigifinAppFormInfoList[0].PANNumber) {
                            var PanNo = msg.CRxDigifinAppFormInfoList[0].PANNumber.toUpperCase();
                            if (PanNo != "") {
                                $("#chkProofSpecifyPanCard").attr("checked", "checked");
                                for (var i = 0; i < PanNo.length; i++) {
                                    var j = i + 1;
                                    $("#p" + j).text(PanNo[i]);
                                }

                            }
                        }
                        $('#chkProofSpecifyPanCard').prop('checked');
                        if (msg.CRxDigifinAppFormInfoList[0].AadhaarNumber) {
                            var AadhaarNumber = msg.CRxDigifinAppFormInfoList[0].AadhaarNumber;
                            if (AadhaarNumber != "") {
                                for (var i = 0; i < AadhaarNumber.length; i++) {
                                    var j = i + 1;
                                    $("#tdAadhaarNumber" + j).text(AadhaarNumber[i]);
                                }

                            }
                        }
                        var ClientPhoto = msg.CRxDigifinAppFormInfoList[0].ClientPhoto;
                        if (ClientPhoto != "data:image/jpg;base64,") {
                            // $("#identityUserImage").attr("src", ClientPhoto);
                            $("#identityUserImage").html("<img id='theclientImg' alt=''/>");
                            $("#theclientImg").attr("src", ClientPhoto);
                        }

                        else {
                            $("#identityUserImage").html("<img src='../ACFormImg/passport_photo.png' title='' alt=''/>");
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].ClientSignuture) {
                            var ClientSignuture = msg.CRxDigifinAppFormInfoList[0].ClientSignuture;
                            if (ClientSignuture != "data:image/jpg;base64,") {
                                $(".photoSign").html("<img id='theclientSign' />");
                                $("#theclientSign").attr("src", ClientSignuture);
                                $("#jointApplication1").html("<img id='theclientSign1' />");
                                $("#theclientSign1").attr("src", ClientSignuture);
                                $("#declaration1").html("<img id='theclientSign2' />");
                                $("#theclientSign2").attr("src", ClientSignuture);
                                $("#clientsign").html("<img id='theclientSign3' />");
                                $("#theclientSign3").attr("src", ClientSignuture);
                                $("#witness1stHolder").html("<img id='theclientSign4' />");
                                $("#theclientSign4").attr("src", ClientSignuture);
                                $("#signPrimaryApplication").html("<img id='theclientSign8' />");
                                $("#theclientSign8").attr("src", ClientSignuture);

                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].NSEEquityCash == "Y") {
                            $("#nseCashSign").html("<img id='theclientSign5'/>");
                            $("#theclientSign5").attr("src", ClientSignuture);

                        }
                        if (msg.CRxDigifinAppFormInfoList[0].BSEEquityCash == "Y") {
                            $("#bseCashSign").html("<img id='theclientSign6'/>");
                            $("#theclientSign6").attr("src", ClientSignuture);
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].NSEEquityFandO == "Y") {
                            $("#nseFOSign").html("<img id='theclientSign7'/>");
                            $("#theclientSign7").attr("src", ClientSignuture);
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].MCXCommodity == "Y") {
                            $("#mcxCommoditySign").html("<img id='theclientSign11'/>");
                            $("#theclientSign11").attr("src", ClientSignuture);
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].NCDXCommodity == "Y") {
                            $("#ncdexCommoditySign").html("<img id='theclientSign12'/>");
                            $("#theclientSign12").attr("src", ClientSignuture);
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].NSECurrencyFandO == "Y") {
                            $("#nscCurrencySign").html("<img id='theclientSign13'/>");
                            $("#theclientSign13").attr("src", ClientSignuture);
                        }

                        //  $("#borderBoxRef").append(RefNo);

                        if (msg.CRxDigifinAppFormInfoList[0].CorrentAddress) {
                            var CorrespondenceAddress = msg.CRxDigifinAppFormInfoList[0].CorrentAddress.toUpperCase();
                            if (CorrespondenceAddress != "") {
                                for (var i = 0; i < CorrespondenceAddress.length; i++) {
                                    var j = i + 1;
                                    $("#p5tdaddress" + j).text(CorrespondenceAddress[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].CCity) {
                            var CCity = msg.CRxDigifinAppFormInfoList[0].CCity.toUpperCase();
                            $("#crsCityOfBirth").val(CCity);
                            if (CCity != "") {
                                for (var i = 0; i < CorrespondenceAddress.length; i++) {
                                    var j = i + 1;
                                    $("#p5tdcitytownvillage" + j).text(CCity[i]);

                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].CPinCode) {
                            var CPinCode = msg.CRxDigifinAppFormInfoList[0].CPinCode.toUpperCase();

                            if (CPinCode != "") {
                                for (var i = 0; i < CPinCode.length; i++) {
                                    var j = i + 1;
                                    $("#p5tdPincode" + j).text(CPinCode[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].CState) {
                            var CState = msg.CRxDigifinAppFormInfoList[0].CState.toUpperCase();

                            if (CState != "") {
                                for (var i = 0; i < CState.length; i++) {
                                    var j = i + 1;
                                    $("#p5tdState" + j).text(CState[i]);

                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].CPinCode) {
                            var CPinCode = msg.CRxDigifinAppFormInfoList[0].CPinCode;
                            if (CPinCode != "") {
                                for (var i = 0; i < CPinCode.length; i++) {
                                    var j = i + 1;
                                    $("#PPinCode1" + j).text(CPinCode[i]);
                                }
                            }
                        }
                        var CCountry = "INDIA";//msg.CRxDigifinAppFormInfoList[0].CCountry.toUpperCase();

                        if (CCountry != "") {
                            for (var i = 0; i < CCountry.length; i++) {
                                var j = i + 1;
                                $("#p5tdCountry" + j).text(CCountry[i]);

                            }
                        }
                        $("#addressDetailCorrespondence").attr("checked", "checked");
                        //$("#bankdematDP").val("CDSL");
                        $("#bankdematBranchAddressDPName").val("SARASWAT CO OP BANK Limited");
                        $("#bankdematBeneficiary").val(msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase());
                        $("#otherDetailMenuYes").attr("checked", "checked");
                        $("#dealingBrokerDealNo").attr("checked", "checked");
                        //if ((msg.CRxDigifinAppFormInfoList[0].UserIPVStatus == "Y")) {
                        //    $("#officeUseIPV").attr("checked", "checked");
                        //    if (msg.CRxDigifinAppFormInfoList[0].ClientName) {
                        //        var CustomerName = msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase();
                        //        if (CustomerName != "") {
                        //            for (var i = 0; i < CustomerName.length; i++) {
                        //                var j = i + 1;
                        //                $("#officeUseIPV" + j).text(CustomerName[i]);
                        //            }
                        //        }
                        //    }

                        //    var OrganizationName = 'AXIS SECURITIES LTD';
                        //    if (OrganizationName != "") {
                        //        for (var i = 0; i < OrganizationName.length; i++) {
                        //            var j = i + 1;
                        //            $("#officeUseorganisation" + j).text(OrganizationName[i]);

                        //        }
                        //    }

                        //}
                        //$("#proofofAddress").val("Correspondence");  //--1
                        if (msg.CRxDigifinAppFormInfoList[0].CDocumentType) {
                            $("#proofofAddress").val(msg.CRxDigifinAppFormInfoList[0].CDocumentType);
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].Mobile) {
                            var ClientMobileNo = msg.CRxDigifinAppFormInfoList[0].Mobile

                            if (ClientMobileNo != "") {
                                for (var i = 0; i < ClientMobileNo.length; i++) {
                                    var j = i + 1;
                                    $("#p5tdContact_Mobile" + j).text(ClientMobileNo[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].Email) {
                            var ClientEmail = msg.CRxDigifinAppFormInfoList[0].Email.toUpperCase();

                            if (ClientEmail != "") {
                                for (var i = 0; i < ClientEmail.length; i++) {
                                    var j = i + 1;
                                    $("#p5tdContact_Emailid" + j).text(ClientEmail[i]);
                                }
                            }
                        }
                        //Permenenant Address Prof

                        if (msg.CRxDigifinAppFormInfoList[0].CIsSamePermenantAddress != "1") {
                            if (msg.CRxDigifinAppFormInfoList[0].PermenentAddress) {
                                var PermenentAddress = msg.CRxDigifinAppFormInfoList[0].PermenentAddress.toUpperCase()

                                if (PermenentAddress != "") {
                                    for (var i = 0; i < PermenentAddress.length; i++) {
                                        var j = i + 1;
                                        $("#p5tdPaddress" + j).text(PermenentAddress[i]);

                                    }
                                }
                            }
                            if (msg.CRxDigifinAppFormInfoList[0].PCity) {
                                var PCity = msg.CRxDigifinAppFormInfoList[0].PCity.toUpperCase();

                                if (PCity != "") {
                                    for (var i = 0; i < PCity.length; i++) {
                                        var j = i + 1;
                                        $("#PCity" + j).text(PCity[i]);
                                    }
                                }
                            }
                            // alert(msg.CRxDigifinAppFormInfoList[0].CPinCode);
                            if (msg.CRxDigifinAppFormInfoList[0].PPinCode) {
                                var PPinCode = msg.CRxDigifinAppFormInfoList[0].PPinCode;
                                if (PPinCode != "") {
                                    for (var i = 0; i < PPinCode.length; i++) {
                                        var j = i + 1;
                                        $("#PPinCode1" + j).text(PPinCode[i]);
                                    }
                                }
                            }

                            if (msg.CRxDigifinAppFormInfoList[0].PState) {
                                var PState = msg.CRxDigifinAppFormInfoList[0].PState.toUpperCase();

                                if (PState != "") {
                                    for (var i = 0; i < PState.length; i++) {
                                        var j = i + 1;
                                        $("#PState" + j).text(PState[i]);

                                    }
                                }
                            }
                            var PCountry = "INDIA"; //msg.CRxDigifinAppFormInfoList[0].CCountry.toUpperCase();

                            if (PCountry != "") {
                                for (var i = 0; i < PCountry.length; i++) {
                                    var j = i + 1;
                                    $("#PCountry" + j).text(PCountry[i]);

                                }
                            }
                        }
                        else {

                            if (msg.CRxDigifinAppFormInfoList[0].CorrentAddress) {
                                var CorrespondenceAddress = msg.CRxDigifinAppFormInfoList[0].CorrentAddress.toUpperCase();
                                if (CorrespondenceAddress != "") {
                                    for (var i = 0; i < CorrespondenceAddress.length; i++) {
                                        var j = i + 1;
                                        $("#p5tdPaddress" + j).text(CorrespondenceAddress[i]);
                                    }
                                }
                            }

                            if (msg.CRxDigifinAppFormInfoList[0].CCity) {
                                var CCity = msg.CRxDigifinAppFormInfoList[0].CCity.toUpperCase();

                                if (CCity != "") {
                                    for (var i = 0; i < CorrespondenceAddress.length; i++) {
                                        var j = i + 1;
                                        $("#PCity" + j).text(CCity[i]);

                                    }
                                }
                            }


                            if (msg.CRxDigifinAppFormInfoList[0].CState) {
                                var CState = msg.CRxDigifinAppFormInfoList[0].CState.toUpperCase();

                                if (CState != "") {
                                    for (var i = 0; i < CState.length; i++) {
                                        var j = i + 1;
                                        $("#PState" + j).text(CState[i]);

                                    }
                                }
                            }
                            var CCountry = "INDIA";//msg.CRxDigifinAppFormInfoList[0].CCountry.toUpperCase();

                            if (CCountry != "") {
                                for (var i = 0; i < CCountry.length; i++) {
                                    var j = i + 1;
                                    $("#PCountry" + j).text(CCountry[i]);

                                }
                            }

                        }


                        if (msg.CRxDigifinAppFormInfoList[0].CIsSamePermenantAddress == "1") {
                            $("#pCAddressProofHead").text("Correspondence Address/ Permanent Address");
                            $("#pCAddressProofHead1").text("Correspondence Address/ Permanent Address");
                        }

                        //3rd page start dematAccountBankName  --21180100012274

                        // $("#kraConfirmationYes").attr("checked", "checked");
                        if (msg.CRxDigifinAppFormInfoList[0].KRAClient == "Y") {
                            $("#kraConfirmationYes").attr("checked", "checked");
                        }
                        else {

                            $("#kraConfirmationNo").attr("checked", "checked");
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].BankName)
                            $("#pdtdBankname1").val(msg.CRxDigifinAppFormInfoList[0].BankName);
                        if (msg.CRxDigifinAppFormInfoList[0].BankName)
                            $("#pdtdBankname2").val(msg.CRxDigifinAppFormInfoList[0].BankName);
                        if (msg.CRxDigifinAppFormInfoList[0].BankAddress)
                            $("#bankdematBranchAddress").val(msg.CRxDigifinAppFormInfoList[0].BankAddress);
                        if (msg.CRxDigifinAppFormInfoList[0].AccountNumber)
                            $("#p8tdBankACnumber1").val(msg.CRxDigifinAppFormInfoList[0].AccountNumber);

                        if (msg.CRxDigifinAppFormInfoList[0].AccountNumber) {
                            var p12tdCID = msg.CRxDigifinAppFormInfoList[0].AccountNumber;
                            if (p12tdCID != "") {
                                for (var i = 0; i < p12tdCID.length; i++) {
                                    var j = i + 1;
                                    $("#p12tdCID" + j).text(p12tdCID[i]);

                                }
                            }
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].AccountType) {
                            var MICRCode = msg.CRxDigifinAppFormInfoList[0].AccountType;
                            if (MICRCode != "") {
                                for (var i = 0; i < MICRCode.length; i++) {
                                    var j = i + 1;
                                    $("#bankdematTypeAC" + j).text(MICRCode[i]);
                                }
                            }
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].MICRCode) {
                            var MICRCode = msg.CRxDigifinAppFormInfoList[0].MICRCode;
                            if (MICRCode != "") {
                                for (var i = 0; i < MICRCode.length; i++) {
                                    var j = i + 1;
                                    $("#p8tdMICRCode" + j).text(MICRCode[i]);
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].IFSC) {
                            var IFSCCode = msg.CRxDigifinAppFormInfoList[0].IFSC;
                            if (IFSCCode != "") {
                                for (var i = 0; i < IFSCCode.length; i++) {
                                    var j = i + 1;
                                    $("#p8tdIFSCCode" + j).text(IFSCCode[i]);

                                }
                            }
                        }
                        //if (msg.CRxDigifinAppFormInfoList[0].DPID) {
                        //    var p12tdBOID = msg.CRxDigifinAppFormInfoList[0].DPID;
                        //    if (p12tdBOID != "") {
                        //        for (var i = 0; i < p12tdBOID.length; i++) {
                        //            var j = i + 1;
                        //            $("#p12tdBOID" + j).text(p12tdBOID[i]);

                        //        }
                        //    }
                        //}

                        if (msg.CRxDigifinAppFormInfoList[0].Email) {
                            $("#otherDetailECNEmail").val(msg.CRxDigifinAppFormInfoList[0].Email.toUpperCase());
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].TradingExperience) {
                            var TradingExperience = msg.CRxDigifinAppFormInfoList[0].TradingExperience;
                            if ((TradingExperience == "") && (TradingExperience == "0")) {
                                $("#p8TradingExp").val('');
                            }
                            else {
                                $("#p8TradingExp").val(TradingExperience);
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].IncomeRangeid) {

                            if (msg.CRxDigifinAppFormInfoList[0].IncomeRangeid == "1") {
                                $("#p7chkSFH_Below1Lac").attr("checked", "checked");
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].IncomeRangeid == "2") {
                                $("#p7chkSFH_1to5Lac").attr("checked", "checked");
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].IncomeRangeid == "4") {
                                $("#p7chkSFH_5to10Lac").attr("checked", "checked");
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].IncomeRangeid == "5") {
                                $("#p7chkSFH_10to25Lac").attr("checked", "checked");
                            }

                            else if (msg.CRxDigifinAppFormInfoList[0].IncomeRangeid == "8") {
                                $("#p7chkSFH_25Lacs").attr("checked", "checked");
                            }
                            else {
                                $("#p7chkSFH_Below1Lac").attr("checked", "checked");
                            }

                        }
                        if (msg.CRxDigifinAppFormInfoList[0].NetWorth)
                            $("#p7txtSFHNetWorth").val(msg.CRxDigifinAppFormInfoList[0].NetWorth.toUpperCase());

                        if (msg.CRxDigifinAppFormInfoList[0].NetWorth) {
                            if (msg.CRxDigifinAppFormInfoList[0].NetWorth != "" && msg.CRxDigifinAppFormInfoList[0].NetWorth != 0) {
                                if (msg.CRxDigifinAppFormInfoList[0].AgentAssignedOnDate) {
                                    var NetworthDate = msg.CRxDigifinAppFormInfoList[0].AgentAssignedOnDate.toUpperCase();
                                    if (NetworthDate != "") {

                                        NetworthDate = NetworthDate.replace("/", "").replace("/", "");
                                        for (var i = 0; i < NetworthDate.length; i++) {
                                            var j = i + 1;
                                            $("#p7SFH_date" + j).text(NetworthDate[i]);
                                        }
                                    }
                                }
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].BrokerName != "" && msg.CRxDigifinAppFormInfoList[0].BrokerName != null) {
                            $("#textNameofSubBroker ").val(msg.CRxDigifinAppFormInfoList[0].BrokerName);
                            $('#dealingBrokerYes').prop('checked', true);
                        }
                        else {
                            $('#dealingBrokerNo').prop('checked', true);
                        }
                        //if (msg.CRxDigifinAppFormInfoList[0].AnualReport == "E") {
                        //$('#otherDetailECN').prop('checked', true);
                        //}
                        $('#otherDetailECN').prop('checked', true);
                        if (msg.CRxDigifinAppFormInfoList[0].PastActions == "Y") {
                            $('#pastActionYes').prop('checked', true);
                        }
                        else {
                            $('#pastActionNo').prop('checked', true);
                        }

                        var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!

                        var yyyy = today.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd;
                        }
                        if (mm < 10) {
                            mm = '0' + mm;
                        }
                        var today = dd + '/' + mm + '/' + yyyy;

                        $("#TodDate").val(today);
                        $("#TodayDate").val(today);
                        $("#TodayDate1").val(today);
                        today = today.replace('/', '');
                        today = today.replace('/', '');

                        if (today != "") {
                            for (var i = 0; i < today.length; i++) {
                                var j = i + 1;
                                //$("#declarationDate" + j).text(today[i]);
                                // $("#primaryApplicationDeclarationED" + j).text(today[i]);
                                $("#nominationCancelDateD" + j).text(today[i]);
                                // $("#fatcaD" + j).text(today[i]);
                                //$("#guardianEndDateD" + j).text(today[i]);


                            }
                        }

                        $("#paDeclarationPlace").val("CHENNAI");


                        if (msg.CRxDigifinAppFormInfoList[0].IsNominee) {
                            var IsNominee = msg.CRxDigifinAppFormInfoList[0].IsNominee;
                            if (IsNominee == "1") {
                                $('#makeNomination').prop('checked', true);
                                $('#chkWishNominee').prop('checked', true);
                                $('#makeaNomination').prop('checked', true);
                                $('#nomineeName').val(msg.CRxDigifinAppFormInfoList[0].NomineeName);
                                $('#relationShipNominee').val(msg.CRxDigifinAppFormInfoList[0].RelationshipWithNominee);
                                if (msg.CRxDigifinAppFormInfoList[0].NomineeDOB) {
                                    var NomineeDOB = msg.CRxDigifinAppFormInfoList[0].NomineeDOB;
                                    if (p12tdCID != "") {
                                        for (var i = 0; i < NomineeDOB.length; i++) {
                                            var j = i + 1;
                                            $("#nomineeDOB" + j).text(NomineeDOB[i]);

                                        }
                                    }
                                }
                                if (msg.CRxDigifinAppFormInfoList[0].ClientName) {
                                    var CustomerName = msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase();
                                    if (CustomerName != "") {
                                        $("#noimineeNameOfHolder1").text(CustomerName);
                                    }
                                }
                                var Naddr1 = msg.CRxDigifinAppFormInfoList[0].NomineeAddress1;
                                var Naddr2 = msg.CRxDigifinAppFormInfoList[0].NomineeAddress2;
                                var NCity = msg.CRxDigifinAppFormInfoList[0].NomineeCity;
                                var NState = msg.CRxDigifinAppFormInfoList[0].NomineeState;
                                //var NCountry = msg.CRxDigifinAppFormInfoList[0].NomineeCountry;
                                var NPincode = msg.CRxDigifinAppFormInfoList[0].NomineePinCode;
                                var NomineeAddress = Naddr1 + "," + Naddr2 + "," + NCity + "," + NState + "," + NPincode;
                                $('#addressOfNominee').val(NomineeAddress.toUpperCase());

                                // $('#addressOfNominee').text(','+ msg.CRxDigifinAppFormInfoList[0].NomineeAddress2);
                                $('#nomineeNameOfGuardian').val(msg.CRxDigifinAppFormInfoList[0].NomineeGuardianName);
                                $('#nomineeAddressOfGuardian').val(msg.CRxDigifinAppFormInfoList[0].NomineeGuardainAddress1);
                                //$('#witnessName1').val(msg.CRxDigifinAppFormInfoList[0].NomineeName);
                                // $('#witnessAddress1').val(msg.CRxDigifinAppFormInfoList[0].NomineeAddress1);

                                var d = new Date();
                                var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
                                var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                var newDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                                var a = new Date(strDate);
                                //alert(weekday[a.getDay()]);
                                // alert(d.getMonth() + 1);
                                // var dd = d.getFullYear().slice(2);


                                //$('#POAdate').val(weekday[a.getDay()]);
                                //$('#POAMonth').val(d.getMonth() + 1);
                                //if (d.getFullYear()) {
                                //    $('.twenty-20').hide();
                                //} else {
                                //    $('.twenty-20').show();
                                //}
                                //$('#POAYear').val(d.getFullYear());
                                $('#POAByName').val(msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase());

                                //$('#POAdate').val(weekday[a.getDay()]);
                            }
                            else {
                                $('#chkDoNotWishNominee').prop('checked', true);
                                $('#donotMakeNomination').prop('checked', true);
                            }
                        }

                        $('#CDNameOfTheClient,#NameOfSecuritiesDematFirstAccountHolders').text(msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase());
                        $('#CDAddress').text(msg.CRxDigifinAppFormInfoList[0].CorrentAddress.toUpperCase());
                        $('#CDClientCode').val();  ///Client Code



                        $('#CDName4').val();
                        $('#electronic').prop('checked', true);
                        $('#termDate').val(newDate);

                        console.log(msg.CRxDigifinAppFormInfoList[0]);
                        if (msg.CRxDigifinAppFormInfoList[0].IsNominee) {
                            var IsNominee = msg.CRxDigifinAppFormInfoList[0].IsNominee;
                            if (IsNominee == "1") {
                                $('#makeNomination').prop('checked', true);
                                $('#chkWishNominee').prop('checked', true);
                                $('#makeaNomination').prop('checked', true);
                                $('#nomineeName').val(msg.CRxDigifinAppFormInfoList[0].NomineeName);
                                $('#relationShipNominee').val(msg.CRxDigifinAppFormInfoList[0]._RelationshipWithNominee);
                                if (msg.CRxDigifinAppFormInfoList[0].NomineeDOB) {
                                    var NomineeDOB = msg.CRxDigifinAppFormInfoList[0].NomineeDOB;
                                    NomineeDOB = NomineeDOB.replace("/", "");
                                    NomineeDOB = NomineeDOB.replace("/", "");
                                    if (p12tdCID != "") {
                                        for (var i = 0; i < NomineeDOB.length; i++) {
                                            var j = i + 1;
                                            $("#nomineeDOB" + j).text(NomineeDOB[i]);

                                        }
                                    }
                                }
                                if (msg.CRxDigifinAppFormInfoList[0].ClientName) {
                                    var CustomerName = msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase();
                                    if (CustomerName != "") {
                                        $("#noimineeNameOfHolder1").text(CustomerName);
                                    }
                                }
                                var Naddr1 = msg.CRxDigifinAppFormInfoList[0].NomineeAddress1;
                                var Naddr2 = msg.CRxDigifinAppFormInfoList[0].NomineeAddress2;
                                var NCity = msg.CRxDigifinAppFormInfoList[0].NomineeCity;
                                var NState = msg.CRxDigifinAppFormInfoList[0].NomineeState;
                                //var NCountry = msg.CRxDigifinAppFormInfoList[0].NomineeCountry;
                                var NPincode = msg.CRxDigifinAppFormInfoList[0].NomineePinCode;
                                var NomineeAddress = Naddr1 + "," + Naddr2 + "," + NCity + "," + NState + "," + NPincode;
                                $('#addressOfNominee').val(NomineeAddress.toUpperCase());

                                // $('#addressOfNominee').text(','+ msg.CRxDigifinAppFormInfoList[0].NomineeAddress2);
                                $('#nomineeNameOfGuardian').val(msg.CRxDigifinAppFormInfoList[0].NomineeGuardianName);
                                $('#nomineeAddressOfGuardian').val(msg.CRxDigifinAppFormInfoList[0].NomineeGuardainAddress1);
                                //$('#witnessName1').val(msg.CRxDigifinAppFormInfoList[0].NomineeName);
                                // $('#witnessAddress1').val(msg.CRxDigifinAppFormInfoList[0].NomineeAddress1);

                                var d = new Date();
                                var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
                                var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                var newDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                                var a = new Date(strDate);
                                //alert(weekday[a.getDay()]);
                                // alert(d.getMonth() + 1);
                                // var dd = d.getFullYear().slice(2);


                                //$('#POAdate').val(weekday[a.getDay()]);
                                //$('#POAMonth').val(d.getMonth() + 1);
                                //if (d.getFullYear()) {
                                //    $('.twenty-20').hide();
                                //} else {
                                //    $('.twenty-20').show();
                                //}
                                //$('#POAYear').val(d.getFullYear());
                                $('#POAByName').val(msg.CRxDigifinAppFormInfoList[0].ClientName.toUpperCase());

                                //$('#POAdate').val(weekday[a.getDay()]);
                            }
                            else {
                                $('#chkDoNotWishNominee').prop('checked', true);
                                $('#donotMakeNomination').prop('checked', true);
                            }
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].IsNominee) {
                            var IsNominee = msg.CRxDigifinAppFormInfoList[0].IsNominee;
                            if (IsNominee == "1") {
                                $('#isNominee').prop('checked', true);
                            }
                            else {
                                $('#isNonominee').prop('checked', true);
                            }
                        }
                        if (msg.CRxDigifinAppFormInfoList[0].IsThirdPartBank) {

                            $('#checkbox18').prop('checked', true);
                        }
                        else {
                            $('#checkbox18').prop('checked', false);
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].NomineeProofId) {
                            if (msg.CRxDigifinAppFormInfoList[0].NomineeProofId == 111)//Aadhar
                            {
                                if (msg.CRxDigifinAppFormInfoList[0].NomineeIDProofNumber) {
                                    var NomineePfNumber = msg.CRxDigifinAppFormInfoList[0].NomineeIDProofNumber;
                                    if (NomineePfNumber != "") {
                                        for (var i = 0; i < NomineePfNumber.length; i++) {
                                            var j = i + 1;
                                            $("#dpNomineeAadhaarNo" + j).text(NomineePfNumber[i]);
                                        }
                                    }
                                }
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].NomineeProofId == 118)//Pan
                            {
                                if (msg.CRxDigifinAppFormInfoList[0].NomineeIDProofNumber) {
                                    var NomineePfNumber = msg.CRxDigifinAppFormInfoList[0].NomineeIDProofNumber;
                                    if (NomineePfNumber != "") {
                                        for (var i = 0; i < NomineePfNumber.length; i++) {
                                            var j = i + 1;
                                            $("#dpNomineePanNo" + j).text(NomineePfNumber[i]);
                                            $("#nomineePAN" + j).text(NomineePfNumber[i]);
                                        }
                                    }
                                }

                            }
                        }

                        if (msg.CRxDigifinAppFormInfoList[0].GuardianProofId) {
                            if (msg.CRxDigifinAppFormInfoList[0].GuardianProofId == 111)//Aadhar
                            {
                                if (msg.CRxDigifinAppFormInfoList[0].GuardianIDProofNumber) {
                                    var GuardianIDProofNumber = msg.CRxDigifinAppFormInfoList[0].GuardianIDProofNumber;
                                    if (GuardianIDProofNumber != "") {
                                        for (var i = 0; i < GuardianIDProofNumber.length; i++) {
                                            var j = i + 1;
                                            $("#dpGuardianAadhaarNo" + j).text(GuardianIDProofNumber[i]);
                                        }
                                    }
                                }
                            }
                            else if (msg.CRxDigifinAppFormInfoList[0].GuardianProofId == 118)//Pan
                            {
                                if (msg.CRxDigifinAppFormInfoList[0].GuardianIDProofNumber) {
                                    var GuardianIDProofNumber = msg.CRxDigifinAppFormInfoList[0].GuardianIDProofNumber;
                                    if (GuardianIDProofNumber != "") {
                                        for (var i = 0; i < GuardianIDProofNumber.length; i++) {
                                            var j = i + 1;
                                            $("#dpGuardianPanNo" + j).text(GuardianIDProofNumber[i]);
                                        }
                                    }
                                }

                            }
                        }

                        ////////////////////////Multiple Nominee start////////////////
                        var nomineeList = msg.CRxDigifinAppFormInfoList[0].NomineeList;
                         
                        $("#checkbox10").prop("checked", true);
                        $("#checkbox20").prop("checked", true);
                        $("#checkbox21").prop("checked", true);
                        console.log(nomineeList[0]);
                        if (nomineeList.length > 0) {
                            $("#checkbox").prop("checked", true);
                            $("#checkbox2").prop("checked", false);
                        }
                        else {
                            $("#checkbox").prop("checked", true);
                            $("#checkbox2").prop("checked", false);
                        }
                        if (nomineeList.length >= 1) {
                            $("#chkResidualSecuritiesOne").prop("checked", true);
                            $("#checkbox").prop("checked", true);
                            console.log(nomineeList[0]);
                            if (nomineeList[0].FirstName != "") {
                                $("#NomineeAddOne,#NomineeRemoveOne").html(nomineeList[0].NomineeInfoId);
                                $('#ddlNomineeRelation').css("background-color", "#ebebe4");

                                $("#txtNomineeIDProofNumber1").html(nomineeList[0].NomineeIDProofNumber);
                                $("#txtGuardianIDProofNumber1").html(nomineeList[0].GuardianIDProofNumber);

                                $("#hdnNominee1").html(nomineeList[0].NomineeInfoId);
                                $("#imgNominateHolder").prop("src", "../../Images/accept.png");
                                // $("#hdnChkIsNominee").html("1");
                                //$("#showNomineeDetails").show();
                                $("#txtNomineeFirstNameOne").html(nomineeList[0].FirstName);
                                $("#txtNomineeLastNameOne").html(nomineeList[0].LastName);
                                $("#txtNomineeMiddleNameOne").html(nomineeList[0].MiddleName);
                                $("#ddlNomineeRelationOne").html(nomineeList[0]._RelationshipWithNominee);
                                //$("#txtNomineeDOBOne").html(nomineeList[0].NomineeDOB); 
                                if (nomineeList[0].NomineeDOB) {
                                    var NomineeDOB = nomineeList[0].NomineeDOB;
                                    NomineeDOB = NomineeDOB.replace("/", "");
                                    NomineeDOB = NomineeDOB.replace("/", "");

                                    for (var i = 0; i < NomineeDOB.length; i++) {
                                        var j = i + 1;
                                        $("#txtNomineeDOBOne" + j).text(NomineeDOB[i]);

                                    }
                                }
                                if (nomineeList[0].GuardianDOB) {
                                    var GuardianDOB = nomineeList[0].GuardianDOB;
                                    GuardianDOB = GuardianDOB.replace("/", "");
                                    GuardianDOB = GuardianDOB.replace("/", "");

                                    for (var i = 0; i < GuardianDOB.length; i++) {
                                        var j = i + 1;
                                        $("#txtGuardianDOBOne" + j).text(GuardianDOB[i]);

                                    }
                                }
                                //getAge(nomineeList[0].NomineeDOB);
                                $("#txtGuardianNameOne").html(nomineeList[0].NomineeGuardianName);
                                $("#txtNomineeAddrOne").html(nomineeList[0].AddressLine1 + "," + nomineeList[0].AddressLine2 + "" + nomineeList[0].AddressLine3);
                                //$("#txtNomineeAddr2One").html(nomineeList[0].AddressLine2);
                                //$("#txtNomineeAddr3One").html(nomineeList[0].AddressLine3);
                                $("#txtNomineeCityOne").html(nomineeList[0].City);
                                $("#txtNomineeStateOne").html(nomineeList[0].State);
                                $("#txtNomineeDistrictOne").html(nomineeList[0].District);
                                $("#txtNomineeCountryOne").html("INDIA");
                                $("#txtNomineePinCodeOne").html(nomineeList[0].PinCode);
                                $("#txtEmailOne").html(nomineeList[0].Email);
                                $("#txtMobileOne").html(nomineeList[0].Mobile);
                                //StateDistrict('txtNomineePinCodeOne');
                                $("#txtGuardianAddrOne").html(nomineeList[0].GuardianAddressLine1 + "," + nomineeList[0].GuardianAddressLine2 + "," + nomineeList[0].GuardianAddressLine3);
                                //$("#txtGuardianAddr2One").html(nomineeList[0].GuardianAddressLine2);
                                //$("#txtGuardianAddr3One").html(nomineeList[0].GuardianAddressLine3);
                                $("#txtGuardianCityOne").html(nomineeList[0].GuardianCity);
                                $("#txtGuardianStateOne").html(nomineeList[0].GuardianState);
                                $("#txtGuardianDistrictOne").html(nomineeList[0].GuardianDistrict);
                                $("#txtGuardianCountryOne").html("INDIA");
                                $("#txtGuardianMobileOne").html(nomineeList[0].GuardianMobile);
                                $("#txtGuardianEmailOne").html(nomineeList[0].GuardianEmail);
                                if (nomineeList[0].GuardianFirstName != "") {
                                    $("#txtGuardianCountryOne").html("INDIA");
                                    $("#txtGuardianPinCodeOne").html(nomineeList[0].GuardianPinCode);
                                    if (nomineeList[0].GuardianDOB) {
                                        var GuardianDOB = nomineeList[0].GuardianDOB;
                                        GuardianDOB = GuardianDOB.replace("/", "");
                                        GuardianDOB = GuardianDOB.replace("/", "");

                                        for (var i = 0; i < GuardianDOB.length; i++) {
                                            var j = i + 1;
                                            $("#txtGuardianDOBOne" + j).text(GuardianDOB[i]);

                                        }
                                    }
                                }
                                else {
                                    $("#txtGuardianCountryOne").html(" ");
                                    $("#txtGuardianPinCodeOne").html(" ");
                                    if (nomineeList[0].GuardianDOB) {
                                        var GuardianDOB = nomineeList[0].GuardianDOB;
                                        GuardianDOB = GuardianDOB.replace("/", "");
                                        GuardianDOB = GuardianDOB.replace("/", "");

                                        for (var i = 0; i < GuardianDOB.length; i++) {
                                            var j = i + 1;
                                            $("#txtGuardianDOBOne" + j).text(" ");

                                        }
                                    }

                                }
                                //StateDistrict('txtGuardianPinCodeOne');
                                if (nomineeList[0].IsSameNomineeANDGuardianAddess && nomineeList[0].IsSameNomineeANDGuardianAddess == "1") {
                                    $("#chkIsSameNomineeGuardianOne").prop('checked', true);
                                }
                                if (nomineeList[0].IsSamePermenantAddress == "1") {
                                    $("#chkIsAddrSameAppltOne").prop('checked', true);
                                }
                                $("#DivNomineehideShowOne").show();
                                $("#txtNomineeIDProofNumberOne").html(nomineeList[0].NomineeIDProofNumber);
                                $("#txtGuardianIDProofNumber1").html(nomineeList[0].GuardianIDProofNumber);
                                $("#txtNomineeRatioOne").html(nomineeList[0].NomineeRatio);
                                ratio1 = nomineeList[0].NomineeRatio;
                                $("#ddlNomineeProofIdOne").html(nomineeList[0].NomineeProofId);
                                $("#ddlGurdianProofIdOne").html(nomineeList[0].GuardianProofId);
                                $("#txtGurdianIDProofNumberOne").html(nomineeList[0].GuardianIDProofNumber);
                                $("#txtGurdianDOBOne").html(nomineeList[0].GuardianDateofBirth);
                                $("#ddlGuardianRelationOne").html(nomineeList[0]._GuardianRelationship);

                                $("#txtGuardianFirstNameOne").html(nomineeList[0].GuardianFirstName);
                                $("#txtGuardianMiddleNameOne").html(nomineeList[0].GuardianMiddleName);
                                $("#txtGuardianLastNameOne").html(nomineeList[0].GuardianLastName);
                            }
                            else {
                                $("#hdnChkIsNomineeOne").html("0");
                                //$("#showNomineeDetails").hide();
                                $("#DivNomineehideShowOne").hide();
                                $("#imgNominateHolderOne").prop("src", "../../Images/delete.GIF");
                            }
                            if (nomineeList.length >= 2) {

                                if (nomineeList[1].FirstName != "") {

                                    $("#NomineeAddTwo,#NomineeRemoveTwo").html(nomineeList[1].NomineeInfoId);
                                    $('#ddlNomineeRelation').css("background-color", "#ebebe4");
                                    $("#txtNomineeIDProofNumber2").html(nomineeList[1].NomineeIDProofNumber);
                                    $("#txtGuardianIDProofNumber2").html(nomineeList[1].GuardianIDProofNumber);
                                    $("#hdnNominee2").html(nomineeList[1].NomineeInfoId);
                                    $("#imgNominateHolder").prop("src", "../../Images/accept.png");
                                    $("#hdnChkIsNominee").html("1");
                                    //$("#showNomineeDetails").show();
                                    $("#txtNomineeFirstNameTwo").html(nomineeList[1].FirstName);
                                    $("#txtNomineeLastNameTwo").html(nomineeList[1].LastName);
                                    $("#txtNomineeMiddleNameTwo").html(nomineeList[1].MiddleName);
                                    $("#ddlNomineeRelationTwo").html(nomineeList[1]._RelationshipWithNominee);
                                    //$("#txtNomineeDOBTwo").html(nomineeList[1].NomineeDOB);
                                    if (nomineeList[1].NomineeDOB) {
                                        var NomineeDOB = nomineeList[1].NomineeDOB;
                                        NomineeDOB = NomineeDOB.replace("/", "");
                                        NomineeDOB = NomineeDOB.replace("/", "");

                                        for (var i = 0; i < NomineeDOB.length; i++) {
                                            var j = i + 1;
                                            $("#txtNomineeDOBTwo" + j).text(NomineeDOB[i]);

                                        }
                                    }
                                    if (nomineeList[1].GuardianDOB) {
                                        var GuardianDOB = nomineeList[1].GuardianDOB;
                                        GuardianDOB = GuardianDOB.replace("/", "");
                                        GuardianDOB = GuardianDOB.replace("/", "");

                                        for (var i = 0; i < GuardianDOB.length; i++) {
                                            var j = i + 1;
                                            $("#txtGuardianDOBTwo" + j).text(GuardianDOB[i]);

                                        }
                                    }
                                    //getAgeTwo(nomineeList[1].NomineeDOB);
                                    $("#txtGuardianNameTwo").html(nomineeList[1].NomineeGuardianName);
                                    $("#txtNomineeAddrTwo").html(nomineeList[1].AddressLine1 + "," + nomineeList[1].AddressLine2 + "," + nomineeList[1].AddressLine3);
                                    //$("#txtNomineeAddr2Two").html(nomineeList[1].AddressLine2);
                                    //$("#txtNomineeAddr3Two").html(nomineeList[1].AddressLine3);
                                    $("#txtNomineeCityTwo").html(nomineeList[1].City);
                                    $("#txtNomineeStateTwo").html(nomineeList[1].State);
                                    $("#txtNomineeDistrictTwo").html(nomineeList[1].District);
                                    $("#txtNomineeCountryTwo").html("INDIA");
                                    $("#txtNomineePinCodeTwo").html(nomineeList[1].PinCode);
                                    $("#txtEmailTwo").html(nomineeList[1].Email);
                                    $("#txtMobileTwo").html(nomineeList[1].Mobile);
                                    //StateDistrict('txtNomineePinCodeTwo');
                                    $("#txtGuardianAddrTwo").html(nomineeList[1].GuardianAddressLine1 + "," + nomineeList[1].GuardianAddressLine1 + "," + nomineeList[1].GuardianAddressLine3);
                                    //$("#txtGuardianAddr2Two").html(nomineeList[1].GuardianAddressLine2);
                                    //$("#txtGuardianAddr3Two").html(nomineeList[1].GuardianAddressLine3);
                                    $("#txtGuardianCityTwo").html(nomineeList[1].GuardianCity);
                                    $("#txtGuardianStateTwo").html(nomineeList[1].GuardianState);
                                    $("#txtGuardianDistrictTwo").html(nomineeList[1].GuardianDistrict);
                                    $("#txtGuardianCountryTwo").html("INDIA");
                                    $("#txtGuardianMobileTwo").html(nomineeList[1].GuardianMobile);
                                    $("#txtGuardianEmailTwo").html(nomineeList[1].GuardianEmail);
                                    if (nomineeList[1].GuardianFirstName != "") {

                                        $("#txtGuardianCountryTwo").html("INDIA");
                                        $("#txtGuardianPinCodeTwo").html(nomineeList[1].GuardianPinCode);
                                        if (nomineeList[1].GuardianDOB) {
                                            var GuardianDOB = nomineeList[1].GuardianDOB;
                                            GuardianDOB = GuardianDOB.replace("/", "");
                                            GuardianDOB = GuardianDOB.replace("/", "");

                                            for (var i = 0; i < GuardianDOB.length; i++) {
                                                var j = i + 1;
                                                $("#txtGuardianDOBTwo" + j).text(GuardianDOB[i]);

                                            }
                                        }
                                    }
                                    else {
                                        $("#txtGuardianCountryTwo").html(" ");
                                        $("#txtGuardianPinCodeTwo").html(" ");
                                        if (nomineeList[1].GuardianDOB) {
                                            var GuardianDOB = nomineeList[1].GuardianDOB;
                                            GuardianDOB = GuardianDOB.replace("/", "");
                                            GuardianDOB = GuardianDOB.replace("/", "");
                                            for (var i = 0; i < GuardianDOB.length; i++) {
                                                var j = i + 1;
                                                $("#txtGuardianDOBTwo" + j).text(" ");

                                            }
                                        }

                                    }
                                    //StateDistrict('txtGuardianPinCodeTwo');
                                    if (nomineeList[1].IsSameNomineeANDGuardianAddess && nomineeList[1].IsSameNomineeANDGuardianAddess == "1") {
                                        $("#chkIsSameNomineeGuardianTwo").prop('checked', true);
                                    }
                                    if (nomineeList[1].IsSamePermenantAddress == "1") {
                                        $("#chkIsAddrSameAppltTwo").prop('checked', true);
                                    }
                                    $("#DivNomineehideShow").show();

                                    $("#txtNomineeIDProofNumberTwo").html(nomineeList[1].NomineeIDProofNumber);
                                    $("#txtGuardianIDProofNumber2").html(nomineeList[1].GuardianIDProofNumber);
                                    $("#txtNomineeRatioTwo").html(nomineeList[1].NomineeRatio);
                                    ratio2 = nomineeList[1].NomineeRatio;
                                    $("#ddlNomineeProofIdTwo").html(nomineeList[1].NomineeProofId);
                                    $("#ddlGurdianProofIdTwo").html(nomineeList[1].GuardianProofId);
                                    $("#txtGurdianIDProofNumberTwo").html(nomineeList[1].GuardianIDProofNumber);
                                    $("#txtGurdianDOBTwo").html(nomineeList[1].GuardianDateofBirth);
                                    $("#ddlGuardianRelationTwo").html(nomineeList[1]._GuardianRelationship);

                                    $("#txtGuardianFirstNameTwo").html(nomineeList[1].GuardianFirstName);
                                    $("#txtGuardianMiddleNameTwo").html(nomineeList[1].GuardianMiddleName);
                                    $("#txtGuardianLastNameTwo").html(nomineeList[1].GuardianLastName);
                                }
                                else {
                                    $("#hdnChkIsNominee").html("0");
                                    //$("#showNomineeDetails").hide();
                                    $("#DivNomineehideShow").hide();
                                    $("#imgNominateHolder").prop("src", "../../Images/delete.GIF");
                                }
                            }
                            if (nomineeList.length >= 3) {

                                if (nomineeList[2].FirstName != "") {
                                    $("#NomineeAddThree,#NomineeRemoveThree").html(nomineeList[2].NomineeInfoId);
                                    $('#ddlNomineeRelationThree').css("background-color", "#ebebe4");
                                    $("#txtNomineeIDProofNumber3").html(nomineeList[2].NomineeIDProofNumber);
                                    $("#txtGuardianIDProofNumber3").html(nomineeList[2].GuardianIDProofNumber);
                                    $("#hdnNominee3").html(nomineeList[2].NomineeInfoId);
                                    $("#imgNominateHolder").prop("src", "../../Images/accept.png");
                                    $("#hdnChkIsNominee").html("1");
                                    //$("#showNomineeDetails").show();
                                    $("#txtNomineeFirstNameThree").html(nomineeList[2].FirstName);
                                    $("#txtNomineeLastNameThree").html(nomineeList[2].LastName);
                                    $("#txtNomineeMiddleNameThree").html(nomineeList[2].MiddleName);
                                    $("#ddlNomineeRelationThree").html(nomineeList[2]._RelationshipWithNominee);
                                    //$("#txtNomineeDOBThree").html(nomineeList[2].NomineeDOB);
                                    if (nomineeList[2].NomineeDOB) {
                                        var NomineeDOB = nomineeList[2].NomineeDOB;
                                        NomineeDOB = NomineeDOB.replace("/", "");
                                        NomineeDOB = NomineeDOB.replace("/", "");

                                        for (var i = 0; i < NomineeDOB.length; i++) {
                                            var j = i + 1;
                                            $("#txtNomineeDOBThree" + j).text(NomineeDOB[i]);

                                        }
                                    }
                                    if (nomineeList[2].GuardianDOB) {
                                        var GuardianDOB = nomineeList[2].GuardianDOB;
                                        GuardianDOB = GuardianDOB.replace("/", "");
                                        GuardianDOB = GuardianDOB.replace("/", "");

                                        for (var i = 0; i < GuardianDOB.length; i++) {
                                            var j = i + 1;
                                            $("#txtGuardianDOBThree" + j).text(GuardianDOB[i]);

                                        }
                                    }
                                    //getAgeThree(nomineeList[2].NomineeDOB);
                                    $("#txtGuardianNameThree").html(nomineeList[2].NomineeGuardianName);
                                    $("#txtNomineeAddrThree").html(nomineeList[2].AddressLine1 + "," + nomineeList[2].AddressLine2 + "," + nomineeList[2].AddressLine3);
                                    //$("#txtNomineeAddr2Three").html(nomineeList[2].AddressLine2);
                                    //$("#txtNomineeAddr3Three").html(nomineeList[2].AddressLine3);
                                    $("#txtNomineeCityThree").html(nomineeList[2].City);
                                    $("#txtNomineeStateThree").html(nomineeList[2].State);
                                    $("#txtNomineeDistrictThree").html(nomineeList[2].District);
                                    $("#txtNomineeCountryThree").html("INDIA");
                                    $("#txtNomineePinCodeThree").html(nomineeList[2].PinCode);

                                    $("#txtEmailThree").html(nomineeList[2].Email);
                                    $("#txtMobileThree").html(nomineeList[2].Mobile);
                                    //  StateDistrict('txtNomineePinCodeThree');
                                    $("#txtGuardianAddrThree").html(nomineeList[2].GuardianAddressLine1 + "," + nomineeList[2].GuardianAddressLine2 + "," + nomineeList[2].GuardianAddressLine3);
                                    //$("#txtGuardianAddr2Three").html(nomineeList[2].GuardianAddressLine2);
                                    //$("#txtGuardianAddr3Three").html(nomineeList[2].GuardianAddressLine3);
                                    $("#txtGuardianCityThree").html(nomineeList[2].GuardianCity);
                                    $("#txtGuardianStateThree").html(nomineeList[2].GuardianState);
                                    $("#txtGuardianDistrictThree").html(nomineeList[2].GuardianDistrict);
                                    $("#txtGuardianCountryThree").html("INDIA");
                                    $("#txtGuardianMobileThree").html(nomineeList[2].GuardianMobile);
                                    $("#txtGuardianEmailThree").html(nomineeList[2].GuardianEmail);

                                    if (nomineeList[2].GuardianFirstName != "") {

                                        $("#txtGuardianCountryThree").html("INDIA");
                                        $("#txtGuardianPinCodeThree").html(nomineeList[2].GuardianPinCode);
                                        if (nomineeList[2].GuardianDOB) {
                                            var GuardianDOB = nomineeList[2].GuardianDOB;
                                            GuardianDOB = GuardianDOB.replace("/", "");
                                            GuardianDOB = GuardianDOB.replace("/", "");

                                            for (var i = 0; i < GuardianDOB.length; i++) {
                                                var j = i + 1;
                                                $("#txtGuardianDOBThree" + j).text(GuardianDOB[i]);

                                            }
                                        }
                                    }
                                    else {
                                        $("#txtGuardianCountryThree").html(" ");
                                        $("#txtGuardianPinCodeThree").html(" ");
                                        if (nomineeList[2].GuardianDOB) {
                                            var GuardianDOB = nomineeList[2].GuardianDOB;
                                            GuardianDOB = GuardianDOB.replace("/", "");
                                            GuardianDOB = GuardianDOB.replace("/", "");
                                            for (var i = 0; i < GuardianDOB.length; i++) {
                                                var j = i + 1;
                                                $("#txtGuardianDOBThree" + j).text(" ");

                                            }
                                        }

                                    }
                                    //StateDistrict('txtGuardianPinCodeThree');
                                    if (nomineeList[2].IsSameNomineeANDGuardianAddess && nomineeList[2].IsSameNomineeANDGuardianAddess == "1") {
                                        $("#chkIsSameNomineeGuardianThree").prop('checked', true);
                                    }

                                    $("#DivNomineehideShow").show();

                                    $("#txtNomineeIDProofNumberThree").html(nomineeList[2].NomineeIDProofNumber);
                                    $("#txtGuardianIDProofNumber3").html(nomineeList[2].GuardianIDProofNumber);
                                    $("#txtNomineeRatioThree").html(nomineeList[2].NomineeRatio);
                                    ratio3 = nomineeList[2].NomineeRatio;
                                    $("#ddlNomineeProofIdThree").html(nomineeList[2].NomineeProofId);
                                    $("#ddlGurdianProofIdThree").html(nomineeList[2].GuardianProofId);
                                    $("#txtGurdianIDProofNumberThree").html(nomineeList[2].GuardianIDProofNumber);
                                    $("#txtGurdianDOBThree").html(nomineeList[2].GuardianDateofBirth);
                                    $("#ddlGuardianRelationThree").html(nomineeList[2]._GuardianRelationship);

                                    $("#txtGuardianFirstNameThree").html(nomineeList[2].GuardianFirstName);
                                    $("#txtGuardianMiddleNameThree").html(nomineeList[2].GuardianMiddleName);
                                    $("#txtGuardianLastNameThree").html(nomineeList[2].GuardianLastName);
                                    if (nomineeList[2].IsSamePermenantAddress == "1") {
                                        $("#chkIsAddrSameAppltThree").prop('checked', true);
                                    }
                                }
                                else {
                                    $("#hdnChkIsNominee").html("0");
                                    //$("#showNomineeDetails").hide();
                                    $("#DivNomineehideShow").hide();
                                    $("#imgNominateHolder").prop("src", "../../Images/delete.GIF");
                                }
                            }
                        }
                     


                        $("#txtNomineeDOB,#txtGurdianDOB,#txtNomineeDOBTwo,#txtGurdianDOBTwo,#txtNomineeDOBThree,#txtGurdianDOBThree").datepicker({
                            dateFormat: 'dd/mm/yy',
                            yearRange: "1920:2100", //   yearRange: '1950:2013',
                            changeMonth: true,//this option for allowing user to select month
                            changeYear: true,
                            maxDate: -1
                            // endate: today
                        });



                    }

                },
                error: function (msg, results) {
                    alert('Failed to get the information ');
                }
            });
        }
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }