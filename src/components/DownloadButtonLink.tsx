import React from 'react';
import DownloadIcon from "../core/svg/Download";
import styled from "@emotion/styled";
import {Link} from "@reach/router";


const DownloadButton: any = styled(Link)`
  position: fixed;
  z-index: 4000;
  bottom: 2rem;
  right: 2rem;
  width: 8rem;
  height: 8rem;
  border: none;
  background-color:  ${({theme}: any) => theme.body};
  color:  ${({theme}: any) => theme.background};
  border-radius: 3rem;
  outline: white;
  transition: background-color 0.3s;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 3rem;
    box-shadow: ${({theme}: any) => theme.boxShadow};
  }
  svg {
    width: 4rem;
    height: 4rem;
    & > g {
      fill: none;
      stroke: ${({theme}: any) => theme.background};
      transition: stroke 0.3s;
    }
  }
`;

DownloadButton.Chip = styled('span')`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  border: 0.8rem solid ${({theme}: any) => theme.body};
  background-color: ${({theme}: any) => theme.success};
  color: ${({theme}: any) => theme.body};
  border-radius: 2rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DownloadButtonLink: React.FC<{downloadCount: number}> = ({downloadCount}) => {
  return (
    <DownloadButton to="/downloads">
      <div>
        {!!downloadCount &&  <DownloadButton.Chip>{downloadCount}</DownloadButton.Chip>}
        <DownloadIcon/>
      </div>
    </DownloadButton>
  );
};

export default DownloadButtonLink;
