import {ActionTypes} from "actions/app.actions.types";
import appReducer, {initialState} from "./song.reducer";

describe('appReducer', () => {
  it('should set loading to true', () => {
    expect(appReducer(initialState, {
      type: ActionTypes.SET_LOADING,
      isLoading: true
    })).toEqual({
      loading: true,
      searchQuery: '',
      isPanelOpen: false,
      errors: null,
      songList: [],
      downloadList: [],
    })
  });

  it('should set isPanel Open to true', () => {
    expect(appReducer(initialState, {
      type: ActionTypes.HANDLE_PANEL_OPENING,
      isOpen: true
    })).toEqual({
      loading: false,
      searchQuery: '',
      isPanelOpen: true,
      errors: null,
      songList: [],
      downloadList: [],
    })
  });

  it('should append list to songList', () => {
    expect(appReducer(initialState, {
      type: ActionTypes.SET_SONG_LIST,
      list: [
        {
          id: 'deo-peao',
          thumbnail: 'fomh.jpg',
          title: 'fomh',
          link: 'yt-fomh.com'
        },
        {
          id: 'ddaeo-pveao',
          thumbnail: 'anapurna.jpg',
          title: 'anapurna',
          link: 'yt-anapurna.com'
        }
      ]
    })).toEqual({
      loading: false,
      searchQuery: '',
      isPanelOpen: false,
      errors: null,
      songList: [
        {
          id: 'deo-peao',
          thumbnail: 'fomh.jpg',
          title: 'fomh',
          link: 'yt-fomh.com'
        },
        {
          id: 'ddaeo-pveao',
          thumbnail: 'anapurna.jpg',
          title: 'anapurna',
          link: 'yt-anapurna.com'
        }
      ],
      downloadList: [],
    });
  });

  it('should append downloadItem to downloadList', () => {
    const state = {
      ...initialState,
      downloadList: [
        {
          id: 'ddaeo-pveao',
          thumbnail: 'anapurna.jpg',
          title: 'anapurna',
          link: 'yt-anapurna.com'
        }
      ],
    };
    expect(appReducer(state, {
      type: ActionTypes.ADD_DOWNLOAD_ITEM,
      item: {
        id: 'deo-peao',
        thumbnail: 'fomh.jpg',
        title: 'fomh',
        link: 'yt-fomh.com'
      }
    })).toEqual({
      loading: false,
      searchQuery: '',
      isPanelOpen: false,
      errors: null,
      songList: [],
      downloadList: [
        {
          id: 'ddaeo-pveao',
          thumbnail: 'anapurna.jpg',
          title: 'anapurna',
          link: 'yt-anapurna.com'
        },
        {
          id: 'deo-peao',
          thumbnail: 'fomh.jpg',
          title: 'fomh',
          link: 'yt-fomh.com'
        }
      ],
    });
  });

  it('should store search', () => {
    expect(appReducer(initialState, {
      type: ActionTypes.SET_SEARCH,
      query: 'anapurna'
    })).toEqual({
      loading: false,
      searchQuery: 'anapurna',
      isPanelOpen: false,
      errors: null,
      songList: [],
      downloadList: [],
    });
  });

  it('should reset song list to []', () => {
    const state = {
      ...initialState,
      songList: [
        {
          id: 'deo-peao',
          thumbnail: 'fomh.jpg',
          title: 'fomh',
          link: 'yt-fomh.com'
        },
        {
          id: 'ddaeo-pveao',
          thumbnail: 'anapurna.jpg',
          title: 'anapurna',
          link: 'yt-anapurna.com'
        }
      ]
    };
    expect(appReducer(state, {
      type: ActionTypes.RESET_SONG_LIST,
    })).toEqual({
      loading: false,
      searchQuery: '',
      isPanelOpen: false,
      errors: null,
      songList: [],
      downloadList: [],
    });
  });

  it('should reset download list to []', () => {
    const state = {
      ...initialState,
      downloadList: [
        {
          id: 'deo-peao',
          thumbnail: 'fomh.jpg',
          title: 'fomh',
          link: 'yt-fomh.com'
        },
        {
          id: 'ddaeo-pveao',
          thumbnail: 'anapurna.jpg',
          title: 'anapurna',
          link: 'yt-anapurna.com'
        }
      ]
    };
    expect(appReducer(state, {
      type: ActionTypes.RESET_DOWNLOAD_LIST,
    })).toEqual({
      loading: false,
      searchQuery: '',
      isPanelOpen: false,
      errors: null,
      songList: [],
      downloadList: [],
    });
  });
});


