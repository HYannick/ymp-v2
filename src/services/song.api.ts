import ytSearch from 'youtube-search'
import localForage from 'localforage';
import {HistoryListItemTypes} from "../app/App";

export default class SongAPI {
  static getSongList(query: string, maxResults: number) {
    const options = {
      maxResults,
      type: 'video',
      key: process.env.REACT_APP_YT_API_KEY
    };

    return ytSearch(query, options);
  }

  static async updateSongHistory(song: HistoryListItemTypes) {
    const savedSongs: HistoryListItemTypes[] = await localForage.getItem('songs') || [];
    const storage: any[] = [...savedSongs, song];
    return localForage.setItem('songs', storage.length > 30 ? [...storage.shift()] : storage);
  }
  static async clearSongHistory() {
    return await localForage.removeItem('songs');
  }
}
