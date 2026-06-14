'use client';

import React from 'react';

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

export function Sidebar({ children, className = '' }: SidebarProps) {
  return (
    <aside
      className={`
        fixed right-0 top-0 h-screen w-60
        bg-bg border-l border-line-soft
        overflow-y-auto
        flex flex-col
        gap-7 p-8
        ${className}
      `}
    >
      {children}
    </aside>
  );
}

interface SidebarHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function SidebarHeader({ children, className = '' }: SidebarHeaderProps) {
  return (
    <div className={`flex items-center gap-2.5 px-2 ${className}`}>
      {children}
    </div>
  );
}

interface SidebarNavProps {
  children?: React.ReactNode;
  className?: string;
}

export function SidebarNav({ children, className = '' }: SidebarNavProps) {
  return (
    <nav className={`flex flex-col gap-1 ${className}`}>
      {children}
    </nav>
  );
}

interface SidebarNavItemProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export function SidebarNavItem({
  icon,
  label,
  onClick,
  isActive = false,
  className = '',
}: SidebarNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full px-3 py-2 rounded-md text-sm
        flex items-center gap-3 text-right
        transition-colors duration-200
        ${
          isActive
            ? 'bg-accent-soft text-accent font-semibold'
            : 'text-ink-soft hover:bg-bg-soft'
        }
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
