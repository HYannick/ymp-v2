import React from 'react';
import styled from "@emotion/styled";

const StyledButton = styled('button')<{ onClick: () => void, variant?: string }>`
  position: relative;
  border: none;
  background-color: ${({variant, theme}) => variant ? theme.palette[variant] : theme.body};
  color: ${({theme}) => theme.background};
  padding: 1rem 2rem;
  width: 100%;
  font-size: 1.6rem;
  outline: none;
  cursor: pointer;
  font-weight: bold;
`;

const Button: React.FC<{ onClick: () => void, variant?: string, className?: string }> = ({className, onClick, variant, children}) => (
  <StyledButton className={className} onClick={onClick} variant={variant}>
    {children}
  </StyledButton>
);

export default Button;
