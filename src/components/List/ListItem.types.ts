export interface ItemProps {
  id: string,
  videoId: string | number,
  thumbnail: string
  title: string,
  link: string,
  progress?: string | number
}

export interface HistoryListItemProps {
  item: {
    title: string,
    thumbnail: string
  },
  onItemSelected: () => void
}

export interface ListItemProps {
  item: ItemProps,
  onItemSelected: () => void
}

export interface matchSongType {
  requestId: string | null,
  videoId: string | number
}
