import React from "react";
import DownloadLink from "core/svg/DownloadLink";
import Spinner from "core/svg/Spinner";
import {useTranslation} from "react-i18next";
import {HistoryListItemProps, ListItemProps} from "./ListItem.types";
import {DownloadCard, HistoryCard, HomeCard, SongStatus} from "./ListItem.style";
import {useSocketEvents} from "./hooks/use-socket-events";

export const HomeListItem: React.FC<ListItemProps> = ({item: {thumbnail, title}, onItemSelected}) => (
  <HomeCard onClick={onItemSelected}>
    <img src={thumbnail} alt={title}/>
    <p>{title}</p>
  </HomeCard>
);

export const HistoryListItem: React.FC<HistoryListItemProps> = ({item: {title, thumbnail}}) => (
  <HistoryCard>
    <img src={thumbnail} alt={title}/>
    <p>{title}</p>
  </HistoryCard>
);


export const DownloadListItem: React.FC<ListItemProps> = ({item, onItemSelected}) => {
  const {thumbnail, title} = item;
  const {state: {converting, progress, src, pending}, itemRef} = useSocketEvents(item);
  const {t} = useTranslation();

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
