# Third-Party API Recommendations

This document lists what each third-party API endpoint should **add** or **remove** in its response to simplify BE proxy mapping. The goal is to minimize transformation logic in the BE layer.

---

## 1. GET `get-profile/{msisdn}`

### Add

| Field Name | Type | Example | Reason |
|---|---|---|---|
| `nik` | `string` | `"3402150000000002"` | FE needs NIK directly in profile. Currently only available via get-customer-status, requiring a second API call. |
| `fullName` | `string` | `"Affan Pratama"` | Flat full name string. Current `fullName` is a nested object `{givenName, familyName}` — the BE has to concatenate them. |
| `formattedBirthDate` | `string` | `"1999-07-20"` | ISO date format. Current `birthDate` returns `"2018-02-27 17:30:00.000"` which needs parsing. |
| `subscriberStatusMapped` | `string` | `"Aktif"` | Human-readable status. Current `subscriberStatus` returns placeholder strings like `"subStatus_5cac301bf0bb"` which are unusable. |
| `isBirthdayToday` | `boolean` | `true` | Computed flag. The FE needs this but has no way to derive it from raw `birthDate` without timezone logic. |
| `fullAddress` | `string` | `"Jl. Raya Pondok Cabe 3-7, Tangerang Selatan, ID"` | Pre-concatenated address string. Current address is nested across 7+ fields (`streetName`, `streetNumber`, `buildingName`, `city`, `stateOrProvince`, `country`, `postCode`) that need to be joined. |
| `occupation` | `string` | `"Wiraswasta"` | Corrected field name. Current field is misspelled as `pakerjaan` in `additionalInformation`. |
| `income` | `string` | `"Up to Rp2.000.000"` | Pass through value. Currently empty string `""` in some cases — ensure it's populated. |
| `activeSince` | `string` | `"2021-01-03"` | Formatted registration date. Current `initialRegistrationDate` returns `"Error!"` in test data. |
| `deviceInfo` | `string` | `"iPhone 15 A3090"` | Device model string. Currently buried in `hlr-details.subscriberDataInfo.deviceType` — requires a separate API call. |
| `mobileBalanceNumeric` | `number` | `250000` | Numeric balance. Current `mainBalance.mobileBalance` returns a string that may contain `"Error!"`. |
| `dealerBalanceNumeric` | `number` | `300000` | Numeric balance. Same issue as `mobileBalance`. |

### Remove

| Field Name | Reason |
|---|---|
| `fullName.givenName` / `fullName.familyName` / `fullName.title` | Replaced by flat `fullName` above. Nested structure is unnecessary overhead. |
| `subscriberStatus` | Raw placeholder string (`"subStatus_5cac301bf0bb"`). Unusable. Replaced by `subscriberStatusMapped`. |
| `subscriberNo` | Placeholder string (`"subscrNumber_4c09836e87a3"`). Not meaningful data. |
| `subStatusDate` | Placeholder string (`"subStatusDate_49487c26e7ec"`). Not meaningful data. |
| `displayCustomerType` / `displayCustomerSubType` | Both return `"Anonymous"` in test data. Redundant — use `customerType` / `customerSubType` directly. |
| `currentOu` | Always `null` in test data. Not needed by FE. |
| `showOfferMapping` | Always `false`. FE does not use this field. |
| `primaryProductId` | Always `null`. FE does not use this field. |
| `productOwner` | Returns `"Error!"`. Not needed by FE. |
| `mobilePlanProductId` | Always `null`. FE does not use this field. |
| `spType` | Always `null`. FE does not use this field. |
| `terminationReason` | Always `null`. FE does not use this field. |
| `billingAccountId` | Always `null`. FE does not use this field. |
| `currentOu` | Always `null`. FE does not use this field. |
| `blackjackBalance` | Always empty array `[]`. FE does not use this field. |
| `role` / `relatedPartyRefList` | Internal routing data. FE only needs `contactRole` from `additionalInformation`. |
| `additionalInformation.prefContactMode` / `prefContactTime` / `jobTitle` | Not used by FE. |
| `additionalInformation.specialStatus` | Returns `"Please Specify"` which is meaningless. Map to `null` if kept, or remove. |
| `identification.*` (all sub-fields) | All fields are `null` in test data. FE does not display identification details. |
| `opGetPaymentMethodDetails.paymentGatewayName` / `paymentGatewayToken` / `paymentGatewayType` | Internal payment gateway data. FE only needs `paymentMethod`, `ccNumber`, `ccExpDate`. |

