'use client';

import React from 'react';

interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <div
      className={`
        w-9 h-9 rounded-[12px] flex-shrink-0
        bg-gradient-to-br from-sage to-sky
        flex items-center justify-center
        relative
        ${className}
      `}
    >
      {/* Accent dot in center */}
      <div
        className="w-3.5 h-3.5 rounded-full bg-bg-elevated"
        style={{ opacity: 0.7 }}
      />
    </div>
  );
}

interface BrandProps {
  name?: string;
  className?: string;
}

export function Brand({ name = 'کلینیک', className = '' }: BrandProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <BrandMark />
      <div className="flex flex-col gap-0">
        <span className="text-sm font-semibold text-ink">{name}</span>
        <span className="text-xs text-ink-muted">آرامش</span>
      </div>
    </div>
  );
}
