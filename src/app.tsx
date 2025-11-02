import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './common/themes';
import MainPage from './pages/main-page/main-page';
import useSettingsStore from './common/state-stores/settings-store';
import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';

const App = () => {
  const { initializeStore, displayTheme } = useSettingsStore(
    useShallow((state) => ({
      initializeStore: state.initializeStore,
      displayTheme: state.displayTheme,
    }))
  );

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <ThemeProvider theme={displayTheme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
