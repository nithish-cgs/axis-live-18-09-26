# BYOD Flow — Reference

> **BYOD = "Bring Your Own Device"** — an RM-assisted onboarding journey. An RM
> (relationship manager) starts an account-opening application on the
> customer's behalf; the customer completes/confirms it, often on their own
> phone via a link the RM sends.
>
> **Methodology:** built by tracing the actual code (`app/app.js`,
> `app/BYOD/controller/Byod.js`, `app/BYOD/index.html`,
> `app/service/mod-server-comm.js`), not by reading names and guessing. Every
> claim below is anchored to a `file:line` you can open and check yourself.
> A handful of the more surprising/bug-shaped claims were independently
> re-verified after the initial trace — two of those verifications **overturned**
> the initial finding; both corrections are marked `[VERIFIED]` below so you
> don't have to re-derive them.

---

## 1. Entry points

Every BYOD-related global is parsed from the URL **once, at script load**, in
`app/app.js` — before ui-router even initializes:

```js
// app.js:109
var BYOD = (getParameterByName('BYOD', url));
// app.js:110 — query param is spelled "EsignBYOD" correctly; the JS variable
// and every $rootScope property derived from it carry the typo "EsginBYOD"
// consistently, throughout the whole codebase.
var EsginBYOD = (getParameterByName('EsignBYOD', url));
// app.js:125
var byodEmailVerify = getParameterByName('BYODEmailVerify', url);
```

Defaults, set in `mainApp.run(...)` (`app.js:249-284`):

```js
$rootScope.BYOD = false;
$rootScope.EsginBYOD = false;
$rootScope.ByodResume = false;
$rootScope.BYODURl = true;
$rootScope.RMBYOD = false;
```

Flag-setting, in the order it runs (`app.js:370-454`):

```js
// RM-originated link
if (RMVia == "RM") {
    sessionStorage.setItem("RMVia", RMVia);
    $rootScope.RMBYOD = true;
}
if (sessionStorage.getItem("RMVia")) { $rootScope.RMBYOD = true; }

// ...

if (byodEmailVerify) { sessionStorage.setItem('byodVerifyEmail', true); }

if (BYOD == "true") {
    $rootScope.BYOD = true;
    sessionStorage.setItem('BYOD', $rootScope.BYOD);
}
if (EsginBYOD == "true") {
    $rootScope.EsginBYOD = true;
    sessionStorage.setItem('EsginBYOD', $rootScope.EsginBYOD);
    $rootScope.BYODURl = false;
}

// re-derived from sessionStorage on every subsequent load (no URL param needed)
if (sessionStorage.getItem('BYOD') == 'true') {
    $rootScope.BYOD = true;
    $rootScope.ByodResume = true;       // ← this is the "we're resuming" signal
}
if (sessionStorage.getItem('EsginBYOD') == 'true') {
    $rootScope.EsginBYOD = true;
    sessionStorage.setItem('EsginBYOD', $rootScope.EsginBYOD);
    $rootScope.BYODURl = false;
}
```

**In plain terms:** `?BYOD=true` turns the journey on and remembers it for the
rest of the session. `?EsignBYOD=true` is a *different* flag, remembered
separately, that additionally forces `BYODURl = false` (see §6). Because these
globals are read from `window.location.href` directly — not from a ui-router
URL param — `?BYOD=true` works appended to *any* app URL
(`.../register?BYOD=true`), not just `/Byod`.

Server-driven activation (not URL-driven): several response handlers set
`$rootScope.BYOD = true` when the backend reports `response.Mode == 'B'` —
`app.js:1609-1612`, `:2457-2460`, `:2524-2526`, `:5565-5568`, `:7028`. These all
sit inside the `GetDecryptURL`/profile-status response handling described in
§4 and §7.

`app.js:2328` — `if (ReferenceNumber && BYOD) { sessionStorage.setItem('BankRef', ReferenceNumber) }`.

