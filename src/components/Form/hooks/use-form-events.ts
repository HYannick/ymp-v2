import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {resetSongList, setSearch} from "actions/app.actions";

export const useFormEvents = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const submitSearch = (e: React.FormEvent<Element>) => {
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

  return {
    query,
    handleChange,
    submitSearch,
    resetSearch
  }
};
