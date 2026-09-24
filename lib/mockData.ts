import { v5 as uuidv5 } from "uuid";
import type {
  AgentInfo,
  AgentQueueInfo,
  BillingAlert,
  ConnectivityMetric,
  CustomerProfile,
  DenomOption,
  ForeignCustomerProfile,
  MandatoryInfoItem,
  PendingCase,
  PhoneNumber,
  PlanDetail,
  PromoBanner,
  ServicePlaybook,
  SubscriptionSummary,
  UsageMetric,
  PostpaidPlanDetail,
  HomePlanDetail,
  BillingLineItem,
  IsiPulsaPlanSummary,
  PaymentMethodGroup,
  PaketOption,
  VABankTab,
  CreditCardStatusStep
} from "./types";

const NAMESPACE = "6f0a1f2a-1c1d-4a3a-9c9a-1f0a2f3a4b5c";
const id = (seed: string) => uuidv5(seed, NAMESPACE);

export const agentQueue: AgentQueueInfo = {
  id: id("queue-aj-003"),
  queueNumber: "AJ-003",
  customerName: "Fazhar Dwitiawan Putra",
  handlingTime: "00:53",
  longestTimeInQueue: "08:20",
};

export const agent: AgentInfo = {
  id: id("agent-wawan"),
  name: "Wawan Mat Reyor",
  crrCode: "CRR-2321708",
  location: "Gandaria City",
  avatarUrl:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop&crop=faces",
  hasNotification: true,
};

export const customerProfile: CustomerProfile = {
  id: id("customer-fazhar"),
  nik: "317282319920022",
  birthDate: "20 July 1999",
  fullName: "Fazhar Dwitiawan Putra",
  gender: "Laki-Laki",
  maritalStatus: "Married",
  address:
    "The Hills D8/1 Grand Residence, Jl. Raya Pondok Cabe 3-7, Pondok Cabe, Pamulang Tangerang Selatan",
  isBirthdayToday: true,
  religion: "",
  occupation: "",
  motherName: "Gr******ri",
  income: "Up to Rp2.000.000",
};

export const foreignCustomerProfile: ForeignCustomerProfile = {
  id: id("customer-tom-cruise"),
  passportNumber: "A123423**",
  birthDate: "20 July 1999",
  fullName: "Tom Cruise",
  gender: "Laki-Laki",
  maritalStatus: "Married",
  nationality: "Australia",
  address:
    "Building 65, 04 Terry Vickerman, 65 Berwick-Cranbourne Rd, Cranbourne East VIC 3977, Australia",
  isBirthdayToday: true,
  religion: "",
  occupation: "",
  motherName: "",
  income: "",
};

export const subscriptionSummary: SubscriptionSummary = {
  id: id("subscription-summary"),
  productSubscriptionTotal: 6,
  mobileTotal: 3,
  mobileBreakdown: { active: 2, inactive: 1 },
  homeTotal: 3,
  homeBreakdown: { active: 3, inactive: 0 },
  billingPostpaid: 0,
  billingHome: 0,
};

export const foreignSubscriptionSummary: SubscriptionSummary = {
  id: id("subscription-summary-tom-cruise"),
  productSubscriptionTotal: 1,
  mobileTotal: 1,
  mobileBreakdown: { active: 1, inactive: 0 },
  homeTotal: 0,
  homeBreakdown: { active: 0, inactive: 0 },
  billingPostpaid: 0,
  billingHome: 0,
};

export const billingAlert: BillingAlert = {
  id: id("billing-alert"),
  message: "Harap lakukan pembayaran pada 1 tagihan jatuh tempo pada tanggal",
  dueDate: "31 Juli 2026",
  actionLabel: "Bayar Tagihan",
};

export const pendingCase: PendingCase = {
  id: id("pending-case"),
  message: "Profil ini memiliki 1 Layanan Pending",
  actionLabel: "Lihat Case",
};

export const foreignPendingCase: PendingCase = {
  id: id("pending-case-tom-cruise"),
  message: "Profil ini memiliki 1 Layanan Pending",
  actionLabel: "Lihat Case",
};

export const planDetail: PlanDetail = {
  id: id("plan-ultra-5g"),
  planName: "Ultra 5G+",
  planType: "Prepaid",
  customerType: "Personal",
  customerTag: "Dompul",
  serviceStatus: "Aktif",
  activeSince: "30 Agustus 2021",
  mobileBalance: 250000,
  averageArpu: 100000,
  email: "fafafa@gmail.com",
  iccid: "8992832393983827372",
  individualId: "16365267",
  contactRole: "Default",
  specialStatus: null,
  gracePeriod: "04 Mar 2024",
  deviceInfo: "iPhone 17 Pro Max",
  firstEventDate: "03 Jan 2021",
};


