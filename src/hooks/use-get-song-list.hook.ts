import {useEffect} from "react";
import SongAPI from "services/song.api";
import {setSongList} from "actions/app.actions";
import {mapSongs} from "services/mappers.service";

export const useGetSongList = (query: string, dispatch: any) => {
  useEffect(() => {
    const getVideos = async () => {
      try {
        const {results} = await SongAPI.getSongList(query, 15);
        dispatch(setSongList(mapSongs(results)))
      } catch (e) {
        console.log(e)
      }
    };
    if (query) {
      getVideos()
    }
  }, [query, dispatch]);
};
