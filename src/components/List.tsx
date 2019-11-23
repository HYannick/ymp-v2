import React, {Fragment} from 'react';
import styled from "@emotion/styled";


const Card = styled('div')`
  width: 100%;
  height: 15rem;
  margin-bottom: 2rem;
  overflow: hidden;
  border-radius: 5rem;
  position: relative;
  background: linear-gradient(90deg,rgba(221,214,243,.5),hsla(3,89%,82%,.5));
  box-shadow: ${({theme}: any) => theme.boxShadow};
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

export interface ListItemProps {
  card: {
    thumbnail: string
    title: string,
    link: string
  }
}

const ListItem: React.FC<ListItemProps> = ({card: {thumbnail, title, link}}) => {
  return (
    <Card onClick={() => console.log(link)}>
      <img src={thumbnail} alt={title}/>
      <p>{title}</p>
    </Card>
  )
};

const List: React.FC<{ items: any[] }> = ({items, children}) => {
  if (!items.length) {
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
  return (
    <Fragment>
      {items.map(item => <ListItem key={item.id} card={item}/>)}
    </Fragment>
  );
};

export default List;
