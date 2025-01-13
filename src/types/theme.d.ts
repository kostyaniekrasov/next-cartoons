import '@mui/material/Typography';
import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h3Semibold: CSSProperties;
    mainText: CSSProperties;
    mainTextMedium: CSSProperties;
    mainTextSemibold: CSSProperties;
    mainTextBold: CSSProperties;
    secondaryText: CSSProperties;
    secondaryTextSemibold: CSSProperties;
    footnote: CSSProperties;
    captionMedium: CSSProperties;
    captionBold: CSSProperties;
    categoryTitle: CSSProperties;
  }

  interface TypographyVariantsOptions {
    h3Semibold?: CSSProperties;
    mainText?: CSSProperties;
    mainTextMedium?: CSSProperties;
    mainTextSemibold?: CSSProperties;
    mainTextBold?: CSSProperties;
    secondaryText?: CSSProperties;
    secondaryTextSemibold?: CSSProperties;
    footnote?: CSSProperties;
    captionMedium?: CSSProperties;
    captionBold?: CSSProperties;
    categoryTitle?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h3Semibold: true;
    mainText: true;
    mainTextMedium: true;
    mainTextSemibold: true;
    mainTextBold: true;
    secondaryText: true;
    secondaryTextSemibold: true;
    footnote: true;
    captionMedium: true;
    captionBold: true;
    categoryTitle: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    accentPink: Palette['primary'];
    gray: {
      900: string;
      700: string;
      600: string;
      500: string;
      400: string;
      300: string;
      200: string;
      100: string;
    };
    white: string;
    black: string;
    error: Palette['primary'];
    info: Palette['primary'];
    warning: Palette['primary'];
    success: Palette['primary'];
    accentPink: Palette['primary'];
  }

  interface PaletteOptions {
    accentPink?: PaletteOptions['primary'];
    gray?: {
      900: string;
      700: string;
      600: string;
      500: string;
      400: string;
      300: string;
      200: string;
      100: string;
    };
    white?: string;
    black?: string;
    error?: PaletteOptions['primary'];
    info?: PaletteOptions['primary'];
    warning?: PaletteOptions['primary'];
    success?: PaletteOptions['primary'];
    accentPink?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    '2xl': true;
    '3xl': true;
  }
}

declare module '@mui/material/Icon' {
  interface IconPropsColorOverrides {
    accentPink: true;
  }
}