export const postpaidPlanDetail: PostpaidPlanDetail = {
  planName: "Ultra 5G+",
  planType: "Postpaid Prioritas",
  customerTag: "Dompul",
  customerType: "Personal",
  serviceStatus: "Aktif",
  activeSince: "30 Agustus 2021",
  status: "active",
  mobileBalance: 250000,
  averageArpu: 100000,
  billingOpen: 160000,
  dueDate: "31/07/26",
  paymentMethod: "Credit Card",
  creditCardNumber: "4532015112833121",
  creditCardExpiry: "12 Juni 2026",
  iccid: "899283239393827372",
  estimatedBilling: 200000,
  creditLimit: 300000,
  unbill: 0,
  ppsBalance: 400000,
  deposit: 300000,
  creditClass: "CX 1",
  billingCycle: "Cycle 31",
  creditLimitType: "FLT",
  gracePeriod: "04 Mar 2027",
  billingDelivery: "Email",
  dealerBalance: 300000,
  lastPayment: "04 Mar 2027",
  faId: "233249202",
  specialStatus: "",
  deviceImsi: "iPhone 17 Pro Max",
  firstEventDate: "03 Jan 2021",
  contactRole: "Default",
  email: "fadzhar.m@gmail.com",
  outstanding: 160000,
  msisdn: "628787700099",
};

export const inactivePostpaidPlanDetail: PostpaidPlanDetail = {
  ...postpaidPlanDetail,
  serviceStatus: "Nonaktif",
  status: "inactive",
  inactiveSince: "30 Juni 2026",
  msisdn: "628123450022",
  billingOpen: 0,
  outstanding: 0,
};

/** Lookup detail plan berdasarkan msisdn yang lagi dipilih. */
export const postpaidPlanDetailsByMsisdn: Record<string, PostpaidPlanDetail> = {
  [postpaidPlanDetail.msisdn]: postpaidPlanDetail,
  [inactivePostpaidPlanDetail.msisdn]: inactivePostpaidPlanDetail,
};

export function getPostpaidPlanDetail(msisdn: string): PostpaidPlanDetail | undefined {
  return postpaidPlanDetailsByMsisdn[msisdn];
}

/** Home — matches `HomePlanDetail`. */
export const homePlanDetail: HomePlanDetail = {
  planName: "XL Satu Lite",
  customerType: "Personal",
  serviceStatus: "Aktif",
  activeSince: "30 Agustus 2021",
  billingOpen: 160000,
  dueDate: "31/07/26",
  userId: "882343212345",
  firstActivation: "12 Mei 2024",
  installAddress:
    "The Hills D8/1 Grand Residence, Jl. Raya Pondok Cabe 3-7, Pondok Cabe, Pamulang Tangerang Selatan",
  activePlanPeriod: "12 Mei 2024 - 11 Mei 2027",
  individualId: "16365267",
  lastPaymentAmount: "-",
  billingPayment: "12 Bulan",
  device: "ONT ZTE F670L",
  addOnActive: "Mesh Extender",
  customerTypeDetail: "-",
  incidentStatus: "-",
  deviceImsi1: "1 Aktif",
  deviceImsi1Date: "02 Agustus 2026",
  creditAdjustment: "-",
  email: "fadzhar.m@gmail.com",
  outstanding: 160000,
};


export const connectivityMetrics: ConnectivityMetric[] = [
  { id: id("conn-download"), label: "Download", value: "82 Mbps", tone: "good", pillLabel: "Baik" },
  { id: id("conn-latency"), label: "Latency", value: "18 Ms", tone: "warn", pillLabel: "Cukup" },
  { id: id("conn-call-drop"), label: "Call Drop", value: "0.2%", tone: "warn", pillLabel: "Cukup" },
  {
    id: id("conn-network"),
    label: "Network Condition",
    value: "Excellent",
    tone: "good",
    pillLabel: "Baik",
  },
];

export const usageMetrics: UsageMetric[] = [
  { id: id("usage-data"), label: "Data Usage", value: "24.8 GB", tone: "bad", pillLabel: "Rendah" },
  { id: id("usage-quota"), label: "Sisa Kuota", value: "5.2 GB", tone: "warn", pillLabel: "Cukup" },
  { id: id("usage-voice"), label: "Voice Usage", value: "125 Menit", tone: "good", pillLabel: "Tinggi" },
  { id: id("usage-sms"), label: "SMS Usage", value: "18 SMS", tone: "good", pillLabel: "Baik" },
];

