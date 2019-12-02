/** @jsx jsx */
import React from 'react';
import List from "components/List/List";
import {useDispatch} from "react-redux";
import {DownloadListItem} from "components/List/SongListItem";
import {css, jsx} from "@emotion/core";
import styled from '@emotion/styled';
import DownloadIcon from "core/svg/Download";
import {resetDownloadList} from "../actions/app.actions";

const Wrapper = styled('div')`
  padding: 0 1rem;
`;

const CancelButton = styled('button')`
  border: 0.2rem solid  ${({theme}: any) => theme.body};
  background-color: transparent;
  border-radius: 1rem;
  padding: 1rem 2rem;
`;

const HelperText = styled('div')`
  margin-top: 15rem;
  text-align: center;
  svg {
    width: 6rem;
    height: 6rem;
    opacity: 0.2;
    & > g {
      fill: none;
      stroke: ${({theme}: any) => theme.body};
      transition: stroke 0.3s;
    }
  }
  h4 {
    font-size: 2.5rem;
    font-weight: normal;
    color: ${({theme}: any) => theme.body};
  }
  button {
    border-radius: 1rem 1rem 2rem 2rem;
    text-decoration: none;
    color: ${({theme}: any) => theme.background};
    font-weight: bold;
    text-align: center;
    padding: 1rem 2rem;
    border: none;
    background-color: ${({theme}: any) => theme.body};
  }
`;

const HistoryListItem = ({item: {title, thumbnail}}: any) => (
  <div css={css`display: flex; align-items: center; margin-bottom: 1rem;`}>
    <img src={thumbnail} alt={title} css={css`
        object-fit: cover; 
        width: 5rem; 
        height: 3rem;
        border-radius: 2rem;
        margin-right: 1rem;
        `}/>
    <h5 css={css`flex: 1; margin: 0`}>{title}</h5>
  </div>
);

const HistoryList: React.FC<{ history: any[] }> = ({history}) => {
  return (
    <div css={css`
        margin-top: 2rem;
        padding: 0 1rem;`}>
      <List items={history} itemTemplate={HistoryListItem}
            onItemClick={() => console.log('clicked')}>
        <p css={css`
                  text-align: center;
                      margin-top: 20rem;
                  `}>No history.</p>
      </List>
    </div>
  );
};

export default HistoryList;
