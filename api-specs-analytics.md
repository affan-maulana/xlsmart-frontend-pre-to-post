# API Specs Analytics — Customer 360 Frontend

## Overview

This document analyzes the gap between what the **Frontend (FE)** expects (from mock data) and what the **API specs** currently provide. It includes field-level mapping from third-party responses to recommended BE response contracts, and identifies missing APIs.

---

## 1. Available Third-Party API Endpoints

| # | Endpoint | Third-Party Source | Purpose |
|---|---|---|---|
| 1 | `GET /api/v1/third-party/vqm/get-profile/{msisdn}` | VQM | Customer profile, address, payment, plan info |
| 2 | `GET /api/v1/third-party/vqm/get-customer-status/{msisdn}` | VQM | NIK, KK, activation date, dukcapil status |
| 3 | `GET /api/v1/third-party/vqm/package-details/{msisdn}` | VQM | Package allowances (data/voice/SMS quota) |
| 4 | `GET /api/v1/third-party/vqm/hlr-details/{msisdn}` | VQM | Device info, location, network, supplementary services |
| 5 | `GET /api/v1/third-party/nbss/device-specs/{msisdn}` | NBSS | Device hardware specs (IMEI, model, OS, bands) |

## 2. FE Data Requirements vs API Coverage

| FE Data Type | Used By | API Coverage | Status |
|---|---|---|---|
| `CustomerProfile` | Home, Prepaid, Postpaid, Reload pages | Partial — get-profile + get-customer-status | ⚠️ Gaps |
| `ForeignCustomerProfile` | WNA Prepaid, WNA Postpaid pages | Partial — get-profile (passport data missing) | ⚠️ Gaps |
| `SubscriptionSummary` | Home, Prepaid, Postpaid pages | Partial — get-profile + package-details | ⚠️ Gaps |
| `PlanDetail` | Prepaid page | Partial — get-profile + hlr-details + nbss | ⚠️ Gaps |
| `PostpaidPlanDetail` | Postpaid page | Partial — get-profile + hlr-details + nbss | ⚠️ Gaps |
| `HomePlanDetail` | Home page | ❌ No API — home/IndiHome specific | ❌ Missing |
| `ConnectivityMetric[]` | All pages | Partial — hlr-details (locationInfo only) | ⚠️ Gaps |
| `UsageMetric[]` | All pages | Partial — package-details (quota only) | ⚠️ Gaps |
| `BillingAlert` | SubscriptionSummaryBar | ❌ No API — billing system | ❌ Missing |
| `PendingCase` | All profile pages | ❌ No API — case management system | ❌ Missing |
| `PhoneNumber[]` | All pages (number lookup) | ❌ No API — number registry by NIK | ❌ Missing |
| `PromoBanner[]` | All pages | ❌ No API — promo/campaign system | ❌ Missing |
| `AgentInfo` | Layout (header) | ❌ No API — auth/session system | ❌ Missing |
| `AgentQueueInfo` | All pages (queue bar) | ❌ No API — queue system | ❌ Missing |
| `DenomOption[]` | Reload page | ❌ No API — denomination catalog | ❌ Missing |
| `MandatoryInfoItem[]` | Reload, Pembayaran pages | ❌ No API — business rules | ❌ Missing |
| `ServicePlaybook` | Reload, Pembayaran pages | ❌ No API — playbook system | ❌ Missing |
| `PaymentMethodGroup[]` | Pembayaran page | ❌ No API — payment gateway config | ❌ Missing |
| `PaketOption[]` | Pembayaran page | ❌ No API — product catalog | ❌ Missing |
| `BillingLineItem[]` | Pembayaran page | ❌ No API — billing system | ❌ Missing |
| `VABankTab[]` | Waiting payment page | ❌ No API — payment instruction config | ❌ Missing |
| `CreditCardStatusStep[]` | Waiting payment page | ❌ No API — card verification system | ❌ Missing |
| `IsiPulsaPlanSummary` | Reload page | ✅ Can derive from get-profile | ✅ Covered |