---

## 2. GET `get-customer-status/{msisdn}`

### Add

| Field Name | Type | Example | Reason |
|---|---|---|---|
| `nikUnmasked` | `string` | `"3402150000000002"` | Full NIK without masking. Current `nik` returns `"340215******0002"` — the FE needs the full value for phone number lookup by NIK. |
| `kkUnmasked` | `string` | `"3201000000000000"` | Full KK without masking. Same reason as above. |

### Remove

| Field Name | Reason |
|---|---|
| `dukcapilStatus` | Internal verification status. FE does not display this field. |

> **Note:** If `nikUnmasked` cannot be provided for security reasons, the BE needs a separate internal lookup service. This is a critical dependency — the FE uses NIK to fetch the phone number list, which gates the entire customer profile flow.

---

## 3. GET `package-details/{msisdn}`

### Add

| Field Name | Type | Example | Reason |
|---|---|---|---|
| `totalRemainingDataBytes` | `number` | `21271624704` | Sum of `remainingQuota` where `type = "DATA"` across all allowances. FE needs this for "Sisa Kuota" metric. |
| `totalDataQuotaBytes` | `number` | `26843545600` | Sum of `totalQuota` where `type = "DATA"`. FE needs this for "Data Usage" metric (total - remaining). |
| `totalRemainingVoiceSeconds` | `number` | `90000` | Sum of `remainingQuota` where `type = "VOICE"`. FE needs this for "Voice Usage" metric. |
| `totalVoiceQuotaSeconds` | `number` | `90000` | Sum of `totalQuota` where `type = "VOICE"`. FE needs this for voice usage calculation. |
| `totalRemainingSms` | `number` | `0` | Sum of `remainingQuota` where `type = "SMS"`. FE needs this for "SMS Usage" metric. |
| `totalSmsQuota` | `number` | `0` | Sum of `totalQuota` where `type = "SMS"`. FE needs this for SMS usage calculation. |
| `planName` | `string` | `"FlexMax 15GB, 28hr"` | Primary package name. FE displays this as the active plan name. Currently only available deep in `allowances[1].packageName`. |
| `planExpirationDate` | `string` | `"2026-10-07"` | Primary package expiration. FE needs this for plan validity display. |

### Remove

| Field Name | Reason |
|---|---|
| `allowances[].soccd` | Internal SOC code. FE does not display this. |
| `allowances[].serviceId` | Internal service ID. FE does not display this. |
| `allowances[].allowanceType` value `"PRICE_PLAN"` entries | These are base plan allocations (always-on, no expiry). The FE only needs the active user-visible packages (`PACKAGE` type). Including both duplicates the quota display. |

> **Recommendation:** Either filter out `PRICE_PLAN` type entries in the third-party response, or let the BE handle deduplication. The `PRICE_PLAN` entries contain base quotas that overlap with `PACKAGE` entries.

---

## 4. GET `hlr-details/{msisdn}`

### Add

| Field Name | Type | Example | Reason |
|---|---|---|---|
| `networkCondition` | `string` | `"Excellent"` | Normalized network quality. Current `ranAccess` returns `"4G LTE"` which is a technology type, not a quality indicator. FE needs a qualitative assessment. |
| `networkConditionTone` | `string` | `"good"` | Quality tone for UI styling: `"good"` / `"warn"` / `"bad"`. FE uses this to color-code the metric badge. |

