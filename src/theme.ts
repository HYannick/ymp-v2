import {transparentize} from "polished";

const genericTheme = {
  cubicEase: 'cubic-bezier(0.8, 0, 0.2, 1)',
  success: '#BAFFC0',
  error: '#FFBABA',
};
const lightTheme = {
  ...genericTheme,
  background: '#fff',
  body: '#333',
  borderColor: '#333',
  boxShadow: `0 0 1rem ${transparentize(0.8, '#525252')}`
};
const darkTheme = {
  ...genericTheme,
  background: '#333',
  body: '#F5F5F5',
  borderColor: '#F5F5F5',
  boxShadow: `0 0 1rem ${transparentize(0.8, '#525252')}`
};
const theme = (mode: string) => (mode === 'dark' ? darkTheme : lightTheme);

export default theme