---

## 3. Detailed Field Mapping Per API

### 3.1 GET `/api/v1/third-party/vqm/get-profile/{msisdn}`

#### BE Response Contract (Recommended)

```typescript
interface GetProfileResponse {
  success: boolean;
  message: string;
  data: {
    // Identity
    msisdn: string;                    // third-party: data.msisdn
    customerName: string;              // third-party: data.fullName.givenName + data.fullName.familyName
    nik: string;                       // from get-customer-status API
    kk: string;                        // from get-customer-status API
    gender: string;                    // third-party: data.gender
    birthDate: string;                 // third-party: data.birthDate (needs format: "YYYY-MM-DD")
    maritalStatus: string;             // third-party: data.additionalInformation.maritalStatus
    religion: string;                  // third-party: data.additionalInformation.religion
    motherMaidenName: string;          // third-party: data.additionalInformation.mothersMaidenName
    occupation: string;                // third-party: data.additionalInformation.pakerjaan (note: typo in third-party)
    income: string;                    // third-party: data.additionalInformation.income

    // Contact
    email: string | null;             // third-party: data.additionalInformation.email
    contactRole: string;              // third-party: data.additionalInformation.contactRole

    // Address — flattened from nested structure
    streetName: string | null;        // third-party: data.address.homeAddress.streetName
    streetNumber: string | null;      // third-party: data.address.homeAddress.streetNumber
    buildingName: string | null;      // third-party: data.address.homeAddress.buildingName
    city: string;                     // third-party: data.address.homeAddress.city
    stateOrProvince: string;          // third-party: data.address.homeAddress.stateOrProvince
    country: string;                  // third-party: data.address.homeAddress.country
    postCode: string | null;          // third-party: data.address.homeAddress.postCode
    fullAddress: string;              // BE concatenation of above fields for display

    // Account
    accountId: string;                // third-party: data.additionalInformation.accountId
    customerId: string;               // third-party: data.customerId
    individualId: string;             // third-party: data.individualId
    billCycle: string;                // third-party: data.billCycle

    // Plan
    planName: string | null;          // third-party: data.pricePlan.name
    planStatus: string | null;        // third-party: data.pricePlan.status
    subscriberStatus: string | null;  // third-party: data.subscriberStatus (raw, needs mapping)

    // Balance
    mobileBalance: string;            // third-party: data.mainBalance.mobileBalance (may be "Error!")
    dealerBalance: string;            // third-party: data.mainBalance.dealerBalance (may be "Error!")

    // Payment
    paymentMethod: string;            // third-party: data.opGetPaymentMethodDetails.paymentMethod
    paymentType: string;              // third-party: data.paymentType
    creditCardNumber: string | null;  // third-party: data.opGetPaymentMethodDetails.ccNumber
    creditCardExpiry: string | null;  // third-party: data.opGetPaymentMethodDetails.ccExpDate

    // Dates
    firstEventDate: string | null;    // third-party: data.firstEventDate
    initialRegistrationDate: string;  // third-party: data.initialRegistrationDate

    // Metadata
    customerType: string;             // third-party: data.displayCustomerType
    customerSubType: string;          // third-party: data.displayCustomerSubType
    specialStatus: string;            // third-party: data.additionalInformation.specialStatus
  };
}
```

#### Third-Party → BE Field Mapping