`app.js:2395-2399` — the `Byod` boolean sent to `GetDecryptURL` is computed as
`sessionStorage.getItem('BYOD') && !$rootScope.EsginBYOD` — **plain BYOD and
EsignBYOD are mutually exclusive at that call site.**

---

## 2. Routing

```js
// app.js:4566-4570
.state('Byod', {
    url: '/Byod?mobile',
    templateUrl: 'app/Byod/index.html',
    controller: 'ByodController'
})
```

**Casing note:** the folder on disk is `app/BYOD/`, but `templateUrl` says
`app/Byod/index.html`. This only works because the environments serving it
(dev, and presumably prod) are case-insensitive. It would break outright on a
case-sensitive filesystem/web server.

The state is entered in exactly one place: `$state.go('Byod')` at
`app.js:1593`, gated by:

```js
// app.js:1590
if (((response.Mode && response.Mode == 'B') || ($rootScope.BYOD)) && ($rootScope.ByodResume)) {
    $rootScope.BYOD = true;
    $state.go('Byod');
    return;
}
```

Controller registration: `app/BYOD/controller/Byod.js:21` —
`mainApp.controller('ByodController', ['$scope', '$rootScope', '$state', 'serverService', function (...) {`.

Loaded via `<script src="app/BYOD/controller/Byod.js?ver=3.3">` (`index.html`).

---

## 3. Controller structure (`app/BYOD/controller/Byod.js`, 7,876 lines)

Every `$scope.*`/`$rootScope.*` function, in file order:

| Function | Line | What it does |
|---|---|---|
| `owlSet` | 195 | Owl-carousel config for the plan slider |
| `openCollapse` | 254 | No-op stub |
| **`overallApi`** | 265 | **The BYOD router.** Calls `GetOverallStatusDIY`, sets exactly one stage flag based on `OverallStatusList[]`, loads that stage's data. Runs once at boot and again after every save. |
| `getProfileInfo` | 348 | `DIYGetClientPersonalInfoByReferenceNumber` — name/address; shows "verification link sent" if email pending |
| `firstTrems` … `emarginCancel` | 637-758 | Terms/consent checkbox + modal bookkeeping (DDPI, E-Margin, MITC, preferences) |
| `getPersonalInfo` | 782 | `DIYGetClientOtherInfoByReferenceNumber` — occupation/financial/nominee fields |
| `personalUpdate` | 1272 | **Dead** — see §9. Posts `DIYClientOtherInfo` directly; its only button is HTML-commented |
| `Encryption(data)` | 1562 | `axisCrypto.enc(data).toString()` — field-level encryption wrapper |
| `getProductPaymentActionDetails` | 1567 | `GetALLPlanByBusinessType` (`BusinessType="BYOD"`), builds/auto-selects the plan carousel |
| `handlePermission` (`$rootScope`) | 1764 | Requests geolocation + camera permission |
| `geolocation` | 1802 | `Validategeolocation` |
| `imgFormData` | 1821 | `UploadFormData` (multipart) |
| `imgUpload`, `readfiles`, `processfile`, `resizeMe`, `update_img` | 1861-2524 | Client-side image capture/resize/preview pipeline |
| `pdfReadFn` | 2740 | PDF preview |
| `upldImageValidate` | 2762 | Client-side file type/size validation |
| `updateImage` | 2980 | `DIYImageUpload`/`DIYImageUploadOptimize` (calls `ValidateDocument`, `Documentextraction` internally) |
| `getDocsProof` | 3715 | `DIYGetDocumentProofStageByRefEnc` — drives DDPI/E-margin/Sikkim/KRA document requirements |
| `popfathernamePan`, `ContiueWithOutPan` | 3944, 3971 | Both post `FathernameUpdate` (accept IDfy-extracted name, or explicitly skip) |
| `getImages` | 3998 | `DIYGetImagesByReferenceNumberFlag` |
| `bindImage` | 4316 | Binds a fetched image (`DIYGetImagebyRefNum`) into its preview slot |
| `derivativesAll`, `derivatives`, `declineDModal` | 4820-4846 | F&O/derivatives segment opt-in + decline confirmation |
| `getToken` | 4857 | `GetEncrptToken` |
| `getProductInfo` | 4877 | `DIYGetProductInfoByReferenceNumber` |
| `prdSelect`, `productSelect` | 5180, 5249 | Plan-carousel selection (UI-only, then derived-field population) |
| **`ComfirmDocument`** | 5289 | **The one live Submit handler for the whole form.** See §5 for its full branch structure. |
| `android` | 7178 | Calls `window.Android.ABLFunc()` if present (native WebView bridge) |
| `productSentSms` | 7185 | Posts `RMSendSmsToUserDIY`, shows "payment link sent" modal |
| `DIYUpdateIPVStage(process)` | 7220 | Mostly-commented (see §9); `process=='esign'` redirects to the NSDL eSign URL via a hidden auto-submit form |
| `updateIPVStage` | 7362 | Posts `DIYUpdateIPVStage`; on `'1'/'100'/'200'` → `$state.go('complete', ...)` — **the only other `$state.go` in this file** |
| `ProceedPayment` | 7401 | Payment-gateway redirect |
| `preferencesBYOD` (`$rootScope`) | 7413 | Shows the preferences info modal |
| `politicaldefalut` | 7420 | Resets the "politically exposed" select |
| `verifyKra` | 7480 | `VerifyKRAClientStatus` (`Mode:"B"`) |
| `newEmailValidate`, `getEmailVerificatioUrl` | 7499, 7519 | Email format check → `EmailVerificationUrl` (`Mode:'B'`) → shows "link sent" modal |
| `ModalTrigger(id, show)` | 7553 | Generic bootstrap-modal helper |
| `emstatus` | 7570 | Records "email/mobile belongs to" radio selection |
| `newMobileValidate` | 7581 | `AuthorizeOTPGeneration` (mobile-change OTP) |
| `changeMobile`, `cancelMobile` | 7648, 7664 | Start / cancel a mobile-change |
| `validateOTP` | 7678 | `UnAuthorizeOTPValidation`, then `MobileByReferenceNumber` + `InsertLandingDetails` |
| `Disability`, `DisabilityModalYes`, `DisabilityModalNo`, `OverallDisability` | 7774-7855 | `CaptureDifferentlyAbled`; `DisabilityModalYes`/`OverallDisability` **hard-redirect** out of the SPA to `simplehai.axisdirect.in` |
| `emailShowChange` | 7872 | Forces the email-change UI back open |

