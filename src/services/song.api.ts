import ytSearch from 'youtube-search'

export default class SongAPI {
  static getSongList(query: string, maxResults: number) {
    const options = {
      maxResults,
      type: 'video',
      key: process.env.REACT_APP_YT_API_KEY
    };

    return ytSearch(query, options);
  }
}
