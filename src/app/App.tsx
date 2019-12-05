import React from 'react';
import {css, Global} from "@emotion/core";

import {globalStyles} from "global-styles";
import './App.css';

import HistoryIcon from "core/svg/HistoryIcon";
import ConfigIcon from "core/svg/ConfigIcon";

import Panel from "components/Panel";
import WithRequestId from "components/WithRequestId";
import Settings from 'panels/Settings';
import HistoryList from "panels/HistoryList";
import Home from 'views/Home';


import logo from "static/logo.png";

import {Header, Logo, MainLayout, StyledWrapper} from 'app/App.style';
import {useTranslation} from "react-i18next";
import {useSetupApp} from "./hooks/use-setup-app";

export interface HistoryListItemTypes {
  id: string,
  title: string,
  thumbnail: string
}

const App: React.FC = () => {
  const {t} = useTranslation();

  const {
    historyPanel,
    openHistory,
    closeHistory,
    settingsPanel,
    openSettings,
    closeSettings,
    downloads
  } = useSetupApp();


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
          <div onClick={openSettings}>
            <ConfigIcon/>
          </div>
        </Header>
        <Panel isPanelOpen={historyPanel} handleClose={closeHistory} orientation="left" title={t('history.title')}>
          <HistoryList history={downloads.completed}/>
        </Panel>
        <Panel isPanelOpen={settingsPanel} handleClose={closeSettings} orientation="right" title={t('settings.title')}>
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
