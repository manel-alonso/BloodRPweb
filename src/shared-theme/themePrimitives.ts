import { createTheme, alpha, PaletteMode, Shadows } from '@mui/material/styles';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
declare module '@mui/material/styles' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

// Blood RP logo colors: reds, silver, black
export const brand = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 100%, 92%)',
  200: 'hsl(0, 100%, 80%)',
  300: 'hsl(0, 100%, 65%)',
  400: 'hsl(0, 100%, 50%)',
  500: 'hsl(0, 90%, 42%)',
  600: 'hsl(0, 85%, 35%)',
  700: 'hsl(0, 80%, 25%)',
  800: 'hsl(0, 70%, 16%)',
  900: 'hsl(0, 60%, 10%)',
};

export const gray = {
  50: 'hsl(0, 0%, 98%)',
  100: 'hsl(0, 0%, 94%)',
  200: 'hsl(0, 0%, 88%)',
  300: 'hsl(0, 0%, 75%)',
  400: 'hsl(0, 0%, 55%)',
  500: 'hsl(0, 0%, 42%)',
  600: 'hsl(0, 0%, 35%)',
  700: 'hsl(0, 0%, 25%)',
  800: 'hsl(0, 0%, 10%)',
  900: 'hsl(0, 0%, 3%)',
};

export const silver = {
  50: 'hsl(0, 0%, 98%)',
  100: 'hsl(0, 0%, 95%)',
  200: 'hsl(0, 0%, 90%)',
  300: 'hsl(0, 0%, 85%)',
  400: 'hsl(0, 0%, 75%)',
  500: 'hsl(0, 0%, 65%)',
  600: 'hsl(0, 0%, 55%)',
  700: 'hsl(0, 0%, 45%)',
  800: 'hsl(0, 0%, 35%)',
  900: 'hsl(0, 0%, 25%)',
};

export const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

export const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

export const red = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 92%, 90%)',
  200: 'hsl(0, 94%, 80%)',
  300: 'hsl(0, 90%, 65%)',
  400: 'hsl(0, 90%, 40%)',
  500: 'hsl(0, 90%, 30%)',
  600: 'hsl(0, 91%, 25%)',
  700: 'hsl(0, 94%, 18%)',
  800: 'hsl(0, 95%, 12%)',
  900: 'hsl(0, 93%, 6%)',
};

export const getDesignTokens = (mode: PaletteMode) => {
  customShadows[1] =
    mode === 'dark'
      ? 'hsla(0, 0%, 0%, 0.8) 0px 4px 16px 0px, hsla(0, 50%, 10%, 0.9) 0px 8px 16px -5px'
      : 'hsla(0, 30%, 5%, 0.1) 0px 4px 16px 0px, hsla(0, 50%, 10%, 0.08) 0px 8px 16px -5px';

  return {
    palette: {
      mode,
      primary: {
        light: brand[200],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
        ...(mode === 'dark' && {
          contrastText: brand[50],
          light: brand[300],
          main: brand[400],
          dark: brand[700],
        }),
      },
      info: {
        light: silver[200],
        main: silver[400],
        dark: silver[700],
        contrastText: gray[900],
        ...(mode === 'dark' && {
          contrastText: silver[200],
          light: silver[300],
          main: silver[500],
          dark: silver[800],
        }),
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
        ...(mode === 'dark' && {
          light: orange[400],
          main: orange[500],
          dark: orange[700],
        }),
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
        ...(mode === 'dark' && {
          light: red[400],
          main: red[500],
          dark: red[700],
        }),
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800],
        ...(mode === 'dark' && {
          light: green[400],
          main: green[500],
          dark: green[700],
        }),
      },
      grey: {
        ...gray,
      },
      divider: mode === 'dark' ? alpha(gray[700], 0.6) : alpha(gray[300], 0.4),
      background: {
        default: mode === 'dark' ? gray[900] : 'hsl(0, 0%, 98%)',
        paper: mode === 'dark' ? 'hsl(0, 0%, 7%)' : 'hsl(0, 0%, 100%)',
      },
      text: {
        primary: mode === 'dark' ? 'hsl(0, 0%, 100%)' : gray[900],
        secondary: mode === 'dark' ? gray[400] : gray[600],
        warning: orange[400],
      },
      action: {
        hover: alpha(brand[400], 0.08),
        selected: alpha(brand[400], 0.15),
        ...(mode === 'dark' && {
          hover: alpha(brand[400], 0.15),
          selected: alpha(brand[400], 0.25),
        }),
      },
    },
    typography: {
      fontFamily: '"Rajdhani", "Inter", sans-serif',
      h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(36),
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(30),
        lineHeight: 1.2,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(20),
        fontWeight: 600,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
      },
      subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 500,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(14),
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 400,
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 400,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: customShadows,
  };
};

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brand[200],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
      },
      info: {
        light: silver[200],
        main: silver[500],
        dark: silver[700],
        contrastText: gray[900],
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[300], 0.4),
      background: {
        default: 'hsl(0, 0%, 98%)',
        paper: 'hsl(0, 0%, 100%)',
      },
      text: {
        primary: gray[900],
        secondary: gray[600],
        warning: orange[400],
      },
      action: {
        hover: alpha(brand[400], 0.08),
        selected: alpha(brand[400], 0.15),
      },
      baseShadow:
        'hsla(0, 30%, 5%, 0.1) 0px 4px 16px 0px, hsla(0, 50%, 10%, 0.08) 0px 8px 16px -5px',
    },
  },
  dark: {
    palette: {
      primary: {
        contrastText: brand[50],
        light: brand[300],
        main: brand[400],
        dark: brand[700],
      },
      info: {
        contrastText: silver[200],
        light: silver[400],
        main: silver[500],
        dark: silver[800],
      },
      warning: {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      },
      error: {
        light: red[400],
        main: red[500],
        dark: red[700],
      },
      success: {
        light: green[400],
        main: green[500],
        dark: green[700],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[700], 0.6),
      background: {
        default: gray[900],
        paper: 'hsl(0, 0%, 7%)',
      },
      text: {
        primary: 'hsl(0, 0%, 100%)',
        secondary: gray[400],
      },
      action: {
        hover: alpha(brand[400], 0.15),
        selected: alpha(brand[400], 0.25),
      },
      baseShadow:
        'hsla(0, 0%, 0%, 0.8) 0px 4px 16px 0px, hsla(0, 50%, 10%, 0.9) 0px 8px 16px -5px',
    },
  },
};

export const typography = {
  fontFamily: '"Rajdhani", "Inter", sans-serif',
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 8,
};

const defaultShadows: Shadows = [
  'none',
  'var(--template-palette-baseShadow)',
  ...defaultTheme.shadows.slice(2),
] as Shadows;
export const shadows = defaultShadows;
