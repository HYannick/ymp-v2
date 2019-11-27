/** @jsx jsx */
import React, {useEffect} from 'react';
import './App.css';

import {Global, jsx} from "@emotion/core";

import Home, {Avatar} from 'views/Home';
import {globalStyles} from "./global-styles";
import avatarUrl from "./static/avatar-1.png";
import styled from "@emotion/styled";
import Settings from "./components/Settings";
import Panel from "./components/Panel";
import usePanel from "./hooks/panel.hooks";
import {useSelector} from "react-redux";
import {songReducerSelector} from "./reducers/song.reducer";
import {revokeURLs} from "./services/helpers";


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

const StyledWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`;


const App: React.FC = () => {
  const {isPanelOpen, openPanel, closePanel} = usePanel();
  const {downloads}: any = useSelector(songReducerSelector);

  useEffect(() => {
    return function cleanCache() {
      console.log('cleaning');
      revokeURLs(downloads.cache);
    }
  }, []);
  return (
    <MainLayout>
      <Global styles={globalStyles}/>
      <Header>
        <Avatar bgUrl={avatarUrl} onClick={openPanel}/>
      </Header>
      <Panel isPanelOpen={isPanelOpen} handleClose={closePanel} orientation="right" title="Settings">
        <Settings/>
      </Panel>
      <StyledWrapper>
        <Home path="/"/>
      </StyledWrapper>
    </MainLayout>
  );
};

export default App;