**Correction to a common assumption:** `apiCallFields`/`apiCallEnc` (names used
elsewhere in the codebase's non-BYOD controllers, e.g. `personalDetails.js`,
`documentUpload.js`) **do not exist** in `mod-server-comm.js`. `serverService`
only exposes `apiCall` (which internally branches on `apiEncryptList`), plus
`getApi`, `apiFormCall1`, `apiUrlCall`, `apiTokenUrlCall`,
`apiOfflineAadharUpload`, `apiPaymentCall`, `apiIPVCall`, `apiEsignCall`.

---

## 4. API surface

`apiEncryptList` (`app/service/mod-server-comm.js:31-49`) determines whether
`apiCall` whole-payload-encrypts the request into `{Encrequest: "..."}` and
decrypts the response, or sends/reads plain JSON. Either way, every call
carries `Authorization: Basic <axisCrypto.basicAuthHeader()>`.

| Endpoint | Called at (Byod.js unless noted) | Payload highlights | Encrypted? |
|---|---|---|---|
| `GetOverallStatusDIY` | 266 | `{ReferenceNumber}` | Yes |
| `DIYGetClientPersonalInfoByReferenceNumber` | 353 | `{ReferenceNumber, IsDiy, EncryptToken}` | No |
| `DIYGetCityListForAutoFill` | 472, 554 | GET | n/a |
| `DIYGetClientOtherInfoByReferenceNumber` | 785 | `{ReferenceNumber, IsDiy, EncryptToken}` | No |
| `DIYClientOtherInfo` | 1377 (dead), 5597, 6207 (live) | `ObjCDIYClientOtherInfo{...}` — Email/Mobile **also** field-encrypted via `Encryption()` | Yes |
| `EmailVerificationUrl` | 1490, 7520 | `{ReferenceNumber, Email, ..., Mode:'B'}` | Yes |
| `Validategeolocation` | 1803 | `{ReferenceNumber, latitude, longitude}` | No |
| `UploadFormData` | 1822 | multipart image bytes | No (multipart, bypasses the envelope) |
| `ValidateDocument` | 2782 | doc validation | No |
| `DIYImageUpload` / `DIYImageUploadOptimize` | 2799-3435 (4 sites) | image + metadata | No |
| `Documentextraction` | 3056 | OCR extraction | Yes |
| `DIYGetDocumentProofStageByRefEnc` | 3716 | `{ReferenceNumber}` | Yes |
| `FathernameUpdate` | 3945, 3972 | accept/skip father's name | Yes |
| `DIYGetImagesByReferenceNumberFlag` | 4000 | `{ReferenceNumber,...}` | Yes |
| `DIYGetImagebyRefNum` | 4320 | fetch one image | No |
| `GetEncrptToken` | 4858 | token bootstrap | No |
| `DIYGetProductInfoByReferenceNumber` | 4882 | `{ReferenceNumber, IsDiy, EncryptToken}` | No |
| `GetALLPlanByBusinessType` | 1573, 5048 | `{ReferenceNumber, BusinessType, Mode, SiddhiApp}` | No |
| `DIYClientPersonalInfoProfile` | 5394 | address fields — Email/Mobile **plain**, relies on envelope only | Yes |
| `DIYClientProductRegistrationBYOD` | 5736, 6346, 6750 | `ObjCDIYProduct{ProductId, segment flags, AssistLGCode/LCCode, PromoCode, DematType, ReferralCode}` | No |
| `DIYPaymentSkip` | 5893, 6503, 6907 | `{ReferenceNumber, IsSkippay:true}` (zero-payment plans) | No |
| `SignatureEsignBYODUrlSend` | 5971, 6524, 6627, 6928, 7024, 7145 | `{ReferenceNumber}` — triggers the customer's own-device eSign link | No |
| `updateDDIP` | 5980-ish (4 sites) | `{DDIP, RiskDisclosure:"Y", ReferenceNumber, Emargin}` | No |
| `DIYDocStageCompletion` | 5988, 6541, 6644, 6945, 7041, 7162 | `{ReferenceNumber, IsDocStageCompleted:true}` | No |
| `RMSendSmsToUserDIY` | 7190 | `{ReferenceNumber}` | No |
| `GenerateESignPDFNewV1` | 7332 | GET — `ReferenceNumber` travels **plain in the URL query string** | n/a |
| `DIYUpdateIPVStage` | 7363 | `{ReferenceNumber, BrowserType, IsDiy, EncryptToken}` | No |
| `VerifyKRAClientStatus` | 7481 | `{Mobile, Email, PanNumber, DOB, RMCode, Mode:"B"}` — **note:** not the same endpoint as `VerifyKRAClientStatusEnc`, which *is* encrypted | No |
| `AuthorizeOTPGeneration` | 7591 | `{ReferenceNumber, Mobile, Email, MobileFlag:true}` | No |
| `UnAuthorizeOTPValidation` | 7685 | `{Mobile, Email, MobileOtpCode, DOB, PanNumber}` | Yes |
| `MobileByReferenceNumber` | 7720 | `{ReferenceNumber, Mobile, MobileFlag:"Y"}` | No |
| `InsertLandingDetails` | 7727 | `{AssistLCCode, AssistLGCode, City, EmailId, MobileNumber, ClientName}` | No |
| `CaptureDifferentlyAbled` | 7785, 7811 | `{ReferenceNumber, PanNumber, DifferentlyAbledStatus}` | Yes |

