import {darken, transparentize} from "polished";

const genericTheme = {
  cubicEase: 'cubic-bezier(0.8, 0, 0.2, 1)',
  error: '#FFBABA',
};

const lightTheme = {
  ...genericTheme,
  background: '#fff',
  body: '#333',
  borderColor: '#333',
  boxShadow: `0 0 1rem ${transparentize(0.8, '#525252')}`,
  thumbnailShadow: '0 0.3rem 0.5rem #b3b3b3',
  success: '#BAFFC0',
  palette: {
    primary:  '#BAFFC0',
    danger: '#FFBABA',
    dark: '#333',
  }
};
const darkTheme = {
  ...genericTheme,
  background: '#333',
  body: darken(0.2, '#fff'),
  borderColor: '#F5F5F5',
  boxShadow: `0 0 1rem ${transparentize(0.8, '#525252')}`,
  thumbnailShadow: 'none',
  success: '#333',
};

const theme = (mode: string) => (mode === 'dark' ? darkTheme : lightTheme);

export default theme
