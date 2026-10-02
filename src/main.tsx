import '@fontsource-variable/manrope'
import '@fontsource-variable/newsreader'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { GlobalStyle } from './styles/global'
import { theme } from './styles/theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
