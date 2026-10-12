# BYOD — Function Map (function → file → line)

> Companion to `BYOD-BUSINESS-FLOW.md`. Line numbers were taken from the
> current working tree (`grep -n`). Re-generate if the files change.
>
> Files: `app/app.js` (A), `app/BYOD/controller/Byod.js` (B),
> `app/BYOD/index.html` (H), `app/service/mod-server-comm.js` (S),
> `app/address/controller/address.js`, `app/documentUpload/controller/documentUpload.js`.

---

## 1. `app/app.js` — entry / routing

| What | Line | Notes |
|---|---|---|
| `var BYOD = getParameterByName('BYOD')` | 109 | URL param |
| `var EsginBYOD = getParameterByName('EsignBYOD')` | 110 | typo `Esgin` is used everywhere |
| `var byodEmailVerify = ...('BYODEmailVerify')` | 125 | |
| `$rootScope` defaults (BYOD, EsginBYOD, ByodResume, BYODURl, RMBYOD) | 249-284 | |
| RM link (`RMVia`, `RMBYOD`) | 370-376 | |
| `byodVerifyEmail` session key | 434-436 | |
| `BYOD=true` handling | 438-440 | |
| `EsignBYOD=true` handling (`BYODURl=false`) | 441-444 | |
| `ByodResume` re-derive from sessionStorage | 446-449 | |
| `EsginBYOD` re-derive | 450-453 | |
| `state('Byod')` route | 4566-4570 | `url:'/Byod?mobile'`, `templateUrl 'app/Byod/index.html'` |
| `$state.go('Byod')` (only entry) | 1593 (gate 1590) | `Mode=='B' or BYOD` and `ByodResume` |
| skip Byod for EsignBYOD | 1589 | `else if (!$rootScope.EsginBYOD)` |
| rejected profile → `byodProfileReject` | 1799 | `OverallStatusList[1].EBOStatus == 'R'` |
| `BankRef` store | 2328 | |
| `GetDecryptURL` call | 2389 (also 5536, 7017) | |
| `Byod` flag sent to decrypt | 2395-2399 | |
| `OpenApp` popup | 2426-2427 | suppressed when `RMBYOD` |
| EsignStatus modal | 2445-2452 (mirror 5548-5555) | |
| `Mode=='B'` sets `$rootScope.BYOD` | 1609, 2457, 2524, 5565, 7028 | |
| invalid ref → `byodFail` modal | 2734, 2742 | modal missing |
| `byodVerifyEmail` used | 2734, 2759, 2762 | |
| old `/config.json` key fetch (commented) | 132-142 | crypto remediation |

---

## 2. `app/BYOD/controller/Byod.js` — controller functions (in file order)

### 2.1 Bootstrap and status
| Function | Line | Purpose | API |
|---|---|---|---|
| `imgUpld`, `delImg`, `setUrl` (globals) | 1, 4, 7 | image helpers | – |
| stage flags init (`BYODPanStage` … `BYODDocument`) | 55-60 | | – |
| `owlSet` | 195 | plan carousel config | – |
| `openCollapse` | 254 | empty stub | – |
| **`overallApi`** | **265** (called 347) | stage router | `GetOverallStatusDIY` (266) |

### 2.2 Personal data
| Function | Line | Purpose | API |
|---|---|---|---|
| `getProfileInfo` | 348 | name/address, "verification link sent" state | `DIYGetClientPersonalInfoByReferenceNumber` (353); `DIYGetCityListForAutoFill` (472, 554) |
| `getPersonalInfo` | 782 | occupation, financial, nominee | `DIYGetClientOtherInfoByReferenceNumber` (785) |
| `personalUpdate` | 1272 | **dead** (button commented) | `DIYGetClientPersonalInfoByReferenceNumber` (1229), `DIYClientOtherInfo` (1377), `EmailVerificationUrl` (1490) |
| `Encryption(data)` | 1562 | `axisCrypto.enc` wrapper | – |
| `politicaldefalut` | 7420 | reset PEP select | – |
| `verifyKra` | 7480 | KRA check | `VerifyKRAClientStatus` (7481, path var 7494) |

