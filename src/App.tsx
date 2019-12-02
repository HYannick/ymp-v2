/** @jsx jsx */
import React, {useEffect, Fragment, useState} from 'react';
import './App.css';

import {css, Global, jsx} from "@emotion/core";
import localForage from 'localforage';
import Home from 'views/Home';
import {globalStyles} from "./global-styles";
import styled from "@emotion/styled";
import Panel from "./components/Panel";
import usePanel from "./hooks/panel.hooks";
import {useDispatch, useSelector} from "react-redux";
import {songReducerSelector} from "./reducers/song.reducer";
import {revokeURLs} from "./services/helpers";
import LoaderCon from "./core/svg/LoaderCon";
import HistoryIcon from "./core/svg/HistoryIcon";
import ConfigIcon from "./core/svg/ConfigIcon";

import logo from "static/logo.png";
import List from "./components/List/List";
import {setCompletedDownloadList} from "./actions/app.actions";
import Settings from 'panels/Settings';
import HistoryList from "./panels/HistoryList";


export const Logo = styled('img')`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  transform: translateY(1rem);
`;

const Header = styled('div')`
  width: 100%;
  display: flex;
  padding: 0 2rem;
  align-items: center;
  svg {
    width: 3rem;
    height: 3rem;
    path {
      fill: ${({theme}: any) => theme.body}
    }
  }
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
  const {isPanelOpen: historyPanel, openPanel: openHistory, closePanel: closeHistory} = usePanel();
  const {downloads, requestId}: any = useSelector(songReducerSelector);
  const dispatch = useDispatch();
  const [reconMessage, setReconMessage] = useState('');


  useEffect(() => {
    if (!requestId) {
      setTimeout(() => setReconMessage('Unable to connect :(...Try to reopen the app!'), 15000);
    }

    const setDownloadHistory = async() => {
      const history: any[] = await localForage.getItem('songs');
      if(history) {
        return dispatch(setCompletedDownloadList(history))
      }
      return []
    };

    setDownloadHistory();

    return function cleanCache() {
      console.log('cleaning');
      revokeURLs(downloads.cache);
    }
  }, [downloads.cache, requestId]);

  return (
    <MainLayout>
      <Global styles={globalStyles}/>
      {requestId ? (
        <Fragment>
          <Header>
            <div onClick={openHistory}>
              <HistoryIcon/>
            </div>
            <div css={css`flex: 1; text-align: center`}>
              <Logo src={logo}/>
            </div>
            <div onClick={openPanel}>
              <ConfigIcon/>
            </div>
          </Header>
          <Panel isPanelOpen={historyPanel} handleClose={closeHistory} orientation="left" title="History">
            <HistoryList history={downloads.completed}/>
          </Panel>
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
