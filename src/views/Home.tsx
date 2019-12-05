import React, {Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {css} from "@emotion/core";
import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";
import {lighten} from "polished";
import uuid from 'uuid/v4';

import {socket} from "socket";

import Form from "components/Form";
import List from "components/List";
import {HomeListItem} from "components/List/ListItems";
import Panel from "components/Panel";
import DownloadButtonLink from "components/DownloadButtonLink";

import {useGetSongList} from "hooks/use-get-song-list.hook";
import {IStateProps, songReducerSelector} from "reducers/song.reducer";
import {addDownloadItem} from "actions/app.actions";

import usePanel from "hooks/panel.hooks";
import DownloadList from "panels/DownloadList";

import bgFooter from "static/bg-footer.png";

const Footer: any = styled('div')<{ bgUrl: string }>`
  position: relative;
  height: 20rem;
  background: ${({bgUrl}) => `url(${bgUrl}) bottom left no-repeat`};
  background-size: 70%;
  opacity: 0.4;
`;

export const HelperText = styled('p')`
   width: 100%;
   padding: 0 2rem;
   text-align: center;
   font-size: 1.5rem;
   font-weight: bold;
   color: ${({theme}) => lighten(0.3, theme.body)};

`;

const Home: React.FC = () => {
  const {t} = useTranslation();
  const {songList, searchQuery, downloads}: IStateProps = useSelector(songReducerSelector);
  const {isPanelOpen: downloadList, openPanel, closePanel} = usePanel();
  const dispatch = useDispatch();

  const initDownload = (item: any) => {
    socket.emit('start_dl', item.link);
    dispatch(addDownloadItem({...item, id: uuid()}));
  };

  useGetSongList(searchQuery, dispatch);

  return (
    <Fragment>
      <Form/>
      <div css={css`flex: 1; padding: 0 2rem`}>
        <List items={songList} itemTemplate={HomeListItem} onItemClick={initDownload}>
          <HelperText>
            {t('list.helper_text')}
            <br/>
            {t('list.support_text')}
          </HelperText>
        </List>
      </div>
      <Footer bgUrl={bgFooter}/>
      <DownloadButtonLink downloadCount={downloads.pendingCount} onClick={openPanel}/>
      <Panel isPanelOpen={downloadList} handleClose={closePanel} orientation="bottom" title={t('downloads.title')}>
        <DownloadList downloadList={downloads.pending} onClose={closePanel}/>
      </Panel>
    </Fragment>
  );
};

export default Home;
