'use client';

import { useState } from 'react';
import { Smartphone } from 'lucide-react';
import type { PhoneNumber } from '@/lib/types';

type ProviderStyle = {
  iconBg: string;
  iconText: string;
  label: string;
};

const fallbackProviderStyle: Record<string, ProviderStyle> = {
  xl: { iconBg: 'bg-brand-indigo/10', iconText: 'text-brand-indigo', label: '' },
  axis: { iconBg: 'bg-black/5', iconText: 'text-ink-700/60', label: '' },
  smartfren: { iconBg: 'bg-pink-50', iconText: 'text-pink-600', label: 'sf' },
  other: { iconBg: 'bg-purple-100', iconText: 'text-purple-600', label: '' },
};

export function isXlPrioritas(number: PhoneNumber) {
  return number.provider === 'xl' && number.status === 'suspend' && Boolean(number.outstanding);
}

interface ProviderIconProps {
  number: PhoneNumber;
  size?: 'sm' | 'md';
}

const sizeClasses: Record<'sm' | 'md', { box: string; icon: number; text: string }> = {
  sm: { box: 'h-5 w-5', icon: 12, text: 'text-[10px]' },
  md: { box: 'h-7 w-7', icon: 16, text: 'text-xs' },
};

function FallbackBadge({
  provider,
  box,
  icon,
  text,
}: {
  provider?: PhoneNumber['provider'];
  box: string;
  icon: number;
  text: string;
}) {
  const style = fallbackProviderStyle[provider ?? 'other'] ?? fallbackProviderStyle.other;
  return (
    <span
      className={`flex ${box} shrink-0 items-center justify-center rounded-full font-bold ${text} ${style.iconBg} ${style.iconText}`}
    >
      {style.label || <Smartphone size={icon} />}
    </span>
  );
}

/** Renders a provider logo image, but silently falls back to the letter/icon badge if the image 404s or fails to load. */
function ProviderLogoImg({
  src,
  alt,
  box,
  provider,
  icon,
  text,
}: {
  src: string;
  alt: string;
  box: string;
  provider?: PhoneNumber['provider'];
  icon: number;
  text: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <FallbackBadge provider={provider} box={box} icon={icon} text={text} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${box} shrink-0 object-contain`}
      onError={() => setErrored(true)}
    />
  );
}

export function ProviderIcon({ number, size = 'sm' }: ProviderIconProps) {
  const { provider } = number;
  const { box, icon, text } = sizeClasses[size];

  if (provider === 'xl') {
    const prioritas = isXlPrioritas(number);
    return (
      <ProviderLogoImg
        src={prioritas ? '/icons/xlprioritas.svg' : '/icons/xllogo.svg'}
        alt={prioritas ? 'XL Prioritas' : 'XL'}
        box={box}
        provider={provider}
        icon={icon}
        text={text}
      />
    );
  }

  if (provider === 'smartfren') {
    return (
      <ProviderLogoImg
        src="/icons/sflogo.svg"
        alt="Smartfren"
        box={box}
        provider={provider}
        icon={icon}
        text={text}
      />
    );
  }

  if (provider === 'axis') {
    return (
      <ProviderLogoImg
        src="/icons/axislogo.svg"
        alt="Axis"
        box={box}
        provider={provider}
        icon={icon}
        text={text}
      />
    );
  }

  return <FallbackBadge provider={provider} box={box} icon={icon} text={text} />;
}
