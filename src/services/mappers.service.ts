import uuid from "uuid/v4";
import {YouTubeSearchResults} from "youtube-search";

export const mapSongs = (songs: YouTubeSearchResults[]) => songs.map(({id, thumbnails, title, link}: any) => ({
  id: uuid(),
  videoId: id,
  thumbnail: thumbnails.medium.url,
  title,
  link
}));