### 2.3 Consents / terms
| Function | Line |
|---|---|
| `firstTrems` | 637 |
| `secondTrems` | 644 |
| `thirdTrems` | 651 |
| `ddpiFn` | 658 |
| `ddpiModal` | 667 |
| `ddpiAccept` | 674 |
| `ddpiCancel` | 682 |
| `prefTerms` | 693 |
| `mitcTerms` | 701 |
| `emarginTerms` | 709 |
| `profileBTerms` | 720 |
| `profileBTerms1` | 728 |
| `emarginAccept` | 736 |
| `emarginCancel` | 751 |
| `preferencesBYOD` (`$rootScope`) | 7413 |

### 2.4 Plan / product
| Function | Line | Purpose | API |
|---|---|---|---|
| `getProductPaymentActionDetails` | 1567 | plan list, `BusinessType="BYOD"` | `GetALLPlanByBusinessType` (1573) |
| `getToken` | 4857 | encrypt token | `GetEncrptToken` (4858) |
| `getProductInfo` | 4877 | saved product info | `DIYGetProductInfoByReferenceNumber` (4882); `GetALLPlanByBusinessType` (5048) |
| `derivativesAll` | 4820 | F&O opt-in (all) | – |
| `derivatives` | 4837 | F&O opt-in | – |
| `declineDModal` | 4846 | F&O decline | – |
| `prdSelect` | 5180 | select plan (UI) | – |
| `productSelect` | 5249 | plan-derived fields | – |
| `productSentSms` | 7185 | payment link SMS | `RMSendSmsToUserDIY` (7190) |
| `ProceedPayment` | 7401 | payment redirect (`Form/Payment/PaymentRequest.aspx`, 7410) | – |
| `android` | 7178 | `window.Android.ABLFunc()` bridge | – |

### 2.5 Submit — `ComfirmDocument` (5289 – 7176)
| Part | Line | Notes |
|---|---|---|
| pre-checks: disability | 5291 | |
| pre-checks: e-mail not verified / link pending | 5297, 5304 | modal `byodModal` |
| pre-check: mobile change pending | 5312 | |
| **Address branch** (dead) | 5318 | `DIYClientPersonalInfoProfile` (5394); then `DIYClientOtherInfo` (5597), `DIYClientProductRegistrationBYOD` (5736), `DIYPaymentSkip` (5893), `SignatureEsignBYODUrlSend` (5971), `DIYDocStageCompletion` (5988) |
| **Personal branch** | 6089 | validation 6091-6150; save `DIYClientOtherInfo` (6207 → call 6293); success → plan stage 6323-6326 |
| Personal → product registration | 6346 (call 6449) | |
| Personal → `DIYPaymentSkip` | 6503 | |
| Personal → `SignatureEsignBYODUrlSend` | 6524, 6627 | |
| Personal → `DIYDocStageCompletion` | 6541, 6644 | |
| **Plan branch** | 6730 | LG-code check 6736; segment check 6746 |
| Plan → `DIYClientProductRegistrationBYOD` | 6750 (call 6853) | |
| Plan → error 305 (LG code) | 6855 | |
| Plan → `DIYPaymentSkip` (zero payment) | 6907 (call 6912) | |
| Plan → `SignatureEsignBYODUrlSend` | 6928, 7024 | |
| Plan → `updateDDIP` | 6937, 7033 | |
| Plan → `DIYDocStageCompletion` | 6945, 7041 | |
| Plan → paid plan: `productSentSms` | 6966 | |
| Plan → terms / DDPI validation | 6919-6926, 7006-7013 | |
| Plan → `BYODConfirmRM` modal | 6951, 7047 | |
| Plan → PAN info modal (error -1) | 7058-7066 | |
| Plan → "connection" modal | 7067-7071 | |
| **Else-branch** (all saved) | 7077 | LG check 7082, consent check 7123-7130, eSign 7144-7172 |