**BYOD-relevant calls from `app.js` (not Byod.js):**
`GetDecryptURL` (`app.js:2389, 5536, 7017` — encrypted; sets `$rootScope.BYOD`,
shows the EsignStatus modal, or routes to `register`/`documentUpload` on
mismatch), `OpenApp` (`app.js:2427`, GET, plain — "open on your own device"
popup).

**⚠ Real inconsistency, not a design choice:** `DIYClientOtherInfo` double-encrypts
`Email`/`Mobile` (envelope **+** field-level `Encryption()`), while the sibling
save `DIYClientPersonalInfoProfile` sends the same two fields plain, relying on
the envelope alone. Both are verified at the lines cited above.

---

## 5. Stage / field flow

**Boot** — `overallApi()` (called once, `Byod.js:347`) fetches
`GetOverallStatusDIY` and sets exactly one path based on `OverallStatusList[]`
(`Byod.js:296-344`):

1. `BYODPersonalStage = true` if the email/personal item isn't complete —
   also sets `BYODPlanStage = true` if the plan item isn't done either.
2. else `BYODPlanStage = true` if the plan item isn't done.
3. else if the docs item isn't done: just refreshes `getDocsProof()` — **no
   stage flag is set**, so this state has no live UI section (see §9).
4. else: falls straight to `ComfirmDocument()` — the "everything already
   saved, just (re-)send the eSign link" terminal path.

