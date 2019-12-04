/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import uuid from 'uuid/v4'
import Form from "components/Form";
import List from "components/List/List";
import bgFooter from "static/bg-footer.png";
import DownloadButtonLink from "components/DownloadButtonLink";
import styled from "@emotion/styled";
import {useGetSongList} from "hooks/use-get-song-list.hook";
import {IStateProps, songReducerSelector} from "reducers/song.reducer";
import {addDownloadItem} from "../actions/app.actions";
import {useDispatch, useSelector} from "react-redux";
import {ListItem} from "components/List/ListItems";
import {socket} from "socket";
import Panel from "components/Panel";
import usePanel from "hooks/panel.hooks";
import React, { Fragment } from "react";
import DownloadList from "panels/DownloadList";
import {useTranslation} from "react-i18next";
import {lighten} from "polished";

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
   color: ${({theme}: any) => lighten(0.3, theme.body)};

`;

const Home: React.FC = () => {
  const {t} = useTranslation();
  const {songList, searchQuery, downloads}: IStateProps = useSelector(songReducerSelector);
  const {isPanelOpen, openPanel, closePanel} = usePanel();
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
        <List items={songList} itemTemplate={ListItem} onItemClick={initDownload}>
          <HelperText>
            {t('list.helper_text')}
            <br />
            {t('list.support_text')}
          </HelperText>
        </List>
      </div>
      <Footer bgUrl={bgFooter}/>
      <DownloadButtonLink downloadCount={downloads.pendingCount} onClick={openPanel}/>
      <Panel isPanelOpen={isPanelOpen} handleClose={closePanel} orientation="bottom" title={t('downloads.title')}>
        <DownloadList downloadList={downloads.pending} onClose={closePanel} />
      </Panel>
    </Fragment>
  );
};

export default Home;
