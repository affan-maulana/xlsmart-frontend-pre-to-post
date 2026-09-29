import type { Config } from 'tailwindcss';
import { BREAKPOINTS } from './components/design-tokens/breakpoints';
import { FONT_SANS } from './components/design-tokens/typography';
import { ICON_SIZES } from './components/design-tokens/breakpoints';

/**
 * Tailwind is wired to the design-token CSS variables in `app/globals.css` —
 * the single color/elevation/radius source of truth. The semantic utilities
 * below (`bg-primary`, `text-muted-foreground`, …) are the only sanctioned
 * way for components to consume tokens.
 *
 * `ink-soft` / `ink-muted` / `faint` are raw-palette utilities, provided for
 * compositional cases where the semantic role does not fit (e.g. opacity
 * variants in legacy screens). New code should prefer semantic tokens.
 */
const token = (variable: string) => `hsl(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: token('--background'),
        foreground: token('--foreground'),

        border: {
          DEFAULT: token('--border'),
          strong: token('--color-border-strong'),
        },
        input: token('--input'),
        ring: token('--ring'),

        primary: {
          DEFAULT: token('--primary'),
          foreground: token('--primary-foreground'),
        },
        secondary: {
          DEFAULT: token('--secondary'),
          foreground: token('--secondary-foreground'),
        },
        muted: {
          DEFAULT: token('--muted'),
          foreground: token('--muted-foreground'),
        },
        accent: {
          DEFAULT: token('--accent'),
          foreground: token('--accent-foreground'),
        },
        card: {
          DEFAULT: token('--card'),
          foreground: token('--card-foreground'),
        },
        popover: {
          DEFAULT: token('--popover'),
          foreground: token('--popover-foreground'),
        },
        destructive: {
          DEFAULT: token('--destructive'),
          foreground: token('--destructive-foreground'),
          subtle: token('--destructive-subtle'),
        },
        success: {
          DEFAULT: token('--success'),
          foreground: token('--success-foreground'),
          subtle: token('--success-subtle'),
        },
        warning: {
          DEFAULT: token('--warning'),
          foreground: token('--warning-foreground'),
          subtle: token('--warning-subtle'),
          surface: token('--warning-surface'),
        },
        info: {
          DEFAULT: token('--info'),
          foreground: token('--info-foreground'),
          subtle: token('--info-subtle'),
        },

        overlay: token('--overlay'),
        // Raw-palette utilities (compositional use only):
        faint: token('--color-faint'),
        magenta: token('--color-magenta'),
        'ink-soft': token('--color-ink-soft'),
        'ink-muted': token('--color-ink-muted'),
      },
      backgroundImage: {
        'brand-gradient': 'var(--gradient-brand)',
      },
      fontFamily: {
        sans: FONT_SANS,
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-card)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        overlay: 'var(--shadow-overlay)',
      },
      screens: Object.fromEntries(
        Object.entries(BREAKPOINTS).map(([name, px]) => [name, `${px}px`])
      ),
      fontSize: {
        // 2xs is required for micro labels (status markers inside pills).
        '2xs': ['10px', { lineHeight: '12px' }],
      },
      spacing: {
        // Package-card image height (formerly ad-hoc `h-30`).
        '30': '7.5rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'overlay-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'overlay-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'dialog-in': {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        'dialog-out': {
          from: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'overlay-in': 'overlay-in 150ms ease-out',
        'overlay-out': 'overlay-out 150ms ease-in',
        'dialog-in': 'dialog-in 200ms ease-out',
        'dialog-out': 'dialog-out 150ms ease-in',
      },
      // Design-system icon scale (components/design-tokens/breakpoints.ts → ICON_SIZES).
      size: {
        icon: {
          sm: `${ICON_SIZES.sm}px`,
          DEFAULT: `${ICON_SIZES.md}px`,
          md: `${ICON_SIZES.md}px`,
          lg: `${ICON_SIZES.lg}px`,
          xl: `${ICON_SIZES.xl}px`,
        },
      },
    },
  },
  plugins: [],
};

export default config;
