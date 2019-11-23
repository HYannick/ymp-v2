import React from 'react';
import styled from "@emotion/styled";
import avatarUrl from "../static/avatar-1.png";

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
  width: 100%;
  height: 100vh;
  opacity: ${({isOpen}) => isOpen ? '0.5' : '0'};
  background-color: ${({theme}: any) => theme.background};
  transition: opacity 0.3s;
`;

Wrapper.Content = styled.div<{ isOpen: boolean }>`
  width: 70%;
  height: 100%;
  padding: 1rem;
  position: fixed;
  z-index: 3000;
  top: 0;
  right: 0;
  transform: ${({isOpen}) => isOpen ? 'translateX(0rem)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  background-color: ${({theme}: any) => theme.background};
  box-shadow: ${({theme}: any) => theme.boxShadow};
  color: ${({theme}: any) => theme.body};
`;

const Panel: React.FC<{ handleClose?: any, isPanelOpen: boolean }> = ({children, isPanelOpen, handleClose}) => (
    <Wrapper isOpen={isPanelOpen}>
      <Wrapper.Overlay isOpen={isPanelOpen} onClick={handleClose}/>
      <Wrapper.Content isOpen={isPanelOpen}>
        <Avatar bgUrl={avatarUrl} onClick={handleClose}/>
        {children}
      </Wrapper.Content>
    </Wrapper>
  );

export default Panel;
