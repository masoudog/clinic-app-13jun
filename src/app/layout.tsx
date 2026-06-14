import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'کلینیک آرامش',
  description: 'سیستم مدیریت کلینیک روان‌درمانی',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
