import React, {useState} from 'react'
import styled from "@emotion/styled";
import SearchIcon from "core/svg/Search";
import {resetSongList, setSearch} from "actions/app.actions";
import {transitions} from "polished";
import CloseIcon from 'core/svg/CloseIcon';
import {useDispatch} from "react-redux";

const Wrapper = styled('form')<{ onSubmit: any }>`
  height: 15rem;
  padding: 0 2rem;
  p {
    font-size: 2 rem;
    text-align: center;
    font-weight: 500;
  }
  & > div {
    display: flex;
    height: 6rem;
    width: 100%;
    border-radius: 2rem 2rem 5rem 5rem;
    border: 0.4rem solid ${({theme}: any) => theme.borderColor};
    overflow: hidden;
    position: relative;
  }
  
  input {
    height: 100%;
    border: none;
    background: transparent;
    outline: white;
    padding-left: 2rem;
    padding-right: 4rem;
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

const Button = styled('button')<{ hasQuery: boolean }>`
  position: absolute;
  right: 0;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  width: 6.5rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  z-index: 0;
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    transform-origin: right;
    background-color: ${({theme}: any) => theme.body};
    transform: ${({hasQuery}) => hasQuery ? 'scaleX(1)' : 'scaleX(0)'};
    opacity: 1;
    ${({theme}: any) => transitions(['transform'], `0.5s ${theme.cubicEase}`)};
  }
  & > svg {
    width: 2.5rem;
    height: 2.5rem;
    path {
      fill: none;
      stroke: ${({hasQuery, theme}: any) => hasQuery ? theme.background : theme.body};
      ${({theme}: any) => transitions(['stroke'], `0.5s ${theme.cubicEase}`)};
    }
  }
`;

const EmptyInputButton = styled('button')<{ hasQuery: boolean }>`
  position: absolute;
  right: 6.5rem;
  top: 0;
  bottom: 0;
  width: 4rem;
  background-color: transparent;
  border: none;
  outline: white;
  cursor: pointer;
  opacity: 1;
  transform: ${({hasQuery}: any) => hasQuery ? 'translateY(0)' : 'translateY(4.5rem)'};
  ${({theme}: any) => transitions(['transform'], `0.5s ${theme.cubicEase}`)};
  svg {
   width: 2rem;
   height: 2rem;
   path {
    stroke: ${({theme}: any) => theme.body};
   }
  }
`;
const Form: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const handleChange = (e: any) => setQuery(e.target.value);
  const submitSearch = (e: any) => {
    e.preventDefault();
    dispatch(setSearch(query));
    if (!query) {
      dispatch(resetSongList());
    }
  };
  const resetSearch = () => {
    setQuery('');
    dispatch(setSearch(''));
  };
  return (
    <Wrapper onSubmit={submitSearch}>
      <p>What can I convert for you?</p>
      <div>
        <input type="text" value={query} placeholder="Video ID, Song name..." onChange={handleChange}/>
        <EmptyInputButton type="reset" onClick={resetSearch} hasQuery={query.length !== 0}>
          <CloseIcon/>
        </EmptyInputButton>
        <Button type="submit" hasQuery={query.length !== 0}>
          <SearchIcon/>
        </Button>
      </div>
    </Wrapper>
  )
};

export default Form
