# BYOD — Business Flow

> **BYOD = Bring Your Own Device.** A Relationship Manager (RM) starts an
> account-opening (Demat + Trading) application on behalf of a customer. The
> customer finishes it on their **own** device through an SMS / e-mail link.
>
> Companion file: `BYOD-FUNCTION-MAP.md` (function → file → line number).
> Line numbers refer to `app/app.js` and `app/BYOD/controller/Byod.js`.

---

## 1. Actors

| Actor | Role |
|---|---|
| **RM** | Opens the BYOD link (`?BYOD=true&Via=RM`), fills / verifies personal data, picks the plan, sends the customer links |
| **Customer** | Receives SMS / e-mail, verifies e-mail, completes eSign on own device |
| **Back office** | Can reject a profile (`EBOStatus == 'R'`); the customer is then pushed into the normal (non-BYOD) journey |

---

## 2. End-to-end story

```
RM link (?BYOD=true)                    app.js:109 / :439
      │
      ▼
GetDecryptURL  ─ decrypts the reference number, gets journey state   app.js:2389
      │
      ├─ invalid / expired link ──► "byodFail" modal (MISSING in DOM)   app.js:2742
      ├─ EsignBYOD + EsignStatus=Y ─► "eSign already done" modal         app.js:2445
      ├─ profile rejected (EBOStatus=R) ─► normal journey (address page) app.js:1799
      │
      ▼
$state.go('Byod')                                                        app.js:1593
      │
      ▼
ByodController boots → overallApi()  (GetOverallStatusDIY)               Byod.js:265
      │
      ├─ Differently-abled = Y ─► lock modal, redirect out of the SPA    Byod.js:285
      ├─ email not verified / rejected / personal stage pending
      │        ─► STAGE 1: PERSONAL   (+ plan stage if plan also pending)
      ├─ plan pending
      │        ─► STAGE 2: PLAN
      ├─ docs pending ─► only getDocsProof() (no visible section)
      └─ everything saved ─► ComfirmDocument() directly (resend eSign)   Byod.js:343
```

---

## 3. Step-by-step business flow

### Step 0 — Link arrival and journey activation (`app.js`)
1. RM sends a URL with `?BYOD=true` (optionally `Via=RM`, `EsignBYOD=true`,
   `BYODEmailVerify`). These are read once when `app.js` loads (`:109`, `:110`,
   `:125`) and saved to `sessionStorage` (`:370-454`).
2. `GetDecryptURL` (`:2389`) turns the encrypted link into a reference number.
   The `Byod` flag sent is `BYOD && !EsignBYOD` (`:2395-2399`).
3. Outcomes:
   - **Normal BYOD resume** → `$state.go('Byod')` (`:1590-1593`).
   - **EsignBYOD** (customer coming back to sign) → no navigation to the BYOD
     page; the status modal is shown when `EsignStatus == 'Y'` (`:2445-2452`).
   - **RM on own device** → the "open on your own device" popup is suppressed
     (`:2426`, `OpenApp` call `:2427`).
   - **Rejected profile** → routed to the regular DIY pages (`:1799`).
   - **Invalid link** → error modal `byodFail` — **modal does not exist in the
     HTML, so this throws** (`:2742`).

### Step 1 — Status check (`overallApi`, `Byod.js:265`)
`GetOverallStatusDIY` returns a list of stage statuses. Index meaning used by
the code:

| Index | Meaning in code | Used at |
|---|---|---|
| `[0]` | Reference number | `:296` |
| `[1]` | Profile / address status (`EBOStatus == 'R'` = rejected) | `app.js:1799` |
| `[2]` | Plan / product stage | `:316, :322` |
| `[4]` | Personal / e-mail stage (`IsEmailVerified`, `EBOStatus`, `SPStatus`) | `:308` |
| `[5]` | Document stage | `:332` |
| `[9]` | eSign completed (`SPStatus == 'Y'`) | `:297` |

The screen shown depends on this result — it is the **router** of the journey.

### Step 2 — Personal stage (RM / customer verifies details)
Section shown when `BYODPersonalStage = true` (`Byod.js:309`).

Data loaded:
- Name / address — `getProfileInfo` (`:348`) → `DIYGetClientPersonalInfoByReferenceNumber`
- Occupation, income, nominee, marital etc. — `getPersonalInfo` (`:782`) → `DIYGetClientOtherInfoByReferenceNumber`
- City list for auto-fill — `DIYGetCityListForAutoFill` (`:472`, `:554`)

