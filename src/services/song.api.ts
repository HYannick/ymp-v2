import ytSearch from 'youtube-search'
import localForage from 'localforage';

export default class SongAPI {
  static getSongList(query: string, maxResults: number) {
    const options = {
      maxResults,
      type: 'video',
      key: process.env.REACT_APP_YT_API_KEY
    };

    return ytSearch(query, options);
  }

  static async updateSongHistory(song: any) {
    const savedSongs: any = await localForage.getItem('songs') || [];
    const storage = [...savedSongs, song];
    return localForage.setItem('songs', storage.length > 30 ? [...storage.shift()] : storage);
  }
}
