import type { AppProps } from 'next/app';

import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { EntriesProvider } from '../context/entries';
import { UIProvider } from '../context/ui';
import 'animate.css';

import '../styles/globals.css';
import { lightTheme, darkTheme } from '../styles/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={ 3 }>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}