Customer contact verification (inline on the page):
- **E-mail** — `newEmailValidate` (`:7499`) → `getEmailVerificatioUrl` (`:7519`)
  sends a verification link (`EmailVerificationUrl`, `Mode:'B'`). Journey cannot
  be completed until the e-mail is verified (`ComfirmDocument`, `:5297-5310`).
- **Mobile change** — `changeMobile` (`:7648`) → `newMobileValidate` (`:7581`,
  OTP generation) → `validateOTP` (`:7678`, OTP validation, then
  `MobileByReferenceNumber` `:7720` and `InsertLandingDetails` `:7727`).
  Journey is blocked while `changeMobile` is pending (`:5312-5317`).
- **Differently-abled question** — `Disability` (`:7774`); mandatory
  (`DisabilityVal`, `:5291`).
  - "Yes" → `DisabilityModalYes` (`:7810`) records it and hard-redirects to
    `simplehai.axisdirect.in`.

Validation on Submit (`ComfirmDocument`, personal branch `:6089`):
marital status, source of funds, every text/select field in `#additionalInfo`
(a few optional IDs are excluded, `:6109`, `:6133`).

Save: `DIYClientOtherInfo` (`:6207`; e-mail/mobile are also field-encrypted).
On success → personal stage closes, **plan stage opens** (`:6323-6326`).

### Step 3 — Plan / product stage
Section shown when `BYODPlanStage = true`.

- Plans loaded: `getProductPaymentActionDetails` (`:1567`) →
  `GetALLPlanByBusinessType` (`BusinessType = "BYOD"`); product info
  `getProductInfo` (`:4877`).
- RM picks a plan (`prdSelect` `:5180`, `productSelect` `:5249`), ticks segments
  (Equity, F&O, Currency, Mutual Funds, Commodity) and F&O opt-in
  (`derivativesAll` `:4820`, `derivatives` `:4837`, `declineDModal` `:4846`).
- **RM's LG code is mandatory** — if `assistedLGCode` is missing the page stays
  on the plan section and shows `lgcodereq` (`:6736-6741`, also `:6332`).
- At least one segment must be ticked (`:6746`, otherwise `productError`).
- Segment ticks are converted to `Y/N` flags and sent in
  `DIYClientProductRegistrationBYOD` (`:6750`), together with plan id, LG/LC
  code, promo code, referral code, demat type.
- Error `305` → back to plan section asking for LG code (`:6855`).
  Error `-1` → PAN information modal (`:7058`). Other failure → "connection"
  modal (`:7067`).

### Step 4 — Payment decision (after product registration succeeds)
Code at `:6878-7056`:

| Condition | What happens |
|---|---|
| `BYOD && iszeropayment` (free plan) | `DIYPaymentSkip` (`:6907`) → go to Step 5 |
| Otherwise (paid plan) | `productSentSms` (`:7185`) → `RMSendSmsToUserDIY` (`:7190`): customer gets a **payment link SMS**; "payment link sent" modal; then Step 5 checks |
| `dpBank` plan | `updateDpid()` runs instead (`:6915`) |
| `esignIsgurl` | `isgRedirect()` (`:6881`) |

Payment itself is **not** done on this page. `ProceedPayment` (`:7401`) exists
but the call to it in this path is commented out (`:6899-6902`).

### Step 5 — Consents and eSign link (customer's device)
Mandatory ticks before anything is sent (`:7006-7013`):
- Terms: `chkselct6`, `chkselct3` (first/second/third terms — `firstTrems` `:637`,
  `secondTrems` `:644`, `thirdTrems` `:651`), preferences `chkPref` (`prefTerms`
  `:693`), MITC `chkMITC` (`mitcTerms` `:701`).
- DDPI — `ddpiFn` `:658`, `ddpiModal` `:667`, `ddpiAccept` `:674`,
  `ddpiCancel` `:682`; E-Margin — `emarginTerms` `:709`, `emarginAccept` `:736`,
  `emarginCancel` `:751`.

If eSign is not already completed and no error:
1. `SignatureEsignBYODUrlSend` (`:7024`) — sends eSign link to the **customer's**
   mobile / e-mail.
