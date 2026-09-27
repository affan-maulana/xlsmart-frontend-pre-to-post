import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header, SideNavigation } from '@company/shared-ui';
import './globals.css';
import { agent } from '@/lib/mockData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'XLSMART | Profil Pelanggan',
  description: 'Customer Relationship Representative dashboard - XLSMART',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen bg-[#F4F5F9]">
          <SideNavigation />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header
              locationName="Gandaria City"
              role="CRR"
              userName={agent.name}
              organizationName="XL Smart"
            />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
