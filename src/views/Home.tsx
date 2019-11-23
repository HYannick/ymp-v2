/** @jsx jsx */
import {createContext, useReducer} from 'react';
import {css, jsx} from "@emotion/core";
import Form from "components/Form";
import List from "components/List";
import bgFooter from "static/bg-footer.png";
import DownloadButtonLink from "components/DownloadButtonLink";
import styled from "@emotion/styled";
import {useGetSongList} from "hooks/use-get-song-list.hook";
import songReducer, {initialState} from "reducers/song.reducer";
import {IStateProps} from "reducers/song.reducer";


const Logo = styled('div')`
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
`;

export const Avatar = styled('button')<{ bgUrl: string }>`
  display: block;
  cursor: pointer;
  border: none;
  outline: white;
  width: 6rem;
  height: 6rem;
  background: ${({bgUrl}) => `url(${bgUrl}) center center no-repeat`};
  background-size: cover;
`;

const Footer: any = styled('div')<{ bgUrl: string }>`
  position: relative;
  height: 33rem;
  background: ${({bgUrl}) => `url(${bgUrl}) -15rem top no-repeat`};
  background-size: auto 100%;
  opacity: 0.2;
`;

const HelperText = styled('p')`
   width: 100%;
   padding: 0 2rem;
   text-align: center;
   font-size: 2rem;
   font-weight: bold;
   color: ${({theme}: any) => theme.body};

`;


export const SongContext = createContext<IStateProps | any>(undefined);

const Home = () => {
  const [state, dispatch] = useReducer(songReducer, initialState);
  const {songList, searchQuery, downloadList} = state;
  useGetSongList(searchQuery, dispatch);
  return (
    <SongContext.Provider value={{state, dispatch}}>
        <Logo>YmP</Logo>
        <Form/>
        <div css={css`flex: 1; padding: 0 2rem`}>
          <List items={songList}>
            <HelperText>
              Fill your youtube link
              And let me convert it.
              <br/>
              If you like the song, support the artist, subscribe, like, buy and share ;)
            </HelperText>
          </List>
        </div>
        <Footer bgUrl={bgFooter}/>
        <DownloadButtonLink downloadCount={downloadList.length}/>
    </SongContext.Provider>
  );
};

export default Home;