| BE Field | Third-Party Source | Transformation Required |
|---|---|---|
| `msisdn` | `data.msisdn` | Pass through |
| `customerName` | `data.fullName.givenName` + `data.fullName.familyName` | Concatenate with space; handle null familyName |
| `nik` | *From get-customer-status* | Cross-reference by msisdn |
| `gender` | `data.gender` | Map "Please Specify" → `null` |
| `birthDate` | `data.birthDate` | Format from `"2018-02-27 17:30:00.000"` → `"YYYY-MM-DD"` |
| `maritalStatus` | `data.additionalInformation.maritalStatus` | Pass through (already readable: "Married", "Widowed", etc.) |
| `religion` | `data.additionalInformation.religion` | Pass through |
| `motherMaidenName` | `data.additionalInformation.mothersMaidenName` | Pass through |
| `occupation` | `data.additionalInformation.pakerjaan` | Pass through (third-party uses Indonesian: "pakerjaan") |
| `income` | `data.additionalInformation.income` | Pass through |
| `email` | `data.additionalInformation.email` | Pass through; null = no email |
| `contactRole` | `data.additionalInformation.contactRole` | Pass through |
| `fullAddress` | `data.address.homeAddress.*` | Concatenate: streetNumber + streetName + buildingName + city + stateOrProvince + country + postCode |
| `planName` | `data.pricePlan.name` | Pass through; "Error!" → `null` |
| `planStatus` | `data.pricePlan.status` | Pass through; "Error!" → `null` |
| `subscriberStatus` | `data.subscriberStatus` | Map raw string to human-readable status (see Status Mapping below) |
| `mobileBalance` | `data.mainBalance.mobileBalance` | Parse to number; "Error!" → `0` |
| `dealerBalance` | `data.mainBalance.dealerBalance` | Parse to number; "Error!" → `0` |
| `paymentMethod` | `data.opGetPaymentMethodDetails.paymentMethod` | "Error!" → `null` |
| `creditCardNumber` | `data.opGetPaymentMethodDetails.ccNumber` | "Error!" → `null` |
| `creditCardExpiry` | `data.opGetPaymentMethodDetails.ccExpDate` | "Error!" → `null` |
| `firstEventDate` | `data.firstEventDate` | Pass through; null = never activated |
| `specialStatus` | `data.additionalInformation.specialStatus` | "Please Specify" → `null` |

**Status Mapping (subscriberStatus → human-readable):**

| Third-Party Value | BE Mapped Value |
|---|---|
| (various raw strings) | `"Aktif"` / `"Nonaktif"` / `"Suspended"` |

> **Note:** The third-party `subscriberStatus` field returns raw/placeholder strings (e.g., `"subStatus_5cac301bf0bb"`). The BE must map these to meaningful statuses or use `pricePlan.status` as fallback.

---

### 3.2 GET `/api/v1/third-party/vqm/get-customer-status/{msisdn}`

#### BE Response Contract (Recommended)

```typescript
interface GetCustomerStatusResponse {
  success: boolean;
  message: string;
  data: {
    msisdn: string;                    // third-party: data.msisdn
    nik: string;                       // third-party: data.nik (masked, BE should unmask if possible)
    kk: string;                        // third-party: data.kk (masked)
    activationDate: string | null;     // third-party: data.activationDate
    dateOfRegistration: string;        // third-party: data.dateOfRegistration
    dukcapilStatus: string;            // third-party: data.dukcapilStatus
  };
}
```

#### Third-Party → BE Field Mapping

| BE Field | Third-Party Source | Transformation Required |
|---|---|---|
| `nik` | `data.nik` | Unmask if possible; otherwise pass masked `"340215******0002"` |
| `kk` | `data.kk` | Unmask if possible; otherwise pass masked |
| `activationDate` | `data.activationDate` | Format to `"YYYY-MM-DD"` |
| `dateOfRegistration` | `data.dateOfRegistration` | Format to `"YYYY-MM-DD"` |
| `dukcapilStatus` | `data.dukcapilStatus` | Pass through (REG, etc.) |

---

### 3.3 GET `/api/v1/third-party/vqm/package-details/{msisdn}`

#### BE Response Contract (Recommended)

