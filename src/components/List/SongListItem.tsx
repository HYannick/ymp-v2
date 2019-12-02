/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import localForage from 'localforage';
import {transparentize} from "polished";
import {socket} from "socket";
import {useDispatch, useSelector} from "react-redux";
import {requestIdSelector} from "reducers/song.reducer";
import {generateDownloadLink} from "services/helpers";
import {addToCompleted} from "actions/app.actions";
import DownloadLink from "../../core/svg/DownloadLink";
import Spinner from "../../core/svg/Spinner";

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

interface DownloadCardProps {
  Header: any,
  Title: any,
  ProgressBar: any,
  Thumbnail: any,
  Content: any
}

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

DownloadCard.Header = styled('div')<{converting: boolean}>`
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
  }
`;

export interface ListItemProps {
  item: {
    id: string | number,
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

export const DownloadListItem: React.FC<ListItemProps> = ({item: {id, thumbnail, title}, onItemSelected}) => {
  const requestId = useSelector(requestIdSelector);
  const [src, setSrc] = useState('');
  const [pending, setPending] = useState(true);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const matchSong = (eventStatus: any) => eventStatus.requestId === requestId && eventStatus.videoId === id;

  const saveToCompleted = async (song: any) => {
    const savedSongs: any[] = await localForage.getItem('songs') || [];
    const storage = [...savedSongs, song];
    if(storage.length > 30) storage.shift();
    await localForage.setItem('songs', storage);
  };

  useEffect(() => {
    socket.on('progress', (status: any) => {
      if (matchSong(status)) {
        setProgress(+status.progress)
      }
    });

    socket.on('converting', (status: any) => {
      if (matchSong(status)) {
        setConverting(true)
      }
    });

    socket.on('done', async (song: any) => {
      if (matchSong(song)) {
        const src = generateDownloadLink(song);
        setConverting(false);
        setProgress(100);
        setSrc(src);
        setPending(false);
        dispatch(addToCompleted(song, src));
        await saveToCompleted({id: song.id, title: song.title, thumbnail})
      }
    })
  }, []);

  return (
    <div>
      <DownloadCard onClick={onItemSelected}>
        <DownloadCard.Thumbnail bgUrl={thumbnail}/>
        <DownloadCard.Content>
          <DownloadCard.Header converting={converting}>
            <h5 className="title">{title}</h5>
            <h5 className="progress">{converting ? 'Converting...' : `${(progress || 0)}%`}</h5>
          </DownloadCard.Header>
          <DownloadCard.ProgressBar progress={progress}>
            <div/>
          </DownloadCard.ProgressBar>
        </DownloadCard.Content>
        <SongStatus>
          <a href={src || undefined} download={title} aria-disabled={pending}>
            {
              pending ? (
                  <Spinner/>
                ) :
                (
                  <DownloadLink/>
                )
            }
          </a>
        </SongStatus>

      </DownloadCard>

    </div>
  )
}