### Remove

| Field Name | Reason |
|---|---|
| `dataMobilityInfo2G3G.*` (entire sub-object) | All fields return `"Error!"`. Not needed by FE. |
| `dataService2G3G.*` (entire sub-object) | Legacy 2G/3G service data. FE does not display this. |
| `faxDataService.*` (entire sub-object) | All fields are `null`. Fax service is irrelevant to FE. |
| `lteDataMobilityInfo4G.*` (entire sub-object) | All fields return `"Error!"`. Not needed by FE. |
| `roamingServices.*` (entire sub-object) | All fields are `null`. FE does not display roaming info in profile. |
| `supplementaryServices.*` (entire sub-object) | Call forwarding, call waiting, CLIP/CLIR — not displayed by FE. |
| `voiceAndSmsMobilityInfo.*` (entire sub-object) | Internal mobility tracking. FE does not display this. |
| `voiceAndSmsService.*` (entire sub-object) | All fields are `null`. Not needed by FE. |

> **Summary:** Only `locationInfo` and `subscriberDataInfo` are used by FE. The other 6 sub-objects can be removed entirely.

---

## 5. GET `device-specs/{msisdn}`

### Add

| Field Name | Type | Example | Reason |
|---|---|---|---|
| `manufacturer` | `string` | `"Apple"` | Clean brand name. Same as `TCR_NAME` but with a clearer field name. |
| `modelName` | `string` | `"iPhone 15 A3090"` | Clean model name. Same as `TCR_MODEL` but with a clearer field name. |
| `osInfo` | `string` | `"iOS 17.0"` | Combined OS name + version. FE displays this as a single string. Current fields `OS_NAME` and `OS_VERSION` are separate. |

### Remove

| Field Name | Reason |
|---|---|
| `BEARER_EDGE` / `BEARER_GSM_CSD` / `BEARER_GSM_GPRS` / `BEARER_GSM_SMS` / `BEARER_HSDPA` / `BEARER_HSUPA` / `BEARER_LTE` / `BEARER_UMTS` / `BEARER_WLAN` | Individual bearer capability flags. FE does not display these. |
| `FDD_BAND_3` / `FDD_BAND_8` | Individual band support flags. FE does not display these. |
| `BROWSER_NAME` | Browser name. FE does not display this for device info. |
| `HARDWARE_TYPE` | Returns `"Slate"`. FE does not display this. |
| `IMSI` | Duplicate of `hlr-details.subscriberDataInfo.imsi`. FE does not display IMSI in device specs. |
| `TCR_NAME` / `TCR_MODEL` | Replaced by cleaner `manufacturer` / `modelName` above. |

---

## Summary — Changes Per Endpoint

| Endpoint | Fields to Add | Fields to Remove |
|---|---|---|
| `get-profile` | 12 fields | 18 fields |
| `get-customer-status` | 2 fields | 1 field |
| `package-details` | 8 fields | 3 fields |
| `hlr-details` | 2 fields | 6 sub-objects (~20 fields) |
| `device-specs` | 3 fields | 9 fields |
| **Total** | **27 fields** | **~51 fields** |

### Critical Additions (Blockers for FE Integration)

1. **`get-profile.nik`** — Required for phone number lookup by NIK
2. **`get-customer-status.nikUnmasked`** — Required for phone number lookup by NIK
3. **`get-profile.fullName`** (flat string) — Required for customer name display
4. **`get-profile.subscriberStatusMapped`** — Required for service status display
5. **`get-profile.mobileBalanceNumeric`** — Required for balance display
6. **`package-details.totalRemainingDataBytes`** / **`totalDataQuotaBytes`** — Required for usage metrics
7. **`hlr-details.networkCondition`** / **`networkConditionTone`** — Required for connectivity metrics
