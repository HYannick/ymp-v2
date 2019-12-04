/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from "react";
import styled from "@emotion/styled";
import {transparentize} from "polished";
import {socket} from "socket";
import {useDispatch, useSelector} from "react-redux";
import {requestIdSelector} from "reducers/song.reducer";
import {generateDownloadLink} from "services/helpers";
import {addToCompleted} from "actions/app.actions";
import DownloadLink from "core/svg/DownloadLink";
import Spinner from "core/svg/Spinner";
import SongAPI from "services/song.api";
import {useTranslation} from "react-i18next";

const Card = styled('div')`
  width: 100%;
  height: 13rem;
  margin-bottom: 2rem;
  border-radius: 5rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg,rgba(221,214,243,.5),hsla(3,89%,82%,.5));
  transition: 0.3s;
  &:active {
    &:after {
       transform: scaleX(1);
    }
  }
  &:after {
    content: '';
    position: absolute;
    border-radius: 5rem;
    z-index: 2;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: ${({theme}: any) => transparentize(0.8, theme.body)};
    transform-origin: left;
    transform: scaleX(0);
    opacity: 0.5;
    transition: transform 0.4s;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
  }
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 5;
    text-align: center;
    width: 90%;
    color: #333;
    font-size: 2rem;
    font-weight: bold;
    box-shadow: 0 0 30px 5px hsla(0,0%,67%,.5);
    background: hsla(0,0%,100%,.43);
    border-radius: 30px 30px 50px 50px;
    padding: 1rem;
  }
`;

const DownloadCard: any = styled('div')<{ onClick: any }>`
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
  padding-bottom: 1rem;
  border-bottom: 0.1rem solid ${({theme}: any) => transparentize(0.8, theme.body)};
`;

DownloadCard.Content = styled('div')`
  flex: 1;
  margin: 0 1rem;
  position: relative;
`;

DownloadCard.Thumbnail = styled('div')<{ bgUrl: string }>`
  width: 5rem;
  height: 3rem;
  border-radius: 2rem;
  background: ${({bgUrl}) => `url(${bgUrl}) center center no-repeat`};
  background-size: cover;
  box-shadow: ${({theme}: any) => theme.thumbnailShadow};
`;

DownloadCard.Header = styled('div')<{ converting: boolean }>`
  display: flex;
  justify-content: space-between;
  .title {
    white-space: nowrap; 
    max-width: 16rem; 
    overflow: hidden;
    text-overflow: ellipsis; 
    opacity: ${({converting}) => converting ? 0.2 : 1};
    transition: opacity 0.3s;
  }
  .progress {
    position: absolute;
    right: 0;
    background: ${({theme}: any) => theme.background};
    padding-left: 1rem;
  }
  > h5 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: normal;
  }
`;

DownloadCard.ProgressBar = styled('div')<{ progress: string | number }>`
  width: 100%;
  overflow: hidden;
  height: 0.5rem;
  border-radius: 2rem 0.5rem 2rem 0.5rem;
  border: 0.1rem solid ${({theme}: any) => theme.body};
  margin-top: 0.5rem;
  & > div {
    transform: scaleX(${({progress}) => `${+progress / 100}`});
    transform-origin: left;
    height: 100%;
    background-color: ${({theme}: any) => theme.body};
    transition: transform 0.3s;
  }
`;

const SongStatus = styled('div')`
  width: 4rem;
  height: 4rem;
  a {
    background-color: ${({theme}: any) => theme.body};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 4rem;
    position: relative;
    transition: 0.1s;
    &:active {
      transform: translateY(0.6rem);
      &:after {
        box-shadow: 0 0 0 0 rgba(82,82,82,0.5);
      }
    }
    &:after {
      content: '';
      position: absolute;
      border-radius: 4rem;
      top:0;
      left:0;
      right:0;
      bottom:0;
      box-shadow: 0 0.5rem 1rem rgba(82,82,82,0.5);
      opacity: 0.5;
      transition: 0.1s;
      }
    }
    svg {
     width: 2rem;
     height: 2rem;
     fill: none;
     stroke: ${({theme}: any) => theme.background};
    }
  }`;

export interface ListItemProps {
  item: {
    id: string,
    videoId: string | number,
    thumbnail: string
    title: string,
    link: string,
    progress?: string | number
  },
  onItemSelected: any
}

export const ListItem: React.FC<ListItemProps> = ({item: {thumbnail, title}, onItemSelected}) => {
  return (
    <Card onClick={onItemSelected}>
      <img src={thumbnail} alt={title}/>
      <p>{title}</p>
    </Card>
  )
};

export const HistoryListItem = ({item: {title, thumbnail}}: { item: { title: string, thumbnail: string } }) => {
  const Card = styled('div')`
    display: flex; 
    align-items: center;
    margin-bottom: 1rem;
    img {
      object-fit: cover; 
      width: 5rem; 
      height: 3rem;
      border-radius: 2rem;
      margin-right: 1rem;
    }
    p {
      flex: 1; 
      margin: 0;
    }
  `;

  return (
    <Card>
      <img src={thumbnail} alt={title}/>
      <p>{title}</p>
    </Card>
  );
};

interface matchSongType {
  requestId: string | null,
  videoId: string | number
}

export const matchSong = (data: matchSongType, song: matchSongType) => (
  data.requestId === song.requestId && data.videoId === song.videoId
);

export const DownloadListItem: React.FC<ListItemProps> = ({item: {videoId, thumbnail, title}, onItemSelected}) => {
  const requestId = useSelector(requestIdSelector);
  const itemRef = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [{src, pending, converting, progress}, setState] = useState({
    src: '',
    pending: true,
    converting: false,
    progress: 0
  });


  useEffect(() => {
    socket.on('progress', (data: any) => {
      if (matchSong(data, {requestId, videoId})) {
        setState((state) => ({...state, progress: +data.progress}));
      }
    });

    socket.on('converting', (data: any) => {
      if (matchSong(data, {requestId, videoId})) {
        setState((state) => ({...state, converting: true}));
      }
    });

    socket.on('done', async (data: any) => {
      if (matchSong(data, {requestId, videoId})) {
        const src: string = generateDownloadLink(data);
        const completedSong = {
          id: data.id,
          title: data.title,
          thumbnail
        };
        setState((state) => ({...state, converting: false, progress: 100, src, pending: false}));
        if(itemRef && itemRef.current) {
          itemRef.current.click();
        }
        dispatch(addToCompleted(completedSong, src));
        await SongAPI.updateSongHistory(completedSong)
      }
    })
  }, []);

  return (
    <DownloadCard onClick={onItemSelected}>
      <DownloadCard.Thumbnail bgUrl={thumbnail}/>
      <DownloadCard.Content>
        <DownloadCard.Header converting={converting}>
          <h5 className="title">{title}</h5>
          <h5 className="progress">{converting ? t('downloads.convert') : `${(progress || 0)}%`}</h5>
        </DownloadCard.Header>
        <DownloadCard.ProgressBar progress={progress}>
          <div/>
        </DownloadCard.ProgressBar>
      </DownloadCard.Content>
      <SongStatus>
        <a href={src || undefined} download={title} aria-disabled={pending} ref={itemRef}>
          {pending ? (<Spinner/>) : (<DownloadLink/>)}
        </a>
      </SongStatus>
    </DownloadCard>
  )
};
