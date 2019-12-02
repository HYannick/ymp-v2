/** @jsx jsx */
import {css, jsx} from "@emotion/core";
import Form from "components/Form";
import List from "components/List/List";
import bgFooter from "static/bg-footer.png";
import DownloadButtonLink from "components/DownloadButtonLink";
import styled from "@emotion/styled";
import {useGetSongList} from "hooks/use-get-song-list.hook";
import {songReducerSelector} from "reducers/song.reducer";
import {addDownloadItem} from "../actions/app.actions";
import {useDispatch, useSelector} from "react-redux";
import {ListItem} from "components/List/SongListItem";
import {socket} from "socket";
import Panel from "components/Panel";
import usePanel from "hooks/panel.hooks";
import React, { Fragment } from "react";
import DownloadList from "../panels/DownloadList";

export const Avatar = styled('button')<{ bgUrl: string }>`
  display: block;
  cursor: pointer;
  border: none;
  outline: white;
  width: 6rem;
  height: 6rem;
  background: ${({bgUrl}) => `url(${bgUrl}) center center no-repeat`};
  background-size: cover;
`;

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
   font-size: 2rem;
   font-weight: bold;
   color: ${({theme}: any) => theme.body};

`;

const Home: React.FC = () => {
  const {songList, searchQuery, downloads}: any = useSelector(songReducerSelector);
  const {isPanelOpen, openPanel, closePanel} = usePanel();
  const dispatch = useDispatch();

  const initDownload = (item: any) => {
    socket.emit('start_dl', item.link);
    dispatch(addDownloadItem(item));
  };

  useGetSongList(searchQuery, dispatch);
  return (
    <Fragment>
      <Form/>
      <div css={css`flex: 1; padding: 0 2rem`}>
        <List items={songList} itemTemplate={ListItem} onItemClick={initDownload}>
          <HelperText>
            Fill your youtube link
            And let me convert it.
            <br/>
            If you like the song, support the artist, subscribe, like, buy and share ;)
          </HelperText>
        </List>
      </div>
      <Footer bgUrl={bgFooter}/>
      <DownloadButtonLink downloadCount={downloads.pendingCount} onClick={openPanel}/>
      <Panel isPanelOpen={isPanelOpen} handleClose={closePanel} orientation="bottom" title="Pending downloads">
        <DownloadList downloadList={downloads.pending} onClose={closePanel} />
      </Panel>
    </Fragment>
  );
};

export default Home;
