'use client';

import { AppShell, AppContent, Sidebar, SidebarHeader, Brand, Button } from '@/components';

export default function DesignSystemPage() {
  const colors = [
    { name: 'Accent', value: 'accent', hex: '#203AA2' },
    { name: 'Sky', value: 'sky', hex: '#A8C5DA' },
    { name: 'Sage', value: 'sage', hex: '#B8D4C2' },
    { name: 'Beige', value: 'beige', hex: '#E8DCC4' },
    { name: 'Lavender', value: 'lavender', hex: '#C9BBD9' },
    { name: 'Rose', value: 'rose', hex: '#E8C4C4' },
  ];

  const sidebarContent = (
    <Sidebar>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>

      <nav className="flex flex-col gap-1">
        <button className="w-full px-3 py-2 rounded-md text-sm text-right hover:bg-bg-soft transition">
          🏠 داشبورد
        </button>
        <button className="w-full px-3 py-2 rounded-md text-sm text-right hover:bg-bg-soft transition">
          👥 بیماران
        </button>
        <button className="w-full px-3 py-2 rounded-md text-sm text-right hover:bg-bg-soft transition">
          📅 تقویم
        </button>
        <button className="w-full px-3 py-2 rounded-md text-sm text-right hover:bg-bg-soft transition">
          📋 درخواست‌های رزرو
        </button>
      </nav>
    </Sidebar>
  );

  return (
    <AppShell sidebar={sidebarContent}>
      <AppContent>
        <div className="space-y-12 max-w-5xl">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-ink mb-2">دستگاه طراحی</h1>
            <p className="text-ink-soft">Phase 1: Design Tokens & RTL Layout</p>
          </div>

          {/* Color Palette */}
          <div>
            <h2 className="text-2xl font-bold text-ink mb-4">رنگ‌پالت</h2>
            <div className="grid grid-cols-3 gap-4">
              {colors.map((color) => (
                <div key={color.value} className="space-y-2">
                  <div
                    className={`h-24 rounded-md bg-${color.value} shadow-md`}
                    title={color.hex}
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-ink">{color.name}</p>
                    <p className="text-ink-muted">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h2 className="text-2xl font-bold text-ink mb-4">تایپوگرافی</h2>
            <div className="space-y-3 bg-bg-soft p-6 rounded-md">
              <h1>H1: عنوان بزرگ (32px)</h1>
              <h2>H2: عنوان درمیانه (24px)</h2>
              <h3>H3: عنوان کوچک (20px)</h3>
              <p className="text-base">P: متن عادی (15px)</p>
              <p className="text-sm">Small: متن کوچک (14px)</p>
            </div>
          </div>

          {/* Spacing */}
          <div>
            <h2 className="text-2xl font-bold text-ink mb-4">فاصله‌گذاری</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-accent-soft rounded" />
                <p>8px</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-8 h-8 bg-accent-soft rounded" />
                <p>16px</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="w-8 h-8 bg-accent-soft rounded" />
                <p>24px</p>
              </div>
              <div className="flex items-center gap-16">
                <div className="w-8 h-8 bg-accent-soft rounded" />
                <p>32px</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div>
            <h2 className="text-2xl font-bold text-ink mb-4">دکمه‌ها</h2>
            <div className="flex flex-wrap gap-4">
              <Button>دکمهٔ اصلی</Button>
              <Button variant="secondary">دکمهٔ ثانویه</Button>
              <Button variant="outline">دکمهٔ Outline</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <h2 className="text-2xl font-bold text-ink mb-4">Border Radius</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 bg-sage rounded-sm shadow-md text-center flex items-center justify-center text-sm">
                10px (sm)
              </div>
              <div className="h-24 bg-sky rounded-md shadow-md text-center flex items-center justify-center text-sm">
                16px (md)
              </div>
              <div className="h-24 bg-lavender rounded-lg shadow-md text-center flex items-center justify-center text-sm">
                22px (lg)
              </div>
            </div>
          </div>

          {/* RTL Check */}
          <div>
            <h2 className="text-2xl font-bold text-ink mb-4">تست RTL</h2>
            <div className="bg-accent-soft p-6 rounded-md text-right">
              <p className="text-ink">
                👈 فلش به سمت راست نشان می‌دهد که RTL درست تنظیم شده است
              </p>
              <p className="text-ink-soft text-sm mt-2">
                در صفحات RTL، محتوا از راست به چپ به نمایش درمی‌آید
              </p>
            </div>
          </div>
        </div>
      </AppContent>
    </AppShell>
  );
}
