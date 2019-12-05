/** @jsx jsx */
import React from 'react';
import styled from "@emotion/styled";
import {css, jsx} from "@emotion/core";
import {transparentize} from "polished";

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
  background-color: ${({theme}) => theme.background};
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

Wrapper.Content = styled.div<{ isOpen: boolean, orientation: string }>`
  position: fixed;
  z-index: 3000;
  ${({isOpen, orientation}) => makeOrientation(isOpen, orientation)};
  transition: transform 0.3s ease;
  background-color: ${({theme}) => theme.background};
  box-shadow: ${({theme}) => theme.boxShadow};
  color: ${({theme}) => theme.body};
`;

Wrapper.Title = styled('h4')`
  margin: 0;
  font-size: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6rem;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    right: 0;
    height: 0.5rem;
    background: linear-gradient(to bottom, ${({theme}) => `${theme.background}, ${transparentize(1, theme.background)}`});
  }
`;

interface PanelTypes {
  title?: string,
  handleClose?: any,
  isPanelOpen: boolean,
  orientation?: string
}

const Panel: React.FC<PanelTypes> = (props) => {
  const {
    title,
    children,
    isPanelOpen,
    handleClose,
    orientation = 'right'
  } = props;

  const panelProps = {
    isOpen: isPanelOpen,
    orientation
  };
  return (
    <Wrapper isOpen={isPanelOpen}>
      <Wrapper.Overlay {...panelProps} onClick={handleClose}/>
      <Wrapper.Content {...panelProps}>
        <div css={css`position: relative; height: 100%;`}>
          <Wrapper.Title>{title}</Wrapper.Title>
          {children}
        </div>
      </Wrapper.Content>
    </Wrapper>
  );
};

export default Panel;
