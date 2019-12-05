import styled from "@emotion/styled";
import {FormEvent} from "react";
import {transitions} from "polished";

export const Wrapper = styled('form')<{ onSubmit: (event: FormEvent) => void }>`
  height: 15rem;
  padding: 0 2rem;
  margin-top: 6rem;
  p {
    font-size: 2 rem;
    text-align: center;
    font-weight: 500;
  }
  & > div {
    display: flex;
    height: 6rem;
    width: 100%;
    border-radius: 2rem 2rem 5rem 5rem;
    border: 0.4rem solid ${({theme}) => theme.body};
    overflow: hidden;
    position: relative;
  }
  
  input {
    height: 100%;
    border: none;
    background: transparent;
    outline: white;
    color: ${({theme}) => theme.body};
    padding-left: 2rem;
    padding-right: 4rem;
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

export const Button = styled('button')<{ hasQuery: boolean }>`
  position: absolute;
  right: 0;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  width: 6.5rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  z-index: 0;
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    transform-origin: right;
    background-color: ${({theme}) => theme.body};
    transform: ${({hasQuery}) => hasQuery ? 'scaleX(1)' : 'scaleX(0)'};
    opacity: 1;
    ${({theme}) => transitions(['transform'], `0.5s ${theme.cubicEase}`)};
  }
  & > svg {
    width: 2.5rem;
    height: 2.5rem;
    path {
      fill: none;
      stroke: ${({hasQuery, theme}) => hasQuery ? theme.background : theme.body};
      ${({theme}) => transitions(['stroke'], `0.5s ${theme.cubicEase}`)};
    }
  }
`;

export const EmptyInputButton = styled('button')<{ hasQuery: boolean }>`
  position: absolute;
  right: 6.5rem;
  top: 0;
  bottom: 0;
  width: 4rem;
  background-color: transparent;
  border: none;
  outline: white;
  cursor: pointer;
  opacity: 1;
  transform: ${({hasQuery}) => hasQuery ? 'translateY(0)' : 'translateY(4.5rem)'};
  ${({theme}) => transitions(['transform'], `0.5s ${theme.cubicEase}`)};
  svg {
   width: 2rem;
   height: 2rem;
   path {
    stroke: ${({theme}) => theme.body};
   }
  }
`;
