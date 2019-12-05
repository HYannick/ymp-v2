/** @jsx jsx */
import React from 'react';
import List from "components/List";
import {DownloadListItem} from "components/List/ListItems";
import {jsx} from "@emotion/core";
import styled from '@emotion/styled';
import DownloadIcon from "core/svg/Download";
import {useTranslation} from "react-i18next";
import {SongItemProps} from "../actions/app.actions.types";

const Wrapper = styled('div')`
  padding: 0 2rem;
  height: calc(100% - 12rem);
  overflow-y: scroll;
`;

const HelperText = styled('div')`
  margin-top: 15rem;
  text-align: center;
  svg {
    width: 6rem;
    height: 6rem;
    opacity: 0.2;
    & > g {
      fill: none;
      stroke: ${({theme}) => theme.body};
      transition: stroke 0.3s;
    }
  }
  h4 {
    font-size: 2.5rem;
    font-weight: normal;
    color: ${({theme}) => theme.body};
  }
  button {
    border-radius: 1rem 1rem 2rem 2rem;
    text-decoration: none;
    color: ${({theme}) => theme.background};
    font-weight: bold;
    text-align: center;
    padding: 1rem 2rem;
    border: none;
    background-color: ${({theme}) => theme.body};
  }
`;


const DownloadList: React.FC<{ onClose?: () => void, downloadList: SongItemProps[] }> = ({onClose, downloadList}) => {
  const {t} = useTranslation();
  return (
    <Wrapper>
      <List items={downloadList} itemTemplate={DownloadListItem}>
        <HelperText>
          <DownloadIcon/>
          <h4>{t('downloads.no_dl')}</h4>
          <button onClick={onClose}>{t('downloads.redirect')}</button>
        </HelperText>
      </List>
    </Wrapper>
  );
};

export default DownloadList;
