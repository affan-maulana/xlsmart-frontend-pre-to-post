# Get profile

## Method

GET

## Path

api/v1/third-party/vqm/get-profile/{msisdn}

## Response:

```
{
    "success": true,
    "message": "success",
    "data": {
        "additionalInformation": {
            "accountId": "1772630765",
            "contactRole": "Billing",
            "email": null,
            "homePhone": "6283834188803",
            "income": "",
            "jobTitle": "",
            "maritalStatus": "Widowed",
            "mothersMaidenName": "",
            "pakerjaan": "Please Specify",
            "prefContactMode": "Phone",
            "prefContactTime": "Morning",
            "religion": "Hindu",
            "specialStatus": "Please Specify"
        },
        "address": {
            "homeAddress": {
                "buildingName": null,
                "city": "Anonymous",
                "companyName": "",
                "country": "ID",
                "postCode": null,
                "stateOrProvince": "Anonymous",
                "streetName": "1772630765",
                "streetNumber": null,
                "timeZone": "GMT+07:00"
            }
        },
        "billCycle": "31",
        "billingAccountId": null,
        "birthDate": "2018-02-27 17:30:00.000",
        "blackjackBalance": [],
        "currentOu": null,
        "customerId": "591703025",
        "customerName": "620418196",
        "customerRank": "0",
        "customerSubType": "L",
        "customerType": "L",
        "displayCustomerSubType": "Anonymous",
        "displayCustomerType": "Anonymous",
        "firstEventDate": null,
        "fullName": {
            "familyName": null,
            "givenName": "Affan",
            "title": "Please Specify"
        },
        "gender": "Please Specify",
        "iccId": null,
        "identification": {
            "id": null,
            "identificationId": null,
            "issuerType": null,
            "issuingAuthority": null,
            "issuingDate": null,
            "type": null,
            "validTill": null
        },
        "individualId": "10010437",
        "initialRegistrationDate": "Error!",
        "isCustomerCorporate": false,
        "mainBalance": {
            "dealerBalance": "Error!",
            "mobileBalance": "Error!"
        },
        "mobilePlanProductId": null,
        "msisdn": "1212",
        "opGetPaymentMethodDetails": {
            "ccExpDate": null,
            "ccNumber": "Error!",
            "ccType": "Error!",
            "paymentGatewayName": "Error!",
            "paymentGatewayToken": "Error!",
            "paymentGatewayType": "Error!",
            "paymentMethod": "Error!",
            "paymentType": "Error!"
        },
        "paymentType": "Error!",
        "pricePlan": {
            "id": "Error!",
            "mbbUser": false,
            "name": "Error!",
            "offerFamily": null,
            "productInventoryId": "Error!",
            "soccd": null,
            "status": "Error!",
            "terminatedDate": null
        },
        "primaryProductId": null,
        "productOwner": "Error!",
        "relatedPartyRefList": [
            {
                "id": "1258",
                "name": "MLTZGR HIR OVHGZIR",
                "referredType": null,
                "role": "Primary",
                "type": "Customer",
                "validFor": null
            }
        ],
        "role": "Primary",
        "showOfferMapping": false,
        "spType": null,
        "subStatusDate": "subStatusDate_49487c26e7ec",
        "subscriberNo": "subscrNumber_4c09836e87a3",
        "subscriberStatus": "subStatus_5cac301bf0bb",
        "subscriberType": "subscriberType_62bb67e8019c",
        "terminationReason": null
    }
}
```

# Get Customer Status

## Method

GET

## Path

/api/v1/third-party/vqm/get-customer-status/{msisdn}

## Response

```
{
    "success": true,
    "message": "success",
    "data": {
        "activationDate": "2024-08-13 03:40:13.0",
        "dateOfRegistration": "2026-06-17 00:00:00",
        "dukcapilStatus": "REG",
        "kk": "****************",
        "msisdn": "1212",
        "nik": "340215******0002"
    }
}
```

# Package Details

## Method

GET

## Path

/api/v1/third-party/vqm/package-details/{msisdn}

## Response

