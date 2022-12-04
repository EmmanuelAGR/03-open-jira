import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { EntriesProvider } from '../context/entries';
import { UIProvider } from '../context/ui';
import 'animate.css';

import '../styles/globals.css';
import { darkTheme } from '../styles/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}
