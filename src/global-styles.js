import { css } from '@emotion/core';

export const globalStyles = css`
  html {
   font-size: 62.5%;
  }
  body {
   font-size: 1.4rem; 
   font-family: monospace, sans-serif;
   -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-overflow-scrolling: touch;
  }
  button {
    padding: 0;
    user-select: none;
  }
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  @font-face {
    font-family: 'Dosis-Bold';
    src: local('Dosis-Bold'), url(./static/fonts/Dosis-Bold.ttf) format('ttf');
  }
  @font-face {
    font-family: 'Dosis-ExtraBold';
    src: local('Dosis-ExtraBold'), url(./static/fonts/Dosis-ExtraBold.ttf) format('ttf');
  }
  @font-face {
    font-family: 'Dosis-Light';
    src: local('Dosis-Light'), url(./static/fonts/Dosis-Light.ttf) format('ttf');
  }
  @font-face {
    font-family: 'Dosis-Medium';
    src: local('Dosis-Medium'), url(./static/fonts/Dosis-Medium.ttf) format('ttf');
  }
  @font-face {
    font-family: 'Dosis-Regular';
    src: local('Dosis-Regular'), url(./static/fonts/Dosis-Regular.ttf) format('ttf');
  }
  @font-face {
    font-family: 'Dosis-SemiBold';
    src: local('Dosis-SemiBold'), url(./static/fonts/Dosis-SemiBold.ttf) format('ttf');
  }
`;
