/** @jsx jsx */
import React, {createContext, useState} from 'react';
import './App.css';

import {Global, jsx} from "@emotion/core";

import {IStateProps} from "reducers/song.reducer";

import {Router} from "@reach/router"
import Home, {Avatar} from 'views/Home';
import DownloadList from 'views/DownloadList';
import {globalStyles} from "./global-styles";
import avatarUrl from "./static/avatar-1.png";
import styled from "@emotion/styled";
import Settings from "./components/Settings";
import Panel from "./components/Panel";


export const AppContext = createContext<IStateProps | any>(undefined);

const Header = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const MainLayout = styled('div')`
  background-color: ${({theme}: any) => theme.background};
  color:${({theme}: any) => theme.body}; ;
  transition: all 0.3s ease;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledRouter = styled(Router)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;


const App: React.FC = () => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  return (
    <MainLayout>
      <Global styles={globalStyles}/>
      <Header>
        <Avatar bgUrl={avatarUrl} onClick={() => setPanelOpen(true)}/>
      </Header>
      <Panel isPanelOpen={isPanelOpen} handleClose={() => setPanelOpen(false)}>
        <Settings/>
      </Panel>
      <StyledRouter>
        <Home path="/"/>
        <DownloadList path="/downloads"/>
      </StyledRouter>
    </MainLayout>
  );
};

export default App;