### 2.6 eSign / IPV / completion
| Function | Line | Purpose | API / target |
|---|---|---|---|
| `DIYUpdateIPVStage(process)` | 7220 | body mostly commented; `'esign'` → NSDL redirect | – |
| `updateIPVStage` | 7362 | posts stage | `DIYUpdateIPVStage` (7363/7380) → `$state.go('complete')` (7387) |

### 2.7 E-mail and mobile verification
| Function | Line | Purpose | API |
|---|---|---|---|
| `newEmailValidate` | 7499 | format check | – |
| `getEmailVerificatioUrl` | 7519 | send verify link | `EmailVerificationUrl` (7520, `Mode:'B'`) |
| `ModalTrigger(id, show)` | 7553 | generic modal helper | – |
| `emstatus` | 7570 | who owns e-mail/mobile | – |
| `newMobileValidate` | 7581 | OTP generation | `AuthorizeOTPGeneration` (7591) |
| `changeMobile` | 7648 | start change | – |
| `cancelMobile` | 7664 | cancel change | – |
| `validateOTP` | 7678 | OTP check | `UnAuthorizeOTPValidation` (7685), `MobileByReferenceNumber` (7720), `InsertLandingDetails` (7727) |
| `emailShowChange` | 7872 | reopen e-mail edit | – |

### 2.8 Disability
| Function | Line | API |
|---|---|---|
| `Disability` | 7774 | `CaptureDifferentlyAbled` (7785) |
| `DisabilityModalYes` | 7810 | `CaptureDifferentlyAbled` (7811); redirect to `simplehai.axisdirect.in` |
| `DisabilityModalNo` | 7844 | – |
| `OverallDisability` | 7855 | redirect to `simplehai.axisdirect.in` |
| `overallApi` trigger | 285-294 | lock modal `OverallDisabilityModal` |

### 2.9 Documents / images (no visible document section in BYOD)
| Function | Line | API |
|---|---|---|
| `getDocsProof` | 3715 | `DIYGetDocumentProofStageByRefEnc` (3716) |
| `popfathernamePan` | 3944 | `FathernameUpdate` (3945) |
| `ContiueWithOutPan` | 3971 | `FathernameUpdate` (3972) |
| `getImages` | 3998 | `DIYGetImagesByReferenceNumberFlag` (4000) |
| `bindImage` | 4316 | `DIYGetImagebyRefNum` (4320) |
| `handlePermission` (`$rootScope`) | 1764 | geolocation + camera permission (`success` 1738, `error` 1755) |
| `geolocation` | 1802 | `Validategeolocation` (1803) |
| `imgFormData` | 1821 | `UploadFormData` (1822) |
| `imgUpload` | 1861 | capture pipeline |
| `readfiles` | 2453 | |
| `processfile` | 2469 | |
| `resizeMe` | 2500 | |
| `update_img` | 2524 | |
| `pdfReadFn` | 2740 | |
| `upldImageValidate` | 2762 | `ValidateDocument` (2782), `DIYImageUpload` (2799) |
| `updateImage` | 2980 | `DIYImageUpload` (3002, 3144, 3430), `Documentextraction` (3056), `Validategeolocation` (3130) |

---

## 3. `app/BYOD/index.html`

| Section | Line | Status |
|---|---|---|
| PAN stage | 461-509 | commented (dead) |
| Address stage (`BYODAddressStage`) | 512 | never true |
| Personal stage (`BYODPersonalStage`) | 696-1130 | live |
| Personal update button | 1122-1129 | commented |
| Bank stage | 1135-1210 | commented |
| Plan stage (`BYODPlanStage`) | 1215-1377 | live |
| Documents (`BYODDocument`) | 1382+ | dead |
| Submit button → `ComfirmDocument()` | 1847 | live |
| `profileBterms` modal (commented copy) | 2027 | commented |
| `profileBterms` modal (live copy) | 2677 | live |

---

## 4. API index (endpoint → where called)

