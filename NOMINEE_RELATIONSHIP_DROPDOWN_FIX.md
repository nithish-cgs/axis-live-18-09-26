# Fix: Nominee / Guardian "Relationship" dropdown was empty

**File:** `app/personalDetails/controller/personalDetails.js`
**Template:** `app/personalDetails/index.html`
**Stage:** Personal Details B → Nomination details → Guardian Details
**Status:** Fixed and committed

---

## Symptom

In Personal Details B, when a nominee's date of birth made them a **minor**, the
**Guardian Details** block appeared but its **"Relationship with Minor"** dropdown
showed only the placeholder `Select` — no options at all. The user could not
complete the form.

![symptom] Guardian Details → `Relationship with Minor: *` → dropdown opens → only "Select"

---

## How the dropdown gets its options

```html
<!-- app/personalDetails/index.html -->
<select class="form-control select" ng-model="field.value" ...>
    <option value="">Select</option>
    <option ng-repeat="eb in field.arrayVal" value="{{eb[field.valueKey]}}">
        {{eb[field.labelKey]}}
    </option>
</select>
```

The options come from **`field.arrayVal`** — a per-field reference stored on the
field object. It does **not** read `$rootScope.formData.nomineeRelationList`
directly. That distinction is the whole bug.

Data flow:

```
API  DIYGetNomineeRelationship
  ↓
$rootScope.formData.nomineeRelationList   (master list)
  ↓  (reference copied into each field when the field is built)
field.arrayVal
  ↓
ng-repeat="eb in field.arrayVal"          → the visible <option> list
```

---

## Root cause 1 — the array was replaced, not emptied

`getNomineerelation()` created a **new array** in its response callback instead of
clearing the existing one. Every field that had already copied the old reference
was left pointing at an array that stays empty forever.

### Before

```js
$rootScope.formData.nomineeRelationList = [];        // ← array A created here

$scope.getNomineerelation = function () {
    var s_url = "DIYGetNomineeRelationship";
    serverService.getApi(s_url).then(function (a) {
        var response = a.data;
        $rootScope.formData.nomineeRelationList = []; // ← ⚠ array B (a DIFFERENT object)

        if (response.IpvPOAandNomineeList) {
            for (var i = 0; i < response.IpvPOAandNomineeList.length; i++) {
                $rootScope.formData.nomineeRelationList.push(...);  // fills B
            }
        }
    });
};
```

`nomineeRelationList` now points at **B** (populated), but every `field.arrayVal`
captured earlier still points at **A** (empty). Both statements are "correct";
they simply operate on two different arrays.

```js
var list = [];        // box A
var copy = list;      // copy → A
list = [];            // list → box B, copy STILL → A
list.push('Father');  // goes into B
console.log(list);    // ['Father']   ← B
console.log(copy);    // []           ← A, still empty
```

### After — `app/personalDetails/controller/personalDetails.js:2267`

```js
$rootScope.formData.nomineeRelationList.length = 0;   //nithish
```

`length = 0` empties the array **in place**. There is now only ever one array
object, so every `arrayVal` reference stays live and fills as soon as the API
responds. Clear-before-refill behaviour is preserved exactly.

---

## Root cause 2 — field-name mismatch after a rename

The guardian field was renamed to **`'Relationship with Minor'`**, but
`addGuardian()` still matched the old name `'Relationship'`. The ternary fell
through to `''`, so `arrayVal` became an **empty string** and `ng-repeat`
produced zero options.

### Before

```js
// guardianTemplate
{ field: 'Relationship with Minor', value: '', required: true, type: 'dropdown',
  arrayVal: $rootScope.formData.nomineeRelationList, ... },

// addGuardian() — overwrites arrayVal when the row is created
arrayVal: data.field === 'Guardian Id Proof'
            ? $rootScope.formData.newNomineeTypeList
        : data.field === 'Relationship'          // ← ⚠ never matches
            ? $rootScope.formData.nomineeRelationList
        : '',                                     // ← arrayVal = "" → no options
```

`'Relationship with Minor' !== 'Relationship'`. The template already had the
correct list; `addGuardian`'s spread was **overwriting it with `''`**.

