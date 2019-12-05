import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {socket} from "socket";
import {generateDownloadLink} from "services/helpers";
import {addToCompleted} from "actions/app.actions";
import SongAPI from "services/song.api";
import {requestIdSelector} from "reducers/song.reducer";
import {ItemProps, matchSongType} from "../ListItem.types";

export const matchSong = (data: matchSongType, song: matchSongType) => (
  data.requestId === song.requestId && data.videoId === song.videoId
);

export const useSocketEvents = (item: ItemProps) => {
  const {videoId, thumbnail} = item;
  const requestId: string | null = useSelector(requestIdSelector);
  const itemRef = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    src: '',
    pending: true,
    converting: false,
    progress: 0
  });

  const handleSocketEvent = (event: string, action: (data: any) => void) => {
    socket.on(event, (data: any) => {
      if (matchSong(data, {requestId, videoId})) {
        action(data)
      }
    });
  };

  useEffect(() => {
    handleSocketEvent('progress', (data: any) => {
      setState((state) => ({...state, progress: +data.progress}))
    }) ;
    handleSocketEvent('converting', () => {
      setState((state) => ({...state, converting: true}))
    });
    handleSocketEvent('done', async (data: any) => {
      const src: string = generateDownloadLink(data);
      const completedSong = {
        id: data.id,
        title: data.title,
        thumbnail
      };
      setState((state) => ({...state, converting: false, progress: 100, src, pending: false}));
      if (itemRef && itemRef.current) {
        itemRef.current.click();
      }
      dispatch(addToCompleted(completedSong, src));
      await SongAPI.updateSongHistory(completedSong)
    });
  }, []);

  return {
    state,
    itemRef
  }
};
