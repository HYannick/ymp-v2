import React from 'react';
import List from "components/List/List";
import styled from '@emotion/styled';
import {HistoryListItemTypes} from "app/App";
import {HistoryListItem} from "components/List/ListItems";

const Wrapper = styled('div')`
  margin-top: 2rem;
  padding: 0 1rem;
  overflow-y: scroll;
  height: calc(100% - 10rem);
`;

const HelperText = styled('p')`
  text-align: center;
  margin-top: 20rem;
`;

const HistoryList: React.FC<{ history: HistoryListItemTypes[] }> = ({history}) => {
  return (
    <Wrapper>
      <List items={history} itemTemplate={HistoryListItem}>
        <HelperText>No history.</HelperText>
      </List>
    </Wrapper>
  );
};

export default HistoryList;
