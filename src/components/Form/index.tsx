import React from 'react'
import SearchIcon from "core/svg/Search";
import CloseIcon from 'core/svg/CloseIcon';
import {useTranslation} from "react-i18next";
import { useFormEvents } from './hooks/use-form-events';
import {Button, EmptyInputButton, Wrapper} from "./Form.style";


const Form: React.FC = () => {
  const {t} = useTranslation();
  const {query, handleChange, resetSearch, submitSearch} = useFormEvents();

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
