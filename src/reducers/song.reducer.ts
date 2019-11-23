import React from "react";
import {ActionTypes} from "../actions/app.actions.types";



export interface IStateProps {
  loading: boolean,
  searchQuery: string,
  songList: any[],
  downloadList: any[],
  errors: null,
}

export interface IAction {
  type: ActionTypes;
}

export const initialState: IStateProps = {
  loading: false,
  searchQuery: '',
  songList: [],
  downloadList: [],
  errors: null
};


export const songReducer : React.Reducer<IStateProps, IAction | any> = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING: {
      return { ...state, loading: action.isLoading };
    }
    case ActionTypes.SET_SONG_LIST: {
      return { ...state, songList:[...action.list] };
    }
    case ActionTypes.ADD_DOWNLOAD_ITEM: {
      return { ...state, downloadList: [...state.downloadList, action.item] };
    }
    case ActionTypes.SET_SEARCH: {
      return { ...state, searchQuery: action.query };
    }
    case ActionTypes.RESET_SONG_LIST: {
      return { ...state, songList: [] };
    }
    case ActionTypes.RESET_DOWNLOAD_LIST: {
      return { ...state, downloadList: [] };
    }
    default: {
      return state;
    }
  }
};

export default songReducer;

