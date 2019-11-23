export const mapSongs = (songs: any[]) => songs.map(({id, thumbnails, title, link}: any) => ({
  id,
  thumbnail: thumbnails.medium.url,
  title,
  link
}));
