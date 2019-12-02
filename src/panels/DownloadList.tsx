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
  padding: 0 2rem;
  height: calc(100% - 10rem);
  overflow-y: scroll;
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


const DownloadList: React.FC<{ onClose?: any, downloadList: any[] }> = ({onClose, downloadList}) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <List items={downloadList} itemTemplate={DownloadListItem}>
        <HelperText>
          <DownloadIcon/>
          <h4>No pending downloads!</h4>
          <button onClick={onClose}>Go search some songs! ;)</button>
        </HelperText>
      </List>
    </Wrapper>
  );
};

export default DownloadList;
