/** @jsx jsx */
import React from 'react';
import styled from "@emotion/styled";
import {css, jsx} from "@emotion/core";

export const Avatar = styled('button')<{ bgUrl: string }>`
  display: block;
  cursor: pointer;
  border: none;
  outline: white;
  width: 6rem;
  height: 6rem;
  background: ${({bgUrl}) => `url(${bgUrl}) center center no-repeat`};
  background-size: cover;
`;
const Wrapper: any = styled.div<{ isOpen: boolean }>`
  height: 100vh;
  visibility: ${({isOpen}) => isOpen ? 'visible' : 'hidden'};
  position: fixed;
  transition: visibility 0.3s ease;
  z-index: 6000;
`;

Wrapper.Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  opacity: ${({isOpen}) => isOpen ? '0.5' : '0'};
  background-color: ${({theme}: any) => theme.background};
  transition: opacity 0.3s;
`;

const makeOrientation = (isOpen: boolean, orientation: string) => {
  const horizontalOrientation = css`
    width: 80%;
    height: 100%;
    top: 0;
  `;

  const verticalOrientation = css`
    width: 100%;
    height: 90%;
    left: 0;
    right: 0;
  `;
  switch (orientation) {
    case 'top':
      return css`
        ${verticalOrientation};
        top: 0;
        transform: ${isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)'};
      `;
    case 'bottom':
      return css`
        ${verticalOrientation};
        bottom: 0;
        transform: ${isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)'};
      `;
    case 'left':
      return css`
        ${horizontalOrientation};
        left: 0;
        transform: ${isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)'};
      `;
    case 'right':
      return css`
        ${horizontalOrientation};
        right: 0;
        transform: ${isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)'};
      `;
    default:
      return css`
        ${horizontalOrientation};
        left: 0;
        transform: ${isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)'};
      `;
  }
};

const makeCloseOrientation = (isOpen: boolean, orientation: string) => {
  switch (orientation) {
    case 'top':
      return css`
        top: 0;
        left: 50%;
        transform: ${isOpen ? 'translate3d(-50%, 0, 0) scale(1)' : 'translate3d(-50%, 0,0) scale(0)'};
      `;
    case 'bottom':
      return css`
        top: -4.5rem;
        left: 50%;
        transform: ${isOpen ? 'translate3d(-50%, 0, 0) scale(1)' : 'translate3d(-50%, 0, 0) scale(0)'};
      `;
    case 'left':
      return css`
        top: 3rem;
        right: -3.5rem;
        transform: ${isOpen ? 'translate3d(0, -50%, 0) scale(1)' : 'translate3d(0, -50%, 0) scale(0)'};
      `;
    case 'right':
      return css`
        top: 3rem;
        left: -3.5rem;
        transform: ${isOpen ? 'translate3d(0,-50%, 0) scale(1)' : 'translate3d(0,-50%, 0) scale(0)'};
      `;
    default:
      return css`
        top: 50%;
        right: -3.5rem;
        transform: ${isOpen ? 'translate3d(0,-50%, 0) scale(1)' : 'translate3d(0,-50%, 0) scale(0)'};
      `;
  }
}

export const CloseButton = styled('button')<{ isOpen: boolean, orientation: string }>`
  position: absolute;
  width: 5rem;
  height: 5rem;
  border: none;
  font-weight: bold;
  box-shadow: ${({theme}: any) => theme.boxShadow};
   ${({isOpen, orientation}) => makeCloseOrientation(isOpen, orientation)};
  border-radius: 4rem;
  background-color: ${({theme}: any) => theme.body};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s 0.1s;
  outline: white;
  svg {
    width: 2rem;
    height: 2rem;
    path {
      stroke: ${({theme}: any) => theme.background};
    }
  }
`;

Wrapper.Content = styled.div<{ isOpen: boolean, orientation: string }>`
  padding: 1rem;
  position: fixed;
  z-index: 3000;
  ${({isOpen, orientation}) => makeOrientation(isOpen, orientation)};
  transition: transform 0.3s ease;
  background-color: ${({theme}: any) => theme.background};
  box-shadow: ${({theme}: any) => theme.boxShadow};
  color: ${({theme}: any) => theme.body};
`;

Wrapper.Title = styled('h4')`
  padding: 1rem 3rem 0;
  margin: 0;
  font-size: 2rem;
  display: block;
  width: 100%;
  text-align: center;
`;

const Panel: React.FC<{ title?: string, handleClose?: any, isPanelOpen: boolean, orientation?: string }> = ({title, children, isPanelOpen, handleClose, orientation = 'right'}) => {
  const panelProps = {
    isOpen: isPanelOpen,
    orientation
  };
  return (
    <Wrapper isOpen={isPanelOpen}>
      <Wrapper.Overlay {...panelProps} onClick={handleClose}/>
      <Wrapper.Content {...panelProps}>
        <div css={css`position: relative`}>
          {/*<CloseButton {...panelProps} onClick={handleClose}><CloseIcon/></CloseButton>*/}
          <Wrapper.Title>{title}</Wrapper.Title>
          {children}
        </div>
      </Wrapper.Content>
    </Wrapper>
  );
}

export default Panel;