**Template sections** (`app/BYOD/index.html`), one shared accordion, one
shared Submit button (`ComfirmDocument()`, line 1847):

| Section | Gate | Status |
|---|---|---|
| Address (`BYODAddressStage`) | line 512 | **Never set `true` anywhere live** — effectively unreachable; address data is populated as part of the personal-info save instead |
| Personal (`BYODPersonalStage`) | 696-1130 | **Live.** Name/occupation/financial/nominee + inline email & mobile verification (OTP flows) |
| Plan (`BYODPlanStage`) | 1215-1377 | **Live.** Plan carousel + segment checkboxes + LG/LC assist-code gate |
| PAN stage | 461-509 | **Entirely HTML-commented** — dead |
| Bank (`BYODBankSatge`) | 1135-1210 | **Entirely HTML-commented** — dead |
| Documents (`BYODDocument`) | 1382+ | **Dead** — `[VERIFIED]` only `= false` assignments exist anywhere in live code (`Byod.js:60, 283`); every `= true` assignment is commented out |

**`ComfirmDocument()`** branches on whichever of `BYODAddressStage` /
`BYODPersonalStage` / `BYODPlanStage` is currently true (checked in that
order) and drives: personal/address save → `DIYClientProductRegistrationBYOD`
→ (`DIYPaymentSkip` if zero-payment, else the "payment link sent" SMS) →
`SignatureEsignBYODUrlSend` + `updateDDIP` + `DIYDocStageCompletion` → the
"eSign link sent to customer" confirmation modal.

**There is no in-SPA document upload and no `$state.go('complete')` on this
button's path** — completion happens on the *customer's own device* via the
SMS/email eSign link. The file's only live `$state.go('complete')`
(`Byod.js:7387`) is reached only through `updateIPVStage`, itself only called
from `DIYUpdateIPVStage('esign')`, whose one UI trigger sits inside a modal
(`formPDF1`) that nothing in the template visibly opens for this state —
likely more unreached wiring (see §9).

---

## 6. EsignBYOD sub-flow

A **different journey**, not an alternate UI inside `ByodController` —
`EsginBYOD` is referenced **zero times** in `Byod.js` (`[VERIFIED]`
`grep -c "EsginBYOD" Byod.js` → `0`). It's a short-circuit layered in front of
the same machinery, entirely in `app.js`.

- **Entry:** `?EsignBYOD=true` → sets `$rootScope.EsginBYOD`, persists it, and
  forces `$rootScope.BYODURl = false` (`app.js:441-444`, re-derived from
  `sessionStorage` on reload at `:450-453`).

