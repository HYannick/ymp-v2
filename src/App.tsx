/** @jsx jsx */
import React, {useEffect, Fragment, useState} from 'react';
import './App.css';

import {css, Global, jsx} from "@emotion/core";

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
import LoaderCon from "./core/svg/LoaderCon";


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

const Loader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center; 
  flex-direction: column;
  font-weight: bold;
  width: 100%; 
  height: 100vh;
  svg {
    width: 9rem;
    height: 9rem;
    stroke: ${({theme}: any) => theme.body};
    margin-bottom: 1.5rem;
  }
`;


const App: React.FC = () => {
  const {isPanelOpen, openPanel, closePanel} = usePanel();
  const {downloads, requestId}: any = useSelector(songReducerSelector);
  const [reconMessage, setReconMessage] = useState('');

  useEffect(() => {
    if (!requestId) {
      setTimeout(() => setReconMessage('Unable to connect :(...Try to reopen the app!'), 8000);
    }
    return function cleanCache() {
      console.log('cleaning');
      revokeURLs(downloads.cache);
    }
  }, [requestId]);

  return (
    <MainLayout>
      <Global styles={globalStyles}/>
      {requestId ? (
        <Fragment>
          <Header>
            <Avatar bgUrl={avatarUrl} onClick={openPanel}/>
          </Header>
          <Panel isPanelOpen={isPanelOpen} handleClose={closePanel} orientation="right" title="Settings">
            <Settings/>
          </Panel>
          <StyledWrapper>
            <Home path="/"/>
          </StyledWrapper>
        </Fragment>
      ) : (
        <Loader>
          <LoaderCon/>
          Connecting...
          <span>{reconMessage}</span>
        </Loader>
      )}

    </MainLayout>
  );
};

export default App;