```typescript
interface GetPackageDetailsResponse {
  success: boolean;
  message: string;
  data: {
    msisdn: string;                    // third-party: data.msisdn
    packages: PackageAllowance[];      // derived from data.allowances[]
  };
}

interface PackageAllowance {
  packageName: string | null;          // third-party: allowance.packageName
  allowanceType: string;               // third-party: allowance.allowanceType (PACKAGE / PRICE_PLAN)
  soccd: string | null;                // third-party: allowance.soccd
  effectiveDate: string | null;        // third-party: allowance.effectiveDate
  expirationDate: string | null;       // third-party: allowance.expDate
  registrationDate: string | null;     // third-party: allowance.regDate
  benefits: BenefitItem[];             // third-party: allowance.benefit[]
}

interface BenefitItem {
  benefitName: string;                 // third-party: benefit.benefitName
  type: string;                        // third-party: benefit.type (DATA / VOICE / SMS / ACCUMCHARGE)
  remainingQuota: number;             // third-party: benefit.remainingQuota (parse string to number)
  totalQuota: number;                  // third-party: benefit.totalQuota (parse string to number)
  expirationDate: string | null;      // third-party: benefit.expDate
}
```

#### Derived FE Metrics from This API

The FE needs these **computed metrics** from package-details:

| FE Metric | Computation | BE Field Name |
|---|---|---|
| **Data Usage** (UsageMetric) | Sum of `(totalQuota - remainingQuota)` where `type = "DATA"` | `dataUsageBytes` |
| **Remaining Data** (UsageMetric) | Sum of `remainingQuota` where `type = "DATA"` | `remainingDataBytes` |
| **Voice Usage** (UsageMetric) | Sum of `(totalQuota - remainingQuota)` where `type = "VOICE"` | `voiceUsageSeconds` |
| **Remaining Voice** (UsageMetric) | Sum of `remainingQuota` where `type = "VOICE"` | `remainingVoiceSeconds` |
| **SMS Usage** | Not available in this API | ❌ Missing — needs separate API or is not provided by third-party |

> **Important:** All quota values are in **bytes** (DATA) or **seconds** (VOICE). The BE should convert to human-readable format (e.g., "24.8 GB", "125 Menit").

---

### 3.4 GET `/api/v1/third-party/vqm/hlr-details/{msisdn}`

#### BE Response Contract (Recommended)

```typescript
interface GetHlrDetailsResponse {
  success: boolean;
  message: string;
  data: {
    msisdn: string;                    // third-party: data.subscriberDataInfo.msisdn
    deviceInfo: DeviceInfo;            // from subscriberDataInfo + nbss/device-specs
    location: LocationInfo;            // from locationInfo
    services: ServiceInfo;             // from various sub-objects
  };
}

interface DeviceInfo {
  deviceType: string | null;           // third-party: data.subscriberDataInfo.deviceType
  imei: string | null;                 // third-party: from nbss/device-specs.data.IMEI
  imsi: string | null;                 // third-party: data.subscriberDataInfo.imsi
  cardType: string | null;             // third-party: data.subscriberDataInfo.cardType
  prbt: string | null;                 // third-party: data.subscriberDataInfo.prbt
}

interface LocationInfo {
  cgi: string | null;                  // third-party: data.locationInfo.cgi
  country: string | null;              // third-party: data.locationInfo.country
  operator: string | null;             // third-party: data.locationInfo.operator
  ranAccess: string | null;            // third-party: data.locationInfo.ranAccess (e.g., "4G LTE")
}

interface ServiceInfo {
  lteService: string | null;           // third-party: data.lteDataServices4G.lteDataService
  telephonyService: string | null;     // third-party: data.voiceAndSmsService.telephonyService
  callWaiting: string | null;          // third-party: data.supplementaryServices.callWaiting
  clip: string | null;                 // third-party: data.supplementaryServices.clip
  internationalRoaming: string | null; // third-party: data.roamingServices.internationalRoaming
}
```

#### Derived FE Metrics from This API

| FE Metric | Source | BE Field Name |
|---|---|---|
| **Network Condition** (ConnectivityMetric) | `locationInfo.ranAccess` → map to tone | `networkCondition` |
| **RAN Access Type** | `locationInfo.ranAccess` | `ranAccessType` |