export const promoBanners: PromoBanner[] = [
  {
    id: id("promo-unlimited"),
    title: "STAY CONNECTED WITH",
    highlight: "UNLIMITED INTERNET",
    eyebrow: "PLAN GOLD  FUP 70GB*",
    price: "Rp 150 Rb",
    priceUnit: "/Bulan",
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=460&fit=crop",
    theme: "gradient",
  },
  {
    id: id("promo-roaming"),
    title: "Bebas Internetan",
    highlight: "ke 75+ Negara",
    price: "Rp 70 ribuan",
    priceUnit: "/hari",
    imageUrl:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=460&fit=crop",
    theme: "dark",
  },
];

export const registeredPhoneNumbers: PhoneNumber[] = [
  { id: "1", msisdn: "628787700099", provider: "xl" },
];

export const registeredPhoneNumbersTotal = 1;

export function getNumbersByNik(nik: string): {
  numbers: PhoneNumber[];
  totalCount: number;
} {
  return {
    numbers: [
      { id: "1", msisdn: "628787700099", provider: "xl" },
      { id: "2", msisdn: "628123450011", provider: "axis", status: "suspend" },
      { id: "3", msisdn: "628123450022", provider: "smartfren", status: "nonaktif" },
      { id: "4", msisdn: "628222450033", provider: "xl", status: "suspend", outstanding: true },
      { id: "5", msisdn: "628123450044", provider: "axis", outstanding: true },
      { id: "6", msisdn: "628123450022", provider: "smartfren" },
      { id: "7", msisdn: "628123450033", provider: "xl" },
      { id: "8", msisdn: "628123450044", provider: "axis" },
    ],
    totalCount: 8,
  };
}

export const isiPulsaPlanSummary: IsiPulsaPlanSummary = {
  planName: "FlexMax",
  planType: "Prepaid",
  mobileBalance: 250000,
};
 
export const denomOptions: DenomOption[] = [
  { id: id("denom-5000"), amount: 5000, price: 5500, bonusDays: 5 },
  { id: id("denom-10000"), amount: 10000, price: 11000, bonusDays: 5 },
  { id: id("denom-15000"), amount: 15000, price: 15000, bonusDays: 5 },
  { id: id("denom-25000"), amount: 25000, price: 25000, bonusDays: 5, bonusLabel: "Bonus 500MB" },
  { id: id("denom-50000"), amount: 50000, price: 50000, bonusDays: 5 },
  { id: id("denom-100000"), amount: 100000, price: 100000, bonusDays: 5, bonusLabel: "Bonus 2.5GB" },
  { id: id("denom-150000"), amount: 150000, price: 150000, bonusDays: 5 },
  { id: id("denom-200000"), amount: 200000, price: 200000, bonusDays: 5 },
  { id: id("denom-300000"), amount: 300000, price: 300000, bonusDays: 5 },
  { id: id("denom-500000"), amount: 500000, price: 500000, bonusDays: 5 },
];
 
export const isiPulsaMandatoryInfo: MandatoryInfoItem[] = [
  { id: id("info-1"), title: "Nomor akan aktif setelah 4 hari masa kerja" },
  { id: id("info-2"), title: "Proses Aktivasi akan dikenakan biaya Rp 5.000" },
  { id: id("info-3"), title: "Kartu perdana yang sudah diaktifkan tidak dapat dikembalikan/ditukar" },
  { id: id("info-4"), title: "NIK yang didaftarkan harus sesuai dengan KTP asli pelanggan yang hadir" },
];
 
export const isiPulsaServicePlaybook: ServicePlaybook = {
  title: "Service Playbook",
  elapsedTime: "00:01",
  stageLabel: "Tahap 0/3",
  interactions: [
    {
      id: id("interaksi-1"),
      question: "Pelanggan WNI atau WNA?",
      answer: "Pastikan kewarganegaraan sesuai dokumen identitas yang dibawa",
    },
    {
      id: id("interaksi-2"),
      question: "Mau pakai eSIM atau uSIM?",
      answer: "Kalau pilih eSIM, pastikan HP pelanggan support eSIM,",
      note: "cek disini",
    },
    {
      id: id("interaksi-3"),
      question: "Email aktif buat dikirimin konfirmasi?",
      answer: "Wajib diisi kalau eSIM, pastikan email valid & aktif",
    },
  ],
};
 