```
{
    "success": true,
    "message": "success",
    "data": {
        "allowances": [
            {
                "allowanceType": "PACKAGE",
                "benefit": [
                    {
                        "benefitName": "DATA*24jam di Semua Jaringan",
                        "eligibleLocalShow": null,
                        "expDate": "2026-09-19 23:59:59.000",
                        "itemId": "667248_MAIN",
                        "remainingQuota": "5165487104",
                        "totalQuota": "10737418240",
                        "type": "DATA"
                    }
                ],
                "effectiveDate": "2026-09-10 17:44:40.000",
                "expDate": "2026-09-19 23:59:00.000",
                "packageName": "Bonus Kuota Utama 10GB 10hr",
                "regDate": "2026-09-10 17:44:40.000",
                "serviceId": "8116906",
                "soccd": "667248"
            },
            {
                "allowanceType": "PACKAGE",
                "benefit": [
                    {
                        "benefitName": "DATA*Kuota Utama",
                        "eligibleLocalShow": null,
                        "expDate": "2026-10-07 23:59:59.000",
                        "itemId": "77836684_MAIN_2",
                        "remainingQuota": "16106137600",
                        "totalQuota": "16106137600",
                        "type": "DATA"
                    },
                    {
                        "benefitName": "VOICE*Nelp (ke Semua Operator)",
                        "eligibleLocalShow": null,
                        "expDate": "2026-10-07 23:59:59.000",
                        "itemId": "77842484",
                        "remainingQuota": "3000",
                        "totalQuota": "3000",
                        "type": "VOICE"
                    },
                    {
                        "benefitName": "VOICE*Nelp (ke XL)",
                        "eligibleLocalShow": null,
                        "expDate": "2026-10-07 23:59:59.000",
                        "itemId": "77836694",
                        "remainingQuota": "86400",
                        "totalQuota": "86400",
                        "type": "VOICE"
                    }
                ],
                "effectiveDate": "2026-09-10 17:43:17.000",
                "expDate": "2026-10-07 23:59:00.000",
                "packageName": "FlexMax 15GB, 28hr",
                "regDate": "2026-09-10 17:43:17.000",
                "serviceId": "8210912",
                "soccd": "77836684"
            },
            {
                "allowanceType": "PRICE_PLAN",
                "benefit": [
                    {
                        "benefitName": "DATA*INTERNET di 2G/3G/4G ",
                        "eligibleLocalShow": null,
                        "expDate": null,
                        "itemId": "513759724",
                        "remainingQuota": "5120",
                        "totalQuota": "5120",
                        "type": "DATA"
                    },
                    {
                        "benefitName": "ACCUMCHARGE*24 Jam",
                        "eligibleLocalShow": null,
                        "expDate": null,
                        "itemId": "422218",
                        "remainingQuota": "0",
                        "totalQuota": "0",
                        "type": "ACCUMCHARGE"
                    },
                    {
                        "benefitName": "VOICE*Nelp (ke Semua Operator)",
                        "eligibleLocalShow": null,
                        "expDate": null,
                        "itemId": "77842484",
                        "remainingQuota": "3000",
                        "totalQuota": "3000",
                        "type": "VOICE"
                    },
                    {
                        "benefitName": "VOICE*Nelp (ke XL)",
                        "eligibleLocalShow": null,
                        "expDate": null,
                        "itemId": "77836694",
                        "remainingQuota": "86400",
                        "totalQuota": "86400",
                        "type": "VOICE"
                    }
                ],
                "effectiveDate": null,
                "expDate": null,
                "packageName": null,
                "regDate": null,
                "serviceId": null,
                "soccd": "513738114"
            }
        ],
        "msisdn": "1212"
    }
}
```

# HLR Details

## Method

GET

## Path

/api/v1/third-party/vqm/hlr-details/{msisdn}

## Response

```
{
    "success": true,
    "message": "success",
    "data": {
        "dataMobilityInfo2G3G": {
            "gprsUpdateLocationTimeToHlr": "Error!",
            "sgsnAddress": "Error!"
        },
        "dataService2G3G": {
            "apnSubscribed": "INTERNET(226),IMS(370),478",
            "blackberryService": "Not Available",
            "contextId": "",
            "qosId": "8"
        },
        "faxDataService": {
            "bs2g": null,
            "bs3g": null,
            "dataFax": null,
            "ts61": null,
            "ts62": null
        },
        "locationInfo": {
            "cgi": "510.11.430917.53",
            "cgi5g": "Error!",
            "country": "Indonesia",
            "operator": "XL Axiata",
            "ranAccess": "4G LTE"
        },
        "lteDataMobilityInfo4G": {
            "lteUpdateLocationTimeToHlr": "Error!",
            "mmeHost": "Error!",
            "mmeVplmn": "Error!"
        },
        "lteDataServices4G": {
            "apnSubscribed": "478",
            "contextId": null,
            "lteDataService": "Available",
            "qosId": "8"
        },
        "roamingServices": {
            "gprsInternationalRoming": null,
            "internationalRoaming": null,
            "obpValue": null,
            "obrValue": null,
            "rsaProfile": null
        },
        "subscriberDataInfo": {
            "cardType": null,
            "csp": null,
            "deviceType": "iPhone 15 A3090",
            "imei": "Error!",
            "imsi": null,
            "msisdn": "1212",
            "prbt": "Not Available",
            "stype": null,
            "ucsi": null
        },
        "supplementaryServices": {
            "callForwardIfBusy": null,
            "callForwardIfNoReply": null,
            "callForwardIfNotReachable": null,
            "callForwardUnconditional": null,
            "callWaiting": null,
            "clip": null,
            "clir": null,
            "soclip": "WITH OVERRIDE CATEGORY",
            "soclir": "Temporary",
            "voiceMail": null
        },
        "voiceAndSmsMobilityInfo": {
            "gsmUpdateLocationTimeToHlr": "2026-08-30 22:37:45",
            "mscName": "Error!",
            "vlrAddress": "628184422020"
        },
        "voiceAndSmsService": {
            "incomingCall": null,
            "incomingSms": null,
            "outgoingCall": null,
            "outgoingSms": null,
            "telephonyService": null
        }
    }
}
```

# NBSS Device Specs

## Method

GET

## Path

/api/v1/third-party/nbss/device-specs/{msisdn}

## Response

```
{
    "success": true,
    "message": "success",
    "data": {
        "code": "00",
        "data": {
            "BEARER_EDGE": "true",
            "BEARER_GSM_CSD": "false",
            "BEARER_GSM_GPRS": "true",
            "BEARER_GSM_SMS": "false",
            "BEARER_HSDPA": "true",
            "BEARER_HSUPA": "true",
            "BEARER_LTE": "true",
            "BEARER_UMTS": "true",
            "BEARER_WLAN": "true",
            "BROWSER_NAME": "Safari",
            "FDD_BAND_3": "true",
            "FDD_BAND_8": "true",
            "HARDWARE_TYPE": "Slate",
            "IMEI": "35422285311833",
            "IMSI": "510118101661472",
            "OS_NAME": "iOS",
            "OS_VERSION": "17.0",
            "TCR_MODEL": "iPhone 15 A3090",
            "TCR_NAME": "Apple",
            "_msisdn": "1212"
        },
        "message": "Success",
        "status": "ok"
    }
}
```
