import {useEffect} from "react";
import {Dispatch} from "redux";
import SongAPI from "services/song.api";
import {setSongList} from "actions/app.actions";
import {mapSongs} from "services/mappers.service";
import {YouTubeSearchResults} from "youtube-search";

export const useGetSongList = (query: string, dispatch: Dispatch) => {
  useEffect(() => {
    const getVideos = async () => {
      try {
        const {results}: {results: YouTubeSearchResults[]} = await SongAPI.getSongList(query, 15);
        dispatch(setSongList(mapSongs(results)))
      } catch (e) {
        console.log(e)
      }
    };
    if (query) {
      getVideos()
    }
   }, [dispatch, query]);
};
