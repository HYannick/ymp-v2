import {
  addDownloadItem, resetDownloadList,
  resetSongList,
  setLoading,
  setPanelOpen,
  setSearch,
  setSongList
} from "./app.actions";

import {ActionTypes} from "./app.actions.types";

describe('Main actions', () => {
  describe('setLoading Action', () => {
    it('should dispatch setLoading with isLoading to true', () => {
      expect(setLoading(true)).toEqual({
        type: ActionTypes.SET_LOADING,
        isLoading: true
      })
    });
  });

  describe('setPanelOpen Action', () => {
    it('should dispatch setPanelOpen with isOpen to true', () => {
      expect(setPanelOpen(true)).toEqual({
        type: ActionTypes.HANDLE_PANEL_OPENING,
        isOpen: true
      })
    });
  });


  describe('setSongList Action', () => {
    it('should dispatch setSongList with the list', () => {
      const mockList = [
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
      ];

      expect(setSongList(mockList)).toEqual({
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
      })
    });
  });

  describe('addDownloadItem Action', () => {
    it('should dispatch addDownloadItem with the download item', () => {
      expect(addDownloadItem({id: 1, title: 'origami', thumbnail: 'origami.jpg'})).toEqual({
        type: ActionTypes.ADD_DOWNLOAD_ITEM,
        item: {id: 1, title: 'origami', thumbnail: 'origami.jpg'}
      });
    });
  });

  describe('setSearch Action', () => {
    it('should dispatch setSearch action with the query', () => {
      expect(setSearch('okami OST')).toEqual({
        type: ActionTypes.SET_SEARCH,
        query: 'okami OST'
      })
    });
  });

  describe('resetSongList Action', () => {
    it('should dispatch resetSongList action', () => {
      expect(resetSongList()).toEqual({
        type: ActionTypes.RESET_SONG_LIST,
      })
    });
  });
  describe('resetDownloadList Action', () => {
    it('should dispatch resetDownloadList action', () => {
      expect(resetDownloadList()).toEqual({
        type: ActionTypes.RESET_DOWNLOAD_LIST,
      })
    });
  });

});