> **Note:** The HLR details API does **not** provide real-time performance metrics (download speed, latency, call drop rate). These require a separate **network quality/performance API** that is not currently documented. The FE currently shows hardcoded mock values for these metrics.

---

### 3.5 GET `/api/v1/third-party/nbss/device-specs/{msisdn}`

#### BE Response Contract (Recommended)

```typescript
interface GetDeviceSpecsResponse {
  success: boolean;
  message: string;
  data: {
    msisdn: string;                    // third-party: data.data._msisdn
    manufacturer: string | null;       // third-party: data.data.TCR_NAME
    model: string | null;              // third-party: data.data.TCR_MODEL
    osName: string | null;             // third-party: data.data.OS_NAME
    osVersion: string | null;          // third-party: data.data.OS_VERSION
    imei: string | null;               // third-party: data.data.IMEI
    imsi: string | null;               // third-party: data.data.IMSI
    hardwareType: string | null;       // third-party: data.data.HARDWARE_TYPE
    browserName: string | null;        // third-party: data.data.BROWSER_NAME
    supportedBands: string[];          // derived from BEARER_* and FDD_BAND_* fields
  };
}
```

---

## 4. Missing APIs — Required by FE

The following FE data types have **no corresponding API endpoint** in the current specs:

### 4.1 Agent & Queue System

| FE Type | Purpose | Recommended Endpoint |
|---|---|---|
| `AgentInfo` | Logged-in agent data (name, avatar, location, CRR code) | `GET /api/v1/agent/profile` or from auth/session |
| `AgentQueueInfo` | Current queue item (queue number, customer name, handling time) | `GET /api/v1/agent/queue/current` or WebSocket |

### 4.2 Phone Number Registry

| FE Type | Purpose | Recommended Endpoint |
|---|---|---|
| `PhoneNumber[]` | List all phone numbers registered under a NIK | `GET /api/v1/customer/phone-numbers/{nik}` |

**Expected BE Response:**
```typescript
interface GetPhoneNumbersResponse {
  success: boolean;
  message: string;
  data: {
    numbers: {
      id: string;                      // BE-generated UUID
      msisdn: string;                  // third-party: msisdn
      provider: string;                // derive from msisdn prefix or third-party data
      status?: string;                 // "active" | "suspend" | "nonaktif"
      outstanding?: boolean;           // from billing system
    }[];
    totalCount: number;
  };
}
```

### 4.3 Billing & Alerts

| FE Type | Purpose | Recommended Endpoint |
|---|---|---|
| `BillingAlert` | Overdue bill alerts (message, due date, action) | `GET /api/v1/customer/billing/alerts/{msisdn}` |
| `BillingLineItem[]` | Individual billing line items for payment | `GET /api/v1/customer/billing/line-items/{msisdn}` |
| Postpaid billing fields (`billingOpen`, `outstanding`, `dueDate`, `creditLimit`, `creditClass`, `billingCycle`, `unbill`, `ppsBalance`, `deposit`, `estimatedBilling`, `creditLimitType`, `billingDelivery`, `dealerBalance`, `lastPayment`, `faId`) | Postpaid plan detail billing info | `GET /api/v1/customer/billing/detail/{msisdn}` |

**Expected BE Response for Billing Detail:**
```typescript
interface GetBillingDetailResponse {
  success: boolean;
  message: string;
  data: {
    msisdn: string;
    billingOpen: number;               // outstanding unpaid amount
    outstanding: number;               // total outstanding
    dueDate: string;                   // next due date "DD/MM/YY"
    estimatedBilling: number;          // estimated current bill
    creditLimit: number;               // credit limit amount
    creditClass: string;               // e.g., "CX 1"
    creditLimitType: string;           // e.g., "FLT" (flat) or "REV" (revolving)
    billingCycle: string;              // e.g., "Cycle 31"
    billingDelivery: string;           // "Email" / "SMS" / etc.
    unbill: number;                    // unbilled amount
    ppsBalance: number;                // PPS balance
    deposit: number;                   // deposit amount
    dealerBalance: number;             // dealer balance
    lastPayment: string;               // last payment date
    faId: string;                      // FA ID
    paymentMethod: string;             // current payment method
    creditCardNumber: string | null;   // masked
    creditCardExpiry: string | null;   // expiry date
  };
}
```

