export const theme = {
  colors: {
    forest: '#183e32',
    forestLight: '#2f5a49',
    forestMuted: '#728672',
    terracotta: '#ad5033',
    terracottaLight: '#efb199',
    terracottaDark: '#9d472f',
    brown: '#49362f',
    ink: '#29251f',
    sand: '#e9dcc9',
    cream: '#f6f0e6',
    warmWhite: '#fcf9f3',
    white: '#ffffff',
    line: 'rgba(73, 54, 47, 0.18)',
    lightLine: 'rgba(255, 255, 255, 0.22)',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    section: 'clamp(5rem, 10vw, 9rem)',
  },
  radius: {
    sm: '0.75rem',
    md: '1.25rem',
    lg: '2rem',
    pill: '999px',
    organic: '42% 58% 58% 42% / 48% 40% 60% 52%',
  },
  shadows: {
    soft: '0 20px 60px rgba(31, 41, 34, 0.12)',
    lift: '0 18px 40px rgba(30, 36, 31, 0.2)',
  },
  breakpoints: {
    mobile: '520px',
    tablet: '800px',
    laptop: '1100px',
    desktop: '1440px',
  },
  typography: {
    display: '"Newsreader Variable", Georgia, serif',
    body: '"Manrope Variable", system-ui, sans-serif',
  },
  transitions: {
    fast: '160ms ease',
    base: '280ms cubic-bezier(0.2, 0.75, 0.25, 1)',
    slow: '700ms cubic-bezier(0.18, 0.8, 0.2, 1)',
  },
} as const

export type AppTheme = typeof theme
