import React from 'react';
import {SvgTypes} from './svg-types';

const Download: React.FC<SvgTypes> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.914 23.574">
    <g>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M18.5 12.074v4M16.5 15.074l2 2M20.5 15.074l-2 2"/>
      <g transform="translate(17 7.574)">
        <circle cx="1.5" cy="1.5" r="1.5" stroke="none"/>
        <circle cx="1.5" cy="1.5" r="1"/>
      </g>
      <g transform="translate(0 15.574)" strokeWidth="2">
        <circle cx="4" cy="4" r="4" stroke="none"/>
        <circle cx="4" cy="4" r="3"/>
      </g>
      <path d="M6.99 20.074V7.026L18.5 1.001v3.768L6.99 10.854" strokeLinejoin="round" strokeWidth="2"/>
    </g>
  </svg>
);

export default Download;
