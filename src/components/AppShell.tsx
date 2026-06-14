'use client';

import React from 'react';

interface AppShellProps {
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function AppShell({ sidebar, children, className = '' }: AppShellProps) {
  return (
    <div className={`flex h-screen bg-bg overflow-hidden ${className}`}>
      {/* Main content area with left padding for sidebar */}
      <main className="flex-1 flex flex-col overflow-hidden rtl:pe-60 ltr:ps-60">
        {children}
      </main>

      {/* Sidebar on the right (RTL) */}
      {sidebar && <div className="flex-shrink-0">{sidebar}</div>}
    </div>
  );
}

interface AppContentProps {
  children?: React.ReactNode;
  className?: string;
}

export function AppContent({ children, className = '' }: AppContentProps) {
  return (
    <div className={`flex-1 overflow-y-auto ${className}`}>
      <div className="p-8 max-w-full">
        {children}
      </div>
    </div>
  );
}
