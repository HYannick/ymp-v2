import {ActionTypes} from "actions/app.actions.types";
import songReducer, {initialState} from "./song.reducer";

describe('songReducer', () => {
  it('should set requestId', () => {
    expect(songReducer(initialState, {
      type: ActionTypes.SET_REQUEST_ID,
      id: 'fomh-id'
    })).toEqual({
      requestId: 'fomh-id',
      loading: false,
      searchQuery: '',
      errors: null,
      songList: [],
      downloads: {
        pending: [],
        completed: [],
        pendingCount: 0,
        cache: []
      },
    })
  });

  it('should set loading to true', () => {
    expect(songReducer(initialState, {
      type: ActionTypes.SET_LOADING,
      isLoading: true
    })).toEqual({
      requestId: null,
      loading: true,
      searchQuery: '',
      errors: null,
      songList: [],
      downloads: {
        pending: [],
        completed: [],
        pendingCount: 0,
        cache: []
      },
    })
  });

  it('should set isPanel Open to true', () => {
    expect(songReducer(initialState, {
      type: ActionTypes.HANDLE_PANEL_OPENING,
      isOpen: true
    })).toEqual({
      requestId: null,
      loading: false,
      searchQuery: '',
      errors: null,
      songList: [],
      downloads: {
        pending: [],
        completed: [],
        pendingCount: 0,
        cache: []
      },
    })
  });

  it('should append list to songList', () => {
    expect(songReducer(initialState, {
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
      requestId: null,
      loading: false,
      searchQuery: '',

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
      downloads: {
        pending: [],
        completed: [],
        pendingCount: 0,
        cache: []
      }
    });
  });

  it('should append downloadItem to downloads and increment pending count', () => {
    const state = {
      ...initialState,
      downloads: {
        pending:  [
          {
            id: 'ddaeo-pveao',
            thumbnail: 'anapurna.jpg',
            title: 'anapurna',
            link: 'yt-anapurna.com'
          }
        ],
        completed: [],
        pendingCount: 0,
        cache: []
      },
    };
    expect(songReducer(state, {
      type: ActionTypes.ADD_DOWNLOAD_ITEM,
      item: {
        id: 'deo-peao',
        thumbnail: 'fomh.jpg',
        title: 'fomh',
        link: 'yt-fomh.com'
      }
    })).toEqual({
      requestId: null,
      loading: false,
      searchQuery: '',
      errors: null,
      songList: [],
      downloads: {
        pending: [
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
        completed: [],
        pendingCount: 1,
        cache: []
      },
    });
  });

  it('should store search', () => {
    expect(songReducer(initialState, {
      type: ActionTypes.SET_SEARCH,
      query: 'anapurna'
    })).toEqual({
      requestId: null,
      loading: false,
      searchQuery: 'anapurna',
      errors: null,
      songList: [],
      downloads: {
        pending: [],
        completed: [],
        pendingCount: 0,
        cache: []
      }
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
    expect(songReducer(state, {
      type: ActionTypes.RESET_SONG_LIST,
    })).toEqual({
      requestId: null,
      loading: false,
      searchQuery: '',
      errors: null,
      songList: [],
      downloads: {
        pending: [],
        completed: [],
        pendingCount: 0,
        cache: []
      },
    });
  });

  it('should reset download list to []', () => {
    const state = {
      ...initialState,
      downloads: {
        pending: [
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
        completed: [],
        pendingCount: 0,
        cache: []
      }
    };
    expect(songReducer(state, {
      type: ActionTypes.RESET_DOWNLOAD_LIST,
    })).toEqual({
      requestId: null,
      loading: false,
      searchQuery: '',
      errors: null,
      songList: [],
      downloads: {
        pending: [],
        completed: [],
        pendingCount: 0,
        cache: []
      },
    });
  });
});