2. `updateDDIP` — saves DDPI = Y/N, RiskDisclosure = "Y", E-Margin.
3. `DIYDocStageCompletion` (`:7041`) — marks document stage complete.
4. Modal `BYODConfirmRM` — "eSign link sent to customer" — is shown to the RM.

### Step 6 — Customer completes eSign (own device)
The customer opens the eSign link. `EsignBYOD=true` sessions are handled in
`app.js`: once `EsignStatus == 'Y'` the customer sees the status modal
(`app.js:2445`). Optional in-page eSign path: `DIYUpdateIPVStage('esign')`
(`Byod.js:7220`) → NSDL redirect; `updateIPVStage` (`:7362`) →
`DIYUpdateIPVStage` API → `$state.go('complete')` (`:7387`). **No visible UI
opens this path in the BYOD template**, so completion in practice happens via
the link.

---

## 4. Decision table — what `ComfirmDocument` (Submit) does

`ComfirmDocument` (`Byod.js:5289`) is the single Submit button (template line
1847). Order of checks:

1. Disability answered? (`:5291`)
2. E-mail verified / verification link pending? (`:5297`, `:5304`)
3. Mobile change pending? (`:5312`)
4. Then exactly one branch:

| Active flag | Branch starts | Action |
|---|---|---|
| `BYODAddressStage` | `:5318` | Address save (`DIYClientPersonalInfoProfile` `:5394`) → personal. **Never true in live code** |
| `BYODPersonalStage` | `:6089` | Validate → `DIYClientOtherInfo` → plan stage → product registration → payment → eSign |
| `BYODPlanStage` | `:6730` | LG code + segments → product registration → payment → eSign |
| none | `:7077` | Everything already saved → consent check → eSign resend |

---

## 5. Business rules summary

1. E-mail **must** be verified before the journey can finish.
2. A changed mobile **must** be OTP-verified first.
3. Differently-abled answer is mandatory; "Yes" exits the digital journey.
4. RM's **LG code is mandatory** for product registration.
5. At least one trading segment must be chosen.
6. Zero-payment plans skip payment; paid plans send the customer a payment link.
7. Four consents (two terms, preferences, MITC) are mandatory; DDPI is
   mandatory when `DDpiErr` is set.
8. eSign link is sent only if eSign is not already completed.
9. Back-office rejection sends the customer to the regular DIY pages.
10. The **document-upload stage was deliberately removed** from BYOD (many
    commented `BYODDocument = true` lines, e.g. `:5905`, `:6957`).

---

## 6. Session flags (quick reference)

| Key | Set at | Purpose |
|---|---|---|
| `BYOD` | `app.js:439` | Journey is BYOD; re-read on reload → `ByodResume` (`:446`) |
| `EsginBYOD` (typo is in code) | `app.js:443, :452` | eSign-only variant |
| `RMVia` | `app.js:371` | Link came from an RM |
| `byodVerifyEmail` | `app.js:435` | E-mail verification redirect in progress |
| `byodemailverifylinksend`, `byodMail` | `Byod.js:7519-7551` | Inline e-mail verify state |
| `byodProfileReject` | `app.js:1799` | Rejected profile → read in `address.js:107` |
| `changeMobile`, `changeNumber` | `Byod.js` (mobile change) | Blocks Submit |
| `AxNo`, `AxToken` | session | Reference number / encrypt token |

---

## 7. Known problems (business impact)

| # | Problem | Impact |
|---|---|---|
| 1 | `byodFail` modal missing (`app.js:2742`) | Expired / invalid link throws an error instead of a message |
| 2 | `templateUrl: 'app/Byod/index.html'` vs folder `app/BYOD/` | Breaks on case-sensitive servers |
| 3 | E-mail / mobile double-encrypted in `DIYClientOtherInfo` but plain in `DIYClientPersonalInfoProfile` | Inconsistent handling |
| 4 | Product registration sends placeholder strings (`"sample string 27"` …, `OpeningFee: 34.1`, `:6833-6843`) and hard-coded `SLB: "Y"` (`:6832`) | Junk / forced values go to the server |
| 5 | Segment flags for Commodity set both MCX and NCDX from one checkbox (`:6786-6789`) | Cannot select separately |
| 6 | Large dead sections (PAN, Bank, Documents, Address) | Maintenance risk |
