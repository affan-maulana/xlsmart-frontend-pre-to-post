# XLSMART — Profil Pelanggan (Next.js 16)

Clone Next.js dari desain "Prepaid via NIK - Collapse" (XLSMART CRR dashboard),
dibangun dengan App Router, TypeScript, Tailwind, dan komponen yang reusable
supaya gampang dipakai sebagai micro frontend / dipecah ke module lain.

## Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS** — semua warna & gradient didefinisikan sebagai design token
  di `tailwind.config.ts`
- **uuid** — dipakai di `lib/mockData.ts` (`uuidv5`) untuk generate id yang
  stabil buat tiap entity (customer, plan, metric, dsb) sehingga tiap
  komponen bisa di-`key`-kan dengan aman saat datanya nanti diganti data asli
  dari service/micro frontend lain
- **lucide-react** — icon set

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur

```
app/
  layout.tsx          Root layout + font
  globals.css          Tailwind layers + reset
  page.tsx             Menyusun semua komponen jadi halaman "Profil Pelanggan"
components/
  Sidebar.tsx          Rail navigasi kiri
  TopBar.tsx           Header brand (logo, lokasi, notifikasi, agent)
  QueueBar.tsx         Info antrian & handling time
  Breadcrumb.tsx        Breadcrumb di atas hero gradient
  CustomerIdentityCard.tsx      Kartu NIK/nama/alamat + badge ulang tahun
  SubscriptionSummaryBar.tsx    Ringkasan produk & billing
  AlertRow.tsx          Notice generik (dipakai utk billing & pending case)
  PhoneNumberList.tsx   Chip nomor terdaftar
  PlanDetailCard.tsx    Detail plan/servis per nomor
  MetricPanel.tsx        Panel metric reusable (dipakai utk Konektivitas & Pengunaan)
  TransactionHistoryRow.tsx
  PromoBannerCard.tsx    Banner promo reusable (2 tema warna)
  ui/
    Card.tsx            Card shell dasar
    StatusPill.tsx        Pill status kecil (Baik/Cukup/Tinggi/Rendah)
    StatusBadge.tsx        Badge status besar di header panel
    LinkAction.tsx        Tombol teks brand-colored
lib/
  types.ts              Semua tipe data domain
  mockData.ts            Data contoh + generator id pakai uuid
```

## Gradient brand

Gradient utama didefinisikan persis sesuai brief, sebagai Tailwind utility
`bg-brand-gradient`:

```css
background: linear-gradient(321.23deg, #1E22AA -27.3%, #E5005A 168.69%);
```

Dipakai di: hero "Profil Pelanggan", logo mark, badge "Happy Birthday", dan
pill lokasi toko di TopBar — supaya semua elemen "brand" mengacu ke satu
token, bukan hardcode warna berulang-ulang.

## Reusable / micro-frontend notes

- Semua komponen menerima data lewat props bertipe (lihat `lib/types.ts`),
  tidak ada komponen yang fetch data sendiri — jadi gampang dipasang ulang di
  micro frontend lain tinggal oper data yang sesuai shape-nya.
- `MetricPanel` dipakai dua kali (Konektivitas & Pengunaan) dengan data
  berbeda — contoh nyata reusability.
- `AlertRow` dipakai dua kali (billing due date & pending case) dengan variant
  warna berbeda.
- `PromoBannerCard` dipakai berkali-kali untuk banner promo apa pun.
- Id tiap record memakai `uuidv5` dengan namespace tetap supaya deterministic
  (tidak beda antara server render dan client render), tapi tetap
  menunjukkan pola pemakaian `uuid` package untuk data yang nanti datang dari
  API/microservice lain.
