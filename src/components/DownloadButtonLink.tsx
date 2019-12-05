import React from 'react';
import DownloadIcon from "core/svg/Download";
import styled from "@emotion/styled";


const DownloadButton: any = styled('div')`
  position: fixed;
  z-index: 4000;
  bottom: 2rem;
  right: 2rem;
  width: 8rem;
  height: 8rem;
  border: none;
  background-color:  ${({theme}) => theme.body};
  color:  ${({theme}) => theme.background};
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
    box-shadow: ${({theme}) => theme.boxShadow};
  }
  svg {
    width: 4rem;
    height: 4rem;
    & > g {
      fill: none;
      stroke: ${({theme}) => theme.background};
      transition: stroke 0.3s;
    }
  }
`;

DownloadButton.Chip = styled('span')`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  border: 0.8rem solid ${({theme}) => theme.body};
  background-color: ${({theme}) => theme.success};
  color: ${({theme}) => theme.body};
  border-radius: 2rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DownloadButtonLink: React.FC<{downloadCount: number, onClick: () => void}> = ({downloadCount, onClick}) => {
  return (
    <DownloadButton onClick={onClick}>
      <div>
        {!!downloadCount &&  <DownloadButton.Chip>{downloadCount}</DownloadButton.Chip>}
        <DownloadIcon/>
      </div>
    </DownloadButton>
  );
};

export default DownloadButtonLink;
