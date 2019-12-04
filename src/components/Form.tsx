import React, {FormEvent, useState} from 'react'
import styled from "@emotion/styled";
import SearchIcon from "core/svg/Search";
import {resetSongList, setSearch} from "actions/app.actions";
import {transitions} from "polished";
import CloseIcon from 'core/svg/CloseIcon';
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

const Wrapper = styled('form')<{ onSubmit: (event: FormEvent) => void }>`
  height: 15rem;
  padding: 0 2rem;
  margin-top: 6rem;
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
    border: 0.4rem solid ${({theme}: any) => theme.body};
    overflow: hidden;
    position: relative;
  }
  
  input {
    height: 100%;
    border: none;
    background: transparent;
    outline: white;
    color: ${({theme}: any) => theme.body};
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
  const {t} = useTranslation();
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
      <p>{t('search.intro')}</p>
      <div>
        <input type="text" value={query} placeholder={t('search.placeholder')} onChange={handleChange}/>
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
