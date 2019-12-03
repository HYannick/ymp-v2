/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";


import {css, Global} from "@emotion/core";
import localForage from 'localforage';

import {globalStyles} from "global-styles";
import './App.css';

import HistoryIcon from "core/svg/HistoryIcon";
import ConfigIcon from "core/svg/ConfigIcon";

import Panel from "components/Panel";
import WithRequestId from "components/WithRequestId";
import Settings from 'panels/Settings';
import HistoryList from "panels/HistoryList";
import usePanel from "hooks/panel.hooks";
import Home from 'views/Home';
import {revokeURLs} from "services/helpers";


import {songReducerSelector} from "reducers/song.reducer";
import {setCompletedDownloadList} from "actions/app.actions";


import logo from "static/logo.png";

import {Header, Logo, MainLayout, StyledWrapper} from 'app/App.style';
import {useTranslation} from "react-i18next";

export interface HistoryListItemTypes {
  id: string,
  title: string,
  thumbnail: string
}

const App: React.FC = () => {
  const {t} = useTranslation();
  const {isPanelOpen, openPanel, closePanel} = usePanel();
  const {isPanelOpen: historyPanel, openPanel: openHistory, closePanel: closeHistory} = usePanel();
  const {downloads, requestId}: any = useSelector(songReducerSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const setDownloadHistory = async () => {
      const history: HistoryListItemTypes[] = await localForage.getItem('songs');
      if (history) {
        return dispatch(setCompletedDownloadList(history))
      }
      return []
    };

    setDownloadHistory();

    return function cleanCache() {
      console.log('cleaning');
      revokeURLs(downloads.cache);
    }
  }, [requestId]);


  return (
    <MainLayout>
      <Global styles={globalStyles}/>
      <WithRequestId>
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
        <Panel isPanelOpen={historyPanel} handleClose={closeHistory} orientation="left" title={t('history.title')}>
          <HistoryList history={downloads.completed}/>
        </Panel>
        <Panel isPanelOpen={isPanelOpen} handleClose={closePanel} orientation="right" title={t('settings.title')}>
          <Settings/>
        </Panel>
        <StyledWrapper>
          <Home/>
        </StyledWrapper>
      </WithRequestId>
    </MainLayout>
  );
};

export default App;
