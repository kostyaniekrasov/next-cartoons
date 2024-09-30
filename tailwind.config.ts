import type { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import colors from './src/utils/customColors';

type TailwindConfigType = {
  theme: {
    colors: {
      [key: string]: string | { [key: number]: string };
    };
  };
};

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
      },
      container: {
        center: true,

        screens: {
          sm: '100%',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1344x',
          '3xl': '1824px',
        },
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray: {
          900: colors.gray[900],
          700: colors.gray[700],
          600: colors.gray[600],
          500: colors.gray[500],
          400: colors.gray[400],
          300: colors.gray[300],
          200: colors.gray[200],
          100: colors.gray[100],
        },
        error: colors.error,
        info: colors.info,
        warning: colors.warning,
        success: colors.success,
        accentPink: colors.accentPink,
      },
    },
  },
  plugins: [],
};

export const fullConfig = resolveConfig(
  config
) as unknown as TailwindConfigType;

export default config;