- **`BYODURl` is NOT dead.** *(Correction to the initial trace, which said
  it's never read anywhere — it missed a file outside its search scope.)*
  `[VERIFIED]`: `app/documentUpload/controller/documentUpload.js:712-714`:
  ```js
  if (!$rootScope.BYODURl) {
      $scope.displayForm();
  }
  ```
  Since `BYODURl` defaults `true` and is only forced `false` for EsignBYOD
  sessions, this means: **an EsignBYOD session that reaches the
  `documentUpload` state auto-displays the form**, bypassing whatever gate
  `displayForm()` would otherwise wait for.

- **Divergence #1** (`app.js:1589`) — the `$state.go('Byod')`
  auto-resume-navigation (§2) is wrapped in `else if (!$rootScope.EsginBYOD)`.
  An EsignBYOD session does **not** get routed into `ByodController` on
  resume — it's expected to already be past data entry.

- **Divergence #2** (`app.js:2395-2399`) — the `Byod` flag sent to
  `GetDecryptURL` excludes EsignBYOD sessions (see §1).

- **Divergence #3** (`app.js:2445-2452`, mirrored `:5548-5555`) — the defining
  behavior:
  ```js
  if (response.EsignStatus == "Y" && sessionStorage.getItem('EsginBYOD') == 'true') {
      // show #EsignStatus modal
      return;  // no $state.go, no further field population
  }
  ```
  Once the backend reports the eSign is already done, an EsignBYOD session is
  simply shown a status modal.

---

## 7. Resume / reject state

| Key | Set at | Meaning / effect |
|---|---|---|
| `ByodResume` | `app.js:446-449`, when re-deriving from `sessionStorage.BYOD=='true'` on a fresh load | "This is a continuing session, not a fresh `?BYOD=true` URL." Gates the `$state.go('Byod')` auto-navigation (§2). |
| `byodProfileReject` (sessionStorage) | `app.js:1799` — `if (OverallStatusList[1].EBOStatus == 'R')` (RM/back-office rejected the profile) | **Not read anywhere in `app.js` or `Byod.js`.** Its only consumer: `app/address/controller/address.js:107` — disables DigiLocker auto-fill for a rejected-and-resubmitting BYOD customer who's landed in the *regular* `address` state. Confirms: rejection routes the user **out of `ByodController` entirely**, into the standard DIY controllers, with `$rootScope.BYOD` still true there. |
| `RMBYOD` | `?Via=RM` or `sessionStorage.RMVia` (`app.js:370-376`) | Read once, `app.js:2426`: suppresses the "open this on your own device" popup for a resuming customer who's already on the RM's own device. Never read inside `Byod.js`. |
| `byodEmailVerify` (URL) → `sessionStorage.byodVerifyEmail` | `app.js:434-436` | Skips the generic invalid-reference error path (`app.js:2734`) and suppresses an automatic `decryptUrl()` call while an email-verify redirect is in flight (`:2759/2762`) — avoids a race. Distinct from `byodemailverifylinksend`/`byodMail`, which are `Byod.js`'s own keys for its inline email-verify UI (`Byod.js:538, 619, 7519-7551, 7565`). |

---

## 8. Crypto (relation to the AES key remediation)

- **No raw `CryptoJS.AES` call exists anywhere in `Byod.js`** — `[VERIFIED]`
  zero matches for `CryptoJS` in the whole file, including comments.
- The only `axisCrypto` site inside `Byod.js` is the `Encryption()` wrapper
  (line 1562-1564): `axisCrypto.enc(data).toString()` — used to field-encrypt
  `Email`/`Mobile` before embedding them in `DIYClientOtherInfo` (see the
  double-encryption note in §4).
- All whole-payload envelope encrypt/decrypt happens centrally in
  `mod-server-comm.js:209-237`, calling `axisCrypto.enc`/`axisCrypto.dec` — no
  raw `CryptoJS.AES` there either. Header comment: *"AES key material removed
  - crypto now goes through the axisCrypto facade... See
  APPSEC_KEY_REMEDIATION_HANDOVER.md section 2."* (verbatim, also at
  `app.js:143-145`).
