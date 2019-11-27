import React from "react";
import {SvgTypes} from './svg-types';
import styled from "@emotion/styled";

const StyledSVG = styled('svg')`
  fill: none;
  transform-origin: center;
  animation: rotate 2s linear infinite;
  @keyframes rotate {
      100% {
        transform: rotate(360deg);
    }
  }
`;

const StyledCircle = styled('circle')`
    stroke-width: 4;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
        50% {
          stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
      }
        100% {
          stroke-dashoffset: -125px;
      }
    }
`;


const Spinner: React.FC<SvgTypes> = () => (
  <StyledSVG viewBox="25 25 50 50">
    <StyledCircle cx="50" cy="50" r="20"/>
  </StyledSVG>
);

export default Spinner;


