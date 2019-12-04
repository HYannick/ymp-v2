import {ActionTypes, DownloadItemTypes, SongItemProps} from "./app.actions.types";
import {HistoryListItemTypes} from "../app/App";

export const setRequestId = (id: string) => ({
  type: ActionTypes.SET_REQUEST_ID,
  id
});

export const setLoading = (isLoading: boolean) => ({
  type: ActionTypes.SET_LOADING,
  isLoading
});

export const setPanelOpen = (isOpen: boolean) => ({
  type: ActionTypes.HANDLE_PANEL_OPENING,
  isOpen
});

export const setSongList = (list: SongItemProps[]) => ({
  type: ActionTypes.SET_SONG_LIST,
  list
});

export const addDownloadItem = (item: DownloadItemTypes) => ({
  type: ActionTypes.ADD_DOWNLOAD_ITEM,
  item
});

export const addToCompleted = (item: DownloadItemTypes, src: string) => ({
  type: ActionTypes.DOWNLOAD_COMPLETE,
  item,
  src
});

export const setCompletedDownloadList = (list: HistoryListItemTypes[]) => ({
  type: ActionTypes.SET_DOWNLOAD_COMPLETE_LIST,
  list
});
export const setSearch = (query: string) => ({
  type: ActionTypes.SET_SEARCH,
  query
});

export const resetSongList = () => ({
  type: ActionTypes.RESET_SONG_LIST,
});

export const resetSearch = () => ({
  type: ActionTypes.RESET_SEARCH,
});

export const resetDownloadList = () => ({
  type: ActionTypes.RESET_DOWNLOAD_LIST,
});

export const resetCompletedDownloads = () => ({
  type: ActionTypes.RESET_COMPLETED_DOWNLOADS,
});


