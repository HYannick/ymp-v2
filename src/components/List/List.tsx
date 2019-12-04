import React, {Fragment} from 'react';
import {ListItemProps} from "./ListItems";

interface ListProps {
  items: any[],
  onItemClick?: (item: object) => void,
  itemTemplate: React.FC<ListItemProps>
}

const List: React.FC<ListProps> = ({items, onItemClick, children, itemTemplate: ListItem}) => {
  if (!items.length) {
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
  return (
    <Fragment>
      {items.map(item => <ListItem key={item.id} item={item} onItemSelected={() => onItemClick && onItemClick(item)}/>)}
    </Fragment>
  );
};

export default List;
