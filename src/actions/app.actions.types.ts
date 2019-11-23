export enum ActionTypes {
  SET_LOADING = 'SET_LOADING',
  HANDLE_PANEL_OPENING = 'HANDLE_PANEL_OPENING',
  SET_SONG_LIST = 'SET_SONG_LIST',
  ADD_DOWNLOAD_ITEM = 'ADD_DOWNLOAD_ITEM',
  SET_SEARCH = 'SET_SEARCH',
  RESET_SEARCH = 'RESET_SEARCH',
  RESET_SONG_LIST = 'RESET_SONG_LIST',
  RESET_DOWNLOAD_LIST = 'RESET_DOWNLOAD_LIST',
}

export interface SongItemProps {
  id: string | number,
  thumbnail: string,
  title: string,
  link: string
}

export interface DownloadItemTypes {
  id: string | number,
  thumbnail: string,
  title: string,
}
