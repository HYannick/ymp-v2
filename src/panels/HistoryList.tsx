import React, {Fragment} from 'react';
import List from "components/List";
import styled from '@emotion/styled';
import {HistoryListItemTypes} from "app/App";
import {HistoryListItem} from "components/List/ListItems";
import Button from "../components/Button";
import SongAPI from "../services/song.api";
import {useDispatch} from "react-redux";
import {resetCompletedDownloads} from "../actions/app.actions";
import {useTranslation} from "react-i18next";

const Wrapper = styled('div')`
  padding: 0 1rem;
  overflow-y: scroll;
  height: calc(100% - 6rem);
  padding-bottom: 6rem;
`;

const HelperText = styled('p')`
  text-align: center;
  margin-top: 20rem;
`;

const ButtonWithRadius = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 2rem 2rem 0 0;
`;

const HistoryList: React.FC<{ history: HistoryListItemTypes[] }> = ({history}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const cleanHistory = async () => {
    dispatch(resetCompletedDownloads());
    await SongAPI.clearSongHistory();
  };
  return (
    <Fragment>
      <Wrapper>
        <List items={history} itemTemplate={HistoryListItem}>
          <HelperText>{t('history.no_history')}</HelperText>
        </List>
      </Wrapper>
      <ButtonWithRadius onClick={cleanHistory}>{t('history.clear')}</ButtonWithRadius>
    </Fragment>
  );
};

export default HistoryList;
