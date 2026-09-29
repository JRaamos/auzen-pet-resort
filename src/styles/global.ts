import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
    background: ${({ theme }) => theme.colors.cream};
  }

  body {
    margin: 0;
    min-width: min(320px, 100%);
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.cream};
    font-family: ${({ theme }) => theme.typography.body};
    font-size: 1rem;
    line-height: 1.65;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body.menu-open,
  body.lightbox-open {
    overflow: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  img,
  video {
    display: block;
    max-width: 100%;
  }

  h1,
  h2,
  h3,
  p {
    margin-top: 0;
  }

  ::selection {
    color: ${({ theme }) => theme.colors.warmWhite};
    background: ${({ theme }) => theme.colors.terracotta};
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.terracotta};
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`
