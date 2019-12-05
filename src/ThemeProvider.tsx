import React from "react";
import {ThemeProvider as EmotionThemeProvider} from "emotion-theming";
import theme from "./theme";

const defaultContextData = {
  dark: false,
  toggle: () => {
  }
};

export const ThemeContext = React.createContext(defaultContextData);
export const useTheme = () => React.useContext(ThemeContext);

interface darkThemeProps {
  dark: boolean,
  hasThemeMounted: boolean
}

export const useDarkMode = (): [darkThemeProps, (item: darkThemeProps) => void] => {
  const [themeState, setThemeState] = React.useState<darkThemeProps>({
    dark: true,
    hasThemeMounted: false
  });

  React.useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true';
    setThemeState({
      ...themeState,
      dark: isDark,
      hasThemeMounted: true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [themeState, setThemeState]
};

export const ThemeProvider: React.FC = ({children}) => {
  const [themeState, setThemeState] = useDarkMode();
  if (!themeState.hasThemeMounted) {
    return <div/>;
  }
  const toggle = () => {
    const dark = !themeState.dark;
    localStorage.setItem('dark', dark.toString());
    setThemeState({...themeState, dark})
  };

  const computedTheme = themeState.dark ? theme('dark') : theme('light');

  return (
    <EmotionThemeProvider theme={computedTheme}>
      <ThemeContext.Provider value={{
        dark: themeState.dark,
        toggle
      }}>
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  )
};
