import {ActionTypes} from "../actions/app.actions.types";
import {createSelector} from "reselect";

export interface SongProps {
  id: string
  thumbnail: string,
  title:string,
  link: string,
}

export interface CompletedSongProps {
  success:string,
  requestId:string,
  videoId:string,
  title:string,
  blob: Blob
}

export interface IStateProps {
  requestId: string | null,
  loading: boolean,
  searchQuery: string,
  songList: SongProps[],
  downloads: {
    pending: SongProps[],
    completed: CompletedSongProps[],
    pendingCount: number,
    cache: []
  },
  errors: null,
}

export interface IAction {
  type: ActionTypes;
}

export const initialState: any = {
  requestId: null,
  loading: false,
  searchQuery: '',
  songList: [],
  downloads: {
    pending: [],
    completed: [],
    pendingCount: 0,
    cache: []
  },
  errors: null
};

export const songReducerSelector = (state: {songReducer: IStateProps}) => state.songReducer;

export const requestIdSelector = createSelector(
  [songReducerSelector],
  songReducer => songReducer.requestId
);

export const downloadsSelector = createSelector(
  [songReducerSelector],
  songReducer => songReducer.downloads
);

export const songReducer = (state = initialState, action: any) => {
  const {pending, completed, pendingCount, cache} = state.downloads;
  switch (action.type) {
    case ActionTypes.SET_REQUEST_ID: {
      return {...state, requestId: action.id};
    }
    case ActionTypes.SET_LOADING: {
      return {...state, loading: action.isLoading};
    }
    case ActionTypes.SET_SONG_LIST: {
      return {...state, songList: [...action.list]};
    }
    case ActionTypes.ADD_DOWNLOAD_ITEM: {
      return {
        ...state,
        downloads: {
          ...state.downloads,
          pendingCount: pendingCount + 1,
          pending: [...pending, action.item]
        }
      };
    }
    case ActionTypes.DOWNLOAD_COMPLETE: {
      return {
        ...state,
        downloads: {
          ...state.downloads,
          pendingCount: pendingCount - 1,
          completed: [...completed, action.item],
          cache: [...cache, action.src]
        }
      };
    }
    case ActionTypes.SET_SEARCH: {
      return {...state, searchQuery: action.query};
    }
    case ActionTypes.RESET_SONG_LIST: {
      return {...state, songList: []};
    }
    case ActionTypes.RESET_DOWNLOAD_LIST: {
      return {...state, downloads: {pending: [], completed: []}};
    }
    case ActionTypes.SET_DOWNLOAD_COMPLETE_LIST: {
      return {...state, downloads: {...state.downloads, completed: action.list}};
    }
    default: {
      return state;
    }
  }
};

export default songReducer;