### 4.4 Subscription Summary

The FE needs a computed `SubscriptionSummary`. This is **not a single API call** — it requires aggregation:

| FE Field | Source | Computation |
|---|---|---|
| `productSubscriptionTotal` | Phone numbers API + Home plans API | Count of all subscriptions |
| `mobileTotal` | Phone numbers API | Count of mobile numbers |
| `mobileBreakdown.active` | get-customer-status + get-profile | Count where status = "active" |
| `mobileBreakdown.inactive` | get-customer-status + get-profile | Count where status != "active" |
| `homeTotal` | Home/IndiHome API | Count of home subscriptions |
| `homeBreakdown.active` | Home/IndiHome API | Count where status = "active" |
| `homeBreakdown.inactive` | Home/IndiHome API | Count where status != "active" |
| `billingPostpaid` | Billing API | Count of postpaid subscriptions with outstanding > 0 |
| `billingHome` | Billing API | Count of home subscriptions with outstanding > 0 |

> **Recommendation:** The BE should provide a single aggregated endpoint:  
> `GET /api/v1/customer/subscription-summary/{nik}`

### 4.5 Home/IndiHome Plan Detail

| FE Type | Purpose | Recommended Endpoint |
|---|---|---|
| `HomePlanDetail` | Home broadband plan details (user ID, install address, device, etc.) | `GET /api/v1/customer/home-plan/{msisdn}` or `GET /api/v1/customer/home-plan/{userId}` |

### 4.6 Connectivity & Performance Metrics

| FE Type | Purpose | Recommended Endpoint |
|---|---|---|
| Download speed, Latency, Call Drop, Network Condition | Real-time network quality metrics | `GET /api/v1/customer/network-quality/{msisdn}` |

> **Note:** The HLR details API provides `ranAccess` (e.g., "4G LTE") but not performance metrics. Real-time metrics (speed, latency, call drop) need a separate **network monitoring/probe system**.

### 4.7 Promo & Campaign

| FE Type | Purpose | Recommended Endpoint |
|---|---|---|
| `PromoBanner[]` | Promotional banners for the dashboard | `GET /api/v1/promo/banners` or `GET /api/v1/promo/banners/{msisdn}` (personalized) |

### 4.8 Reload (Isi Pulsa)

| FE Type | Purpose | Recommended Endpoint |
|---|---|---|
| `DenomOption[]` | Reload denomination options | `GET /api/v1/product/denominations` |
| `MandatoryInfoItem[]` | Mandatory info/rules for reload | `GET /api/v1/product/reload-rules` |
| `ServicePlaybook` | Service playbook for reload flow | `GET /api/v1/product/reload-playbook` |
| `IsiPulsaPlanSummary` | Current plan summary for reload page | Can derive from `get-profile` + `package-details` |

### 4.9 Payment System

| FE Type | Purpose | Recommended Endpoint |
|---|---|---|
| `PaymentMethodGroup[]` | Available payment methods (e-wallet, VA, QRIS, etc.) | `GET /api/v1/payment/methods` |
| `VABankTab[]` | VA payment instructions per bank | `GET /api/v1/payment/va-instructions/{bankName}` |
| `CreditCardStatusStep[]` | Credit card verification flow status | `GET /api/v1/payment/cc-status/{orderId}` |
| `OrderSummaryField[]` | Order summary for payment page | `GET /api/v1/payment/order/{orderId}` |
| `PaymentStatusVariant` | Payment status type | Derived from payment gateway callback |

### 4.10 Product Catalog

| FE Type | Purpose | Recommended Endpoint |
|---|---|---|
| `PaketOption[]` | Data package catalog (Flex Mini, FlexMax, etc.) | `GET /api/v1/product/packages` |

---

## 5. Third-Party Data Quality Issues

