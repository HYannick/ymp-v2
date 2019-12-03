import uuid from "uuid/v4";

export const mapSongs = (songs: any[]) => songs.map(({id, thumbnails, title, link}: any) => ({
  id: uuid(),
  videoId: id,
  thumbnail: thumbnails.medium.url,
  title,
  link
}));