### After — `app/personalDetails/controller/personalDetails.js:4196`

```js
arrayVal: data.field === 'Guardian Id Proof'
            ? $rootScope.formData.newNomineeTypeList
        : (data.field === 'Relationship with Minor' || data.field === 'Relationship')
            ? $rootScope.formData.nomineeRelationList
        : '',
```

Both names are accepted, so the fix is safe whichever name a build uses.

---

## Root cause 3 — the selected value was never saved

The same rename broke the save mapping, so a chosen relationship was never sent
as `GuardianRelationship`. A populated dropdown alone would not have been enough.

### After — `app/personalDetails/controller/personalDetails.js:3329`

```js
if (guardian.field === "Relationship with Minor") {
    obj.GuardianRelationship = guardian.value;
}
```

---

## Summary of changes

| # | File | Line | Change |
|---|---|---|---|
| 1 | `app/personalDetails/controller/personalDetails.js` | **2267** | `nomineeRelationList = []` → `nomineeRelationList.length = 0` (clear in place) |
| 2 | `app/personalDetails/controller/personalDetails.js` | **4196** | `addGuardian` arrayVal now matches `'Relationship with Minor'` as well as `'Relationship'` |
| 3 | `app/personalDetails/controller/personalDetails.js` | **3329-3330** | Save mapping matches `"Relationship with Minor"` so `GuardianRelationship` is sent |

No other behaviour was changed.

---

## Complete line-number reference

Verified against the current working copy.

### `app/personalDetails/controller/personalDetails.js`

| Line | Code | Role |
|---|---|---|
| 1309 | `arrayVal: $rootScope.formData.nomineeRelationList, labelKey: 'Nominee',` | **nominee** Relationship, API-restore path (`getNomineeDetails`) |
| 1370 | `field: "Relationship with Minor", value: nominee.GuardianRelationship ? ... : '',` | **guardian** Relationship field, API-restore path |
| 1371 | `arrayVal: $rootScope.formData.nomineeRelationList, labelKey: 'Nominee',` | its option list |
| **2262** | `$rootScope.formData.nomineeRelationList = [];` | master list created (controller init) — the **only** place it may be assigned |
| 2263 | `$scope.getNomineerelation = function () {` | fetches `DIYGetNomineeRelationship` |
| **2267** | `$rootScope.formData.nomineeRelationList.length = 0;   //nithish` | ✅ **FIX 1** — clear in place, was `= []` |
| 2271 | `...nomineeRelationList.push(response.IpvPOAandNomineeList[i]);` | fills the master list |
| 2277 | `$scope.getNomineerelation();` | called once, at controller init |
| **3329** | `if (guardian.field === "Relationship with Minor") {` | ✅ **FIX 3** — save mapping, was `"Relationship"` |
| **3330** | `obj.GuardianRelationship = guardian.value;` | the value actually sent to the API |
| 3986 | `let nomineeTemplate = [` | nominee field template |
| 3992 | `field: 'Relationship', ...` | nominee Relationship — name unchanged |
| 3993 | `arrayVal: $rootScope.formData.nomineeRelationList, ...` | its option list |
| 4009 | `let guardianTemplate = [` | guardian field template |
| 4015 | `field: 'Relationship with Minor', ...` | the renamed field that caused the mismatch |
| 4016 | `arrayVal: $rootScope.formData.nomineeRelationList, ...` | correct here — but overwritten at 4196 |
| 4065 | `arrayVal: data.field === 'Id Proof' ? ... : data.field === 'Relationship' ? ... : ''` | `addNominee` — nominee path, was never broken |
| 4189 | `$scope.addGuardian = function (index) {` | builds the guardian row when DOB < 18 |
| **4196** | `arrayVal: ... (data.field === 'Relationship with Minor' \|\| data.field === 'Relationship') ? ... : ''` | ✅ **FIX 2** — was `data.field === 'Relationship'` only |

### `app/personalDetails/index.html`