export const paymentMethodGroups: PaymentMethodGroup[] = [
  {
    id: id("pm-group-dompet"),
    title: "Dompet Digital",
    methods: [
      { id: id("pm-dana"), name: "DANA", adminFee: 2500, iconSrc: "/icons/bank/danaLogo.svg", type: "ewallet" },
      { id: id("pm-gopay"), name: "Gopay", adminFee: 2500, iconSrc: "/icons/bank/gopayLogo.svg", type: "ewallet" },
      { id: id("pm-shopeepay"), name: "ShopeePay", adminFee: 2500, iconSrc: "/icons/bank/shopeepayLogo.svg", type: "ewallet" },
    ],
  },
  {
    id: id("pm-group-qris"),
    title: "QRIS (Scan QR)",
    methods: [{ id: id("pm-qris"), name: "QRIS", adminFee: 2500, iconSrc: "/icons/bank/qrisLogo.svg", type: "qris" }],
  },
  {
    id: id("pm-group-kartu-kredit"),
    title: "Kartu Kredit",
    methods: [
      { id: id("pm-kartu-kredit"), name: "Kartu Kredit", adminFee: 0, caption: "Visa / Mastercard", iconSrc: "/icons/bank/kartuKreditLogo.svg", type: "credit_card" },
    ],
  },
  {
    id: id("pm-group-va"),
    title: "Transfer Bank (Virtual Account)",
    methods: [
      { id: id("pm-bca"), name: "BCA", adminFee: 2500, iconSrc: "/icons/bank/bcaLogo.svg", type: "virtual_account" },
      { id: id("pm-mandiri"), name: "Mandiri", adminFee: 2500, iconSrc: "/icons/bank/mandiriLogo.svg", type: "virtual_account" },
      { id: id("pm-bni"), name: "BNI", adminFee: 2500, iconSrc: "/icons/bank/bniLogo.svg", type: "virtual_account" },
      { id: id("pm-bri"), name: "BRI", adminFee: 2500, iconSrc: "/icons/bank/briLogo.svg", type: "virtual_account" },
    ],
  },
  {
    id: id("pm-group-tunai"),
    title: "Tunai",
    methods: [{ id: id("pm-tunai"), name: "Pembayaran Tunai", adminFee: 0, iconSrc: "/icons/bank/tunaiLogo.svg", type: "cash" }],
  },
  {
    id: id("pm-group-invoice"),
    title: "Invoice",
    methods: [{ id: id("pm-invoice"), name: "Invoice", adminFee: 0, iconSrc: "/icons/bank/invoiceLogo.svg", type: "invoice" }],
  },
];
 
export const paketUtamaOptions: PaketOption[] = [
  {
    id: id("paket-flex-mini-120"),
    provider: "xl",
    planName: "Flex Mini",
    quotaLabel: "120 GB",
    durationLabel: "24 Bulan",
    locationLabel: "Jakarta",
    originalPrice: 250000,
    price: 200000,
    recommended: true,
  },
  {
    id: id("paket-flex-mini-85"),
    provider: "xl",
    planName: "Flex Mini",
    quotaLabel: "85 GB",
    durationLabel: "24 Bulan",
    locationLabel: "Jakarta",
    originalPrice: 200000,
    price: 150000,
  },
  {
    id: id("paket-flexmax-7"),
    provider: "xl",
    planName: "FlexMax",
    quotaLabel: "7 GB",
    durationLabel: "24 Bulan",
    locationLabel: "Jakarta",
    price: 100000,
  },
];