The following issues exist in the third-party responses that the BE must handle:

| Issue | Third-Party Field | Example Value | BE Action |
|---|---|---|---|
| **"Error!" sentinel values** | `mainBalance.mobileBalance`, `mainBalance.dealerBalance`, `pricePlan.*`, `opGetPaymentMethodDetails.*`, `locationInfo.*` | `"Error!"` | Map to `null` or `0` |
| **"Please Specify" sentinel** | `gender`, `customerType`, `customerSubType` | `"Please Specify"` | Map to `null` |
| **Typo in field name** | `additionalInformation.pakerjaan` | `"Please Specify"` | Map to `occupation` in BE response |
| **Masked PII** | `nik`, `kk` | `"340215******0002"` | Pass through or unmask with authorization |
| **Placeholder strings** | `subscriberStatus`, `subscriberNo`, `subStatusDate` | `"subStatus_5cac301bf0bb"` | Not usable; use `pricePlan.status` instead |
| **Null values for optional fields** | `email`, `firstEventDate`, `iccId` | `null` | Pass through as `null` |
| **Unformatted dates** | `birthDate` | `"2018-02-27 17:30:00.000"` | Parse to `"YYYY-MM-DD"` |
| **Byte values as strings** | `remainingQuota`, `totalQuota` | `"5165487104"` | Parse to number; convert to GB for display |

---

## 6. Summary — Recommended New BE Endpoints

Based on the analysis, the BE needs to expose these **additional endpoints** (beyond proxying the 5 existing third-party APIs):

| Priority | Endpoint | Purpose |
|---|---|---|
| **P0** | `GET /api/v1/customer/phone-numbers/{nik}` | Phone numbers by NIK (prerequisite for everything) |
| **P0** | `GET /api/v1/customer/subscription-summary/{nik}` | Aggregated subscription summary |
| **P0** | `GET /api/v1/customer/billing/detail/{msisdn}` | Postpaid billing details |
| **P0** | `GET /api/v1/customer/billing/alerts/{msisdn}` | Billing alerts |
| **P1** | `GET /api/v1/product/denominations` | Reload denomination catalog |
| **P1** | `GET /api/v1/product/packages` | Data package catalog |
| **P1** | `GET /api/v1/payment/methods` | Payment method configuration |
| **P1** | `GET /api/v1/promo/banners` | Promotional banners |
| **P2** | `GET /api/v1/customer/home-plan/{msisdn}` | Home/IndiHome plan details |
| **P2** | `GET /api/v1/customer/network-quality/{msisdn}` | Network performance metrics |
| **P2** | `GET /api/v1/agent/profile` | Agent profile (or from auth system) |
| **P2** | `GET /api/v1/agent/queue/current` | Agent queue info (or from WebSocket) |
| **P2** | `GET /api/v1/payment/va-instructions/{bankName}` | VA payment instructions |
| **P2** | `GET /api/v1/product/reload-playbook` | Service playbook for reload flow |
| **P2** | `GET /api/v1/product/reload-rules` | Mandatory info/rules |
| **P3** | `GET /api/v1/payment/order/{orderId}` | Order summary |
| **P3** | `GET /api/v1/payment/cc-status/{orderId}` | Credit card verification status |

---

## 7. Priority Order for Integration

1. **Phase 1 (Core Profile):** Proxy existing 5 third-party APIs with field mapping → FE gets `CustomerProfile`, `PlanDetail`, `ConnectivityMetric` (partial)
2. **Phase 2 (Phone & Billing):** Phone numbers API + Billing APIs → FE gets `PhoneNumber[]`, `SubscriptionSummary`, `PostpaidPlanDetail` (full), `BillingAlert`
3. **Phase 3 (Catalog & Payment):** Product catalog + Payment methods → FE gets `DenomOption[]`, `PaketOption[]`, `PaymentMethodGroup[]`
4. **Phase 4 (Polish):** Promos, playbooks, network quality, home plans → FE gets remaining data types