| Endpoint | Byod.js lines | Encrypted envelope? |
|---|---|---|
| `GetOverallStatusDIY` | 266 | yes |
| `DIYGetClientPersonalInfoByReferenceNumber` | 353, 1229 | no |
| `DIYGetCityListForAutoFill` | 472, 554 | GET |
| `DIYGetClientOtherInfoByReferenceNumber` | 785 | no |
| `DIYClientOtherInfo` | 1377 (dead), 5597, 6207 | yes |
| `EmailVerificationUrl` | 1490, 7520 | yes |
| `GetALLPlanByBusinessType` | 1573, 5048 | no |
| `Validategeolocation` | 1803, 3130 | no |
| `UploadFormData` | 1822 | multipart |
| `ValidateDocument` | 2782 | no |
| `DIYImageUpload` / `Optimize` | 2799, 3002, 3144, 3430 | no |
| `Documentextraction` | 3056 | yes |
| `DIYGetDocumentProofStageByRefEnc` | 3716 | yes |
| `FathernameUpdate` | 3945, 3972 | yes |
| `DIYGetImagesByReferenceNumberFlag` | 4000 | yes |
| `DIYGetImagebyRefNum` | 4320 | no |
| `GetEncrptToken` | 4858 | no |
| `DIYGetProductInfoByReferenceNumber` | 4882 | no |
| `DIYClientPersonalInfoProfile` | 5394 | yes |
| `DIYClientProductRegistrationBYOD` | 5736, 6346, 6750 | no |
| `DIYPaymentSkip` | 5893, 6503, 6907 | no |
| `SignatureEsignBYODUrlSend` | 5971, 6524, 6627, 6928, 7024, 7145 | no |
| `updateDDIP` | next to each eSign send (e.g. 6937, 7033, 7154) | no |
| `DIYDocStageCompletion` | 5988, 6541, 6644, 6945, 7041, 7162 | no |
| `RMSendSmsToUserDIY` | 7190 | no |
| `DIYUpdateIPVStage` | 7363 | no |
| `VerifyKRAClientStatus` | 7481 | no |
| `AuthorizeOTPGeneration` | 7591 | no |
| `UnAuthorizeOTPValidation` | 7685 | yes |
| `MobileByReferenceNumber` | 7720 | no |
| `InsertLandingDetails` | 7727 | no |
| `CaptureDifferentlyAbled` | 7785, 7811 | yes |
| App-level: `GetDecryptURL` | app.js 2389, 5536, 7017 | yes |
| App-level: `OpenApp` | app.js 2427 | GET |

The "encrypted" column comes from `apiEncryptList` (`mod-server-comm.js:31-49`).
Every call also sends `Authorization: Basic <axisCrypto.basicAuthHeader()>`.

---

## 5. Cross-file consumers of BYOD state

| File | Line | Uses |
|---|---|---|
| `app/address/controller/address.js` | 107 | `byodProfileReject` → disables DigiLocker auto-fill |
| `app/documentUpload/controller/documentUpload.js` | 712-714 | `!$rootScope.BYODURl` → `displayForm()` |
| `app/service/mod-server-comm.js` | 31-49, 209-237 | encrypt list; envelope `axisCrypto.enc/dec` |

---

## 6. Call chain cheat-sheet

```
page load → app.js globals (109-125)
          → GetDecryptURL (app.js:2389)
          → $state.go('Byod') (app.js:1593)
          → ByodController init
              → overallApi (265) ─► getPersonalInfo (782) / getProductInfo (4877) / getDocsProof (3715)
                                  └► ComfirmDocument (343)
User clicks Submit → ComfirmDocument (5289)
   ├ personal → DIYClientOtherInfo → DIYClientProductRegistrationBYOD
   └ plan     → DIYClientProductRegistrationBYOD
        ├ free plan → DIYPaymentSkip
        └ paid plan → productSentSms → RMSendSmsToUserDIY
   → SignatureEsignBYODUrlSend + updateDDIP + DIYDocStageCompletion
   → BYODConfirmRM modal
```

> Lines marked "call" are the `apiCall` line; lines marked plain are where the
> endpoint name is assigned. Not every helper inside the image-upload pipeline
> (1861-3715) is listed with its inner branches; open the function line to
> follow the detail.
