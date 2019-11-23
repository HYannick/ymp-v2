import {mapSongs} from "./mappers.service";

describe('Mappers', () => {
  describe('mapSongs', () => {
    it('should mapSongs correctly with id, thumbnail, title, and link', () => {
      const apiResult =     [
        {
          "id": "wl9raUArGiw",
          "link": "https://www.youtube.com/watch?v=wl9raUArGiw",
          "kind": "youtube#video",
          "publishedAt": "2017-02-22T01:58:55.000Z",
          "channelId": "UCVBkfxb4xfrBT2uyo0xmuKA",
          "channelTitle": "the_accidental_poet",
          "title": "the_accidental_stream",
          "description": "This impromptu test stream went down on Feb. 21, 2017 evening. I was testing out the OBS software for future streaming. We'll work out the issues and present a ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/wl9raUArGiw/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/wl9raUArGiw/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/wl9raUArGiw/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          }
        },
        {
          "id": "LnxNR_QJw7Q",
          "link": "https://www.youtube.com/watch?v=LnxNR_QJw7Q",
          "kind": "youtube#video",
          "publishedAt": "2017-04-29T20:07:49.000Z",
          "channelId": "UCVBkfxb4xfrBT2uyo0xmuKA",
          "channelTitle": "the_accidental_poet",
          "title": "nothing_to_see_here_III: Tim Schaufert",
          "description": "nothing_to_see_here_III Tim Schaufert: https://soundcloud.com/timschaufert Tim Schaufert & Shwin - Sublime ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/LnxNR_QJw7Q/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/LnxNR_QJw7Q/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/LnxNR_QJw7Q/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          }
        },
        {
          "id": "K7E6UfTENQ4",
          "link": "https://www.youtube.com/watch?v=K7E6UfTENQ4",
          "kind": "youtube#video",
          "publishedAt": "2019-11-21T19:00:03.000Z",
          "channelId": "UCVBkfxb4xfrBT2uyo0xmuKA",
          "channelTitle": "the_accidental_poet",
          "title": "GENES - These Words That I Can&#39;t Get Out",
          "description": "GENES - These Words That I Can't Get Out Support GENES https://soundcloud.com/geneswave https://twitter.com/superisk https://www.instagram.com/superisk/ ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/K7E6UfTENQ4/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/K7E6UfTENQ4/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/K7E6UfTENQ4/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          }
        }
      ];
      expect(mapSongs(apiResult)).toEqual([
        {
          id: "wl9raUArGiw",
          thumbnail:  "https://i.ytimg.com/vi/wl9raUArGiw/mqdefault.jpg",
          title: "the_accidental_stream",
          link: "https://www.youtube.com/watch?v=wl9raUArGiw",
        },
        {
          id: "LnxNR_QJw7Q",
          title:"nothing_to_see_here_III: Tim Schaufert",
          link: "https://www.youtube.com/watch?v=LnxNR_QJw7Q",
          thumbnail: "https://i.ytimg.com/vi/LnxNR_QJw7Q/mqdefault.jpg"
        },
        {
          id: "K7E6UfTENQ4",
          title:"GENES - These Words That I Can&#39;t Get Out",
          link: "https://www.youtube.com/watch?v=K7E6UfTENQ4",
          thumbnail: "https://i.ytimg.com/vi/K7E6UfTENQ4/mqdefault.jpg"
        }
      ])
    });
  });
});
