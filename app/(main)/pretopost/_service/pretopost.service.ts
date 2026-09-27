import { serverApiClient } from '@/lib/server-api-client';

const API_PATHS = {
  getProfile: (msisdn: string) => `/api/v1/third-party/vqm/get-profile/${msisdn}`,
  getCustomerStatus: (msisdn: string) => `/api/v1/third-party/vqm/get-customer-status/${msisdn}`,
  getPackageDetails: (msisdn: string) => `/api/v1/third-party/vqm/package-details/${msisdn}`,
  getHlrDetails: (msisdn: string) => `/api/v1/third-party/vqm/hlr-details/${msisdn}`,
  getDeviceSpecs: (msisdn: string) => `/api/v1/third-party/nbss/device-specs/${msisdn}`,
} as const;

export type ProfileData = {
  msisdn: string;
  customerId: string;
  individualId: string;
  fullName: { givenName: string; familyName: string | null; title: string };
  gender: string;
  birthDate: string;
  maritalStatus: string;
  email: string | null;
  mainBalance: { mobileBalance: string; dealerBalance: string };
  pricePlan: { name: string | null; status: string | null };
  subscriberStatus: string;
  additionalInformation: {
    accountId: string;
    contactRole: string;
    religion: string;
    mothersMaidenName: string;
    occupation: string;
    income: string;
    specialStatus: string;
  };
  address: {
    homeAddress: {
      streetName: string | null;
      streetNumber: string | null;
      buildingName: string | null;
      city: string;
      stateOrProvince: string;
      country: string;
      postCode: string | null;
    };
  };
};

export type CustomerStatusData = {
  msisdn: string;
  nik: string;
  kk: string;
  activationDate: string | null;
  dateOfRegistration: string;
  dukcapilStatus: string;
};

export type PackageDetailsData = {
  msisdn: string;
  allowances: Array<{
    allowanceType: string;
    packageName: string | null;
    soccd: string | null;
    effectiveDate: string | null;
    expDate: string | null;
    benefit: Array<{
      benefitName: string;
      type: string;
      remainingQuota: string;
      totalQuota: string;
      expDate: string | null;
    }>;
  }>;
};

export type SubmitPreToPostResponse = {
  success: boolean;
  orderId: string;
  status: 'pending' | 'completed' | 'failed';
  message: string;
  packageId: string;
  email: string;
  phoneNumber: string | null;
};

export const pretopostService = {
  getProfile: (msisdn: string, token?: string) =>
    serverApiClient.get<ProfileData>(API_PATHS.getProfile(msisdn), { token }),

  getCustomerStatus: (msisdn: string, token?: string) =>
    serverApiClient.get<CustomerStatusData>(API_PATHS.getCustomerStatus(msisdn), { token }),

  getPackageDetails: (msisdn: string, token?: string) =>
    serverApiClient.get<PackageDetailsData>(API_PATHS.getPackageDetails(msisdn), { token }),

  getHlrDetails: (msisdn: string, token?: string) =>
    serverApiClient.get(API_PATHS.getHlrDetails(msisdn), { token }),

  getDeviceSpecs: (msisdn: string, token?: string) =>
    serverApiClient.get(API_PATHS.getDeviceSpecs(msisdn), { token }),

  submitPreToPost: (
    payload: { packageId: string; email: string; phoneNumber?: string },
    token?: string,
  ) => {
    // TODO: Replace with real API call when backend is ready
    // return serverApiClient.post<SubmitPreToPostResponse>('/api/v1/pretopost/submit', payload, { token });

    return Promise.resolve({
      success: true,
      orderId: `ORD-${Date.now()}`,
      status: 'pending',
      message: 'Pre-to-post submission received',
      packageId: payload.packageId,
      email: payload.email,
      phoneNumber: payload.phoneNumber ?? null,
    } as SubmitPreToPostResponse);
  },
};
