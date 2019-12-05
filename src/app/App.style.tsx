import styled from "@emotion/styled";

export const Logo = styled('img')`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  transform: translateY(1rem);
`;

export const Header = styled('div')`
  width: 100%;
  display: flex;
  padding: 0 2rem;
  align-items: center;
  justify-content: space-between;
  svg {
    width: 3rem;
    height: 3rem;
    path {
      fill: ${({theme}) => theme.body}
    }
  }
`;

export const MainLayout = styled('div')`
  background-color: ${({theme}) => theme.background};
  color:${({theme}) => theme.body}; ;
  transition: all 0.3s ease;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const StyledWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