- `mod-server-comm.js:234-235` still calls `CryptoJS.enc.Utf8` — that's just
  the WordArray→UTF-8 string conversion downstream of `axisCrypto.dec()`, not
  an AES operation.

---

## 9. Known issues & dead code

**Live bugs** (things that would misbehave, not just unreachable code):

- **`byodFail` modal is missing.** `[VERIFIED]` `app.js:2742` calls
  `$rootScope.commonModalCall("byodFail", true)` when a BYOD reference-number
  decrypt fails (`app.js:2734`), but **no element with `id="byodFail"` exists
  anywhere under `app/`**. `commonModalCall` does an unguarded
  `document.getElementById(id)` → `new bootstrap.Modal(...)`, so this throws
  instead of showing an error to the user whenever an invalid/expired BYOD
  link is opened.

**Confirmed NOT a bug** *(the initial trace flagged this; independent
verification overturned it)*: `profileBTerms()` (`Byod.js:713`) calling
`getElementById('profileBterms')` looked broken because the modal markup at
`index.html:2027` is HTML-commented — but a **second, live** copy of the same
`id="profileBterms"` modal exists at `index.html:2677`. Browsers don't parse
comment contents into the DOM, so `getElementById` only ever sees the live
one. This function works correctly.

**Dead / unreachable code:**

| Item | Where | Why it's dead |
|---|---|---|
| `personalUpdate()` | `Byod.js:1272` | Its only button is HTML-commented (`index.html:1122-1129`) |
| PAN stage section | `index.html:461-509` | Entirely HTML-commented |
| Bank stage section | `index.html:1135-1210` | Entirely HTML-commented |
| Documents section (`BYODDocument`) | `index.html:1382+`, `Byod.js` throughout | Every `=true` assignment is commented; only `=false` remains live |
| `BYODAddressStage` path | `index.html:512`, `Byod.js` | Never set `true` anywhere live |
| `DIYUpdateIPVStage`'s validation body | `Byod.js:7223-7327` | Commented out — only the `esign`-redirect and the `updateIPVStage('')` fallback remain live; the completeness checks the comments describe don't run |
| `$state.go('complete', ...)` in `OverallDisability` | `Byod.js:7864-7866` | Commented, replaced by a hard `window.location.assign(...)` redirect out of the SPA on the next line |
| Payment-pixel block | `Byod.js:5165-5179` | Commented, superseded by `DIYPaymentSkip` handling |
| Old `/config.json` AES-key fetch | `app.js:132-142`, `mod-server-comm.js:17-27` | Commented, consistent with the crypto remediation (§8) |

The sheer number of `// $scope.BYODDocument=true;` / `// $scope.BYODcAddressUpdt...`
comments scattered through `ComfirmDocument` (e.g. `Byod.js:5905, 5939-5952,
6554, 6591-6600, 6957, 6992-7000, 7108-7122`) reads as a deliberate removal of
the document-upload stage and the correspondence-address re-upload checks from
the active flow, not an accident.

---

## Quick reference — sessionStorage keys

| Key | Written by | Read by |
|---|---|---|
| `BYOD` | `app.js:439` | `app.js:446, 2395, 2421` |
| `EsginBYOD` | `app.js:443, 452` | `app.js:2399, 2445, 5548` |
| `byodVerifyEmail` | `app.js:435` | `app.js:2734, 2759, 2762` |
| `byodemailverifylinksend`, `byodMail` | `Byod.js:7519-7551` | `Byod.js:538, 619, 7565` |
| `byodProfileReject` | `app.js:1799` | `app/address/controller/address.js:107` |
| `RMVia` | `app.js:371` | `app.js:374` |
| `BankRef` | `app.js:2328` | — (decrypt-URL fallback elsewhere) |

---

*Generated by tracing `app/app.js`, `app/BYOD/controller/Byod.js`,
`app/BYOD/index.html`, and `app/service/mod-server-comm.js` directly. If code
changes, re-derive rather than hand-edit stale line numbers into this file.*
