import React, { Suspense, lazy } from 'react';
import AppProvider, { AppContext } from './Context/AppContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';

// Lazy Loading is a good practice for loading assets that we might not need at the moment /in the following case the page is one and we are not getting the advantage of lazy loading. The default way to load assets is 'eager'/ 
// We could add Transaction and Address pages showing more information (and/or better stylized information) 
const BitcoinExplorer = lazy(() => import('./pages/BitcoinExplorer'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#451952',
      light: '#AE445A',
      contrastText: '#F39F5A'
    },
    secondary: {
      main: '#662549',
      light: '#F39F5A',
      contrastText: '#F39F5A',
    }
  },
});

function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Header />

        {/* Added suspense component for the lazy loaded page. In more complicated cases we could take advantage of error boundaries as well */}
        <Suspense fallback={<div>
          Loading...
        </div>} >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<BitcoinExplorer />} />
          </Routes>
        </Suspense>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