| Line | Code | Role |
|---|---|---|
| 1409 | `<div ng-if="guardianNewFields.length > 0">` | Guardian Details block |
| 1411 | `ng-repeat="(j, guardian) in guardianNewFields track by $index"` | one block per nominee index |
| 1457 | `<div class="ax-field" ng-if="field.type == 'dropdown'">` | the guardian dropdown wrapper |
| **1462** | `<option ng-repeat="eb in field.arrayVal"` | **the line that renders the options** — reads `arrayVal`, not the master list |
| 1254 / 1258 | dropdown wrapper / `ng-repeat` | static nominee section |
| 1343 / 1348 | dropdown wrapper / `ng-repeat` | dynamic nominee rows |
| 1560 / 1566 | dropdown wrapper / `ng-repeat` | guardian address section |

**The critical pair is 4196 → 1462.** Line 4196 decides what `arrayVal` holds;
line 1462 iterates it. When 4196 fell through to `''`, line 1462 iterated an empty
string and produced zero `<option>` elements.

### `app/app.js` (compiled into the loaded `app/app.min.js`)

| Line | Code | Role |
|---|---|---|
| 205 | `$rootScope.formData.nomineeRelationList = [];` | array created at app boot |
| 4847 | `$rootScope.formData.nomineeRelationList.push(...)` | `DropdownLoad()` fills it — discarded when `personalDetails.js:2262` reassigns on controller init |

---

## Why `length = 0` is safe

Every other consumer only **reads** the array (iterates it in `ng-repeat`).
Nothing reassigns it, and nothing depends on receiving a *new* array object.

| File : Line | Use | Affected |
|---|---|---|
| `app.js:205` | creates the array at app boot | No |
| `app.js:4847` | `DropdownLoad()` pushes into it | No |
| `personalDetails.js:2262` | `= []` at controller init | No (unchanged) |
| `personalDetails.js:2271` | pushes into it | No |
| `personalDetails.js:1309` | `arrayVal` — nominee Relationship, API path | Read-only — **fixed** |
| `personalDetails.js:1371` | `arrayVal` — guardian Relationship, API path | Read-only — **fixed** |
| `personalDetails.js:3993` | `arrayVal` default in `nomineeTemplate` | Read-only — **fixed** |
| `personalDetails.js:4016` | `arrayVal` default in `guardianTemplate` | Read-only — **fixed** |
| `personalDetails.js:4065` | `arrayVal` in `addNominee` | Read-only |
| `personalDetails.js:4196` | `arrayVal` in `addGuardian` | Read-only |

`getNomineerelation()` is called exactly once, immediately after the array is
created empty — so `length = 0` is a no-op on the data. The only thing that
changes is that the array's identity survives.

---

## Verification

1. Hard-reload (**Ctrl+Shift+R**) — `personalDetails.js` is cache-busted with
   `?ver=1.6` in `index.html`, but the template is not.
2. Personal Details B → **Nomination details** → select **Yes**.
3. Add a nominee with a **date of birth under 18**. The Guardian Details block
   appears.
4. **"Relationship with Minor"** must list the relationship options.
5. Console identity check — both must be true:

```js
var s   = angular.element(document.querySelector('[ng-controller]')).scope();
var g   = s.$root.guardianNewFields.find(x => x && x.length);
var rel = g.find(f => f.field === 'Relationship with Minor');

rel.arrayVal === s.$root.formData.nomineeRelationList;   // true  → same array
rel.arrayVal.length;                                     // > 0   → options present
```

6. Regression: the nominee's own **Relationship** dropdown still populates, and a
   resumed application with an existing minor nominee shows the saved
   relationship pre-selected.
7. Select a relationship and submit — confirm `GuardianRelationship` is present in
   the payload.

---

## Related note

`app/personalDetails_30dec25/`, `app/personalDetails 25-08-2026/`,
`personalDetails/personalDetails/`, `digilocker-without-appsec/` and
`Mada_21May26/` all contain older copies of this controller with the original
bug. **None of them is loaded at runtime** — `index.html:2617` loads
`app/personalDetails/controller/personalDetails.js` and `app/app.js:4479` routes
to `app/personalDetails/index.html`. They were deliberately left untouched.
