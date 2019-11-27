import React from "react";
import {SvgTypes} from './svg-types';

const DownloadLink: React.FC<SvgTypes> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14.889">
    <g fill="none">
      <g strokeLinecap="round" strokeWidth="2">
        <path d="M1 13.889h16M17 9.889v4M1 9.889v4"/>
      </g>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v4M7 7.5l2 2M11 7.5l-2 2"/>
      <g transform="translate(7.5)">
        <circle cx="1.5" cy="1.5" r="1.5" stroke="none"/>
        <circle cx="1.5" cy="1.5" r="1"/>
      </g>
    </g>
  </svg>
);

export default DownloadLink;