export const mockPaketList: PaketOption[] = [
  {
    id: "flexmini-120gb",
    provider: "xl",
    planName: "Flex Mini",
    quotaLabel: "120 GB",
    durationLabel: "28 Hari",
    locationLabel: "Jakarta",
    price: 200000,
    originalPrice: 250000,
    recommended: true,
  },
  {
    id: "flexmini-85gb",
    provider: "xl",
    planName: "Flex Mini",
    quotaLabel: "85 GB",
    durationLabel: "28 Hari",
    locationLabel: "Jakarta",
    price: 150000,
    originalPrice: 200000,
  },
  {
    id: "flexmax-7gb",
    provider: "xl",
    planName: "FlexMax",
    quotaLabel: "7 GB",
    durationLabel: "28 Hari",
    locationLabel: "Jakarta",
    price: 100000,
  },
  {
    id: "flexmini-5gb",
    provider: "xl",
    planName: "Flex Mini",
    quotaLabel: "5 GB",
    durationLabel: "28 Hari",
    locationLabel: "Jakarta",
    price: 200000,
    originalPrice: 250000,
    recommended: true,
  },
  {
    id: "flexmini-4gb-28",
    provider: "xl",
    planName: "Flex Mini",
    quotaLabel: "4 GB",
    durationLabel: "28 Hari",
    locationLabel: "Jakarta",
    price: 150000,
    originalPrice: 200000,
  },
  {
    id: "flexmax-2gb",
    provider: "xl",
    planName: "FlexMax",
    quotaLabel: "2 GB",
    durationLabel: "7 Hari",
    locationLabel: "Jakarta",
    price: 10000,
  },
  {
    id: "flexmini-4gb-7",
    provider: "xl",
    planName: "Flex Mini",
    quotaLabel: "4 GB",
    durationLabel: "7 Hari",
    locationLabel: "Jakarta",
    price: 40000,
    recommended: true,
  },
  {
    id: "flexmini-2gb",
    provider: "xl",
    planName: "Flex Mini",
    quotaLabel: "2 GB",
    durationLabel: "7 Hari",
    locationLabel: "Jakarta",
    price: 30000,
  },
  {
    id: "flexmax-1gb",
    provider: "xl",
    planName: "FlexMax",
    quotaLabel: "1 GB",
    durationLabel: "7 Hari",
    locationLabel: "Jakarta",
    price: 20000,
  },
];

export const tipePembayaranOptions = [
  { value: "pulsa", label: "Pulsa" },
  { value: "kartu-kredit", label: "Kartu Kredit" },
  { value: "e-wallet", label: "E-Wallet" },
];

export const masaBerlanggananOptions = [
  { value: "7", label: "7 Hari" },
  { value: "28", label: "28 Hari" },
  { value: "30", label: "30 Hari" },
];

export const isiPulsaBillingItems: BillingLineItem[] = [
  {
    id: id("billing-isi-pulsa-10000"),
    name: "Isi Pulsa 10.000",
    qty: 1,
    price: 11000,
  },
];

export function getVABankTabs(bankName: string, vaNumber: string): VABankTab[] {
  // Contoh untuk BCA — tambahkan bank lain (Mandiri, BNI, BRI) dengan pola yang sama.
  if (bankName.toUpperCase() === "BCA") {
    return [
      {
        id: "mbca",
        label: "mBCA",
        steps: [
          "Buka aplikasi m-BCA, pilih menu m-Transfer",
          "Pilih BCA Virtual Account",
          `Masukkan nomor Virtual Account ${vaNumber}`,
          "Pastikan nama pelanggan dan nominal sesuai, lalu konfirmasi pembayaran",
          "Masukkan PIN m-BCA untuk menyelesaikan transaksi",
        ],
      },
      {
        id: "atm",
        label: "ATM BCA",
        steps: [
          "Masukkan kartu ATM BCA dan PIN",
          "Pilih menu Transaksi Lainnya > Transfer > Virtual Account",
          `Masukkan nomor Virtual Account ${vaNumber}`,
          "Pastikan nama pelanggan dan nominal sesuai, lalu konfirmasi pembayaran",
        ],
      },
      {
        id: "klikbca",
        label: "Klik BCA",
        steps: [
          "Login ke Klik BCA Individual",
          "Pilih menu Transfer Dana > Transfer ke BCA Virtual Account",
          `Masukkan nomor Virtual Account ${vaNumber}`,
          "Konfirmasi pembayaran menggunakan KeyBCA",
        ],
      },
    ];
  }
  // fallback generik untuk bank lain
  return [
    {
      id: "mbanking",
      label: "Mobile Banking",
      steps: [
        `Buka aplikasi mobile banking ${bankName}`,
        "Pilih menu Transfer > Virtual Account",
        `Masukkan nomor Virtual Account ${vaNumber}`,
        "Konfirmasi dan selesaikan pembayaran",
      ],
    },
  ];
}

export function getCreditCardStatusSteps(email: string): CreditCardStatusStep[] {
  return [
    {
      id: "email-sent",
      label: "Email Terkirim",
      description: `Email berhasil terkirim ke ${email}`,
      status: "done",
      actionLabel: "Kirim Ulang Email",
    },
    {
      id: "card-verification",
      label: "Verifikasi Kartu",
      description: "Menunggu pelanggan verifikasi kartu melalui email yang dikirimkan",
      status: "pending",
    },
    {
      id: "done",
      label: "Selesai",
      description: "",
      status: "pending",
    },
  ];
}