import React, {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IStateProps, songReducerSelector} from "reducers/song.reducer";
import LoaderCon from "core/svg/LoaderCon";
import {css} from "@emotion/core";
import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";


export const Loader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center; 
  flex-direction: column;
  font-weight: bold;
  width: 100%; 
  height: 100vh;
  svg {
    width: 9rem;
    height: 9rem;
    stroke: ${({theme}) => theme.body};
    margin-bottom: 1.5rem;
  }
`;


const WithRequestId: React.FC = ({children}) => {
  const {requestId}: IStateProps = useSelector(songReducerSelector);
  const [reconMessage, setReconMessage] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    if (!requestId) {
      setTimeout(() => setReconMessage(t('loading.failed_connexion')), 15000);
    }
    return function cleanup() {
      setReconMessage('')
    }
  });

  if (!requestId) {
    return (
      <Loader>
        <LoaderCon/>
        {t('loading.connexion')}
        <span css={css`text-align: center;padding: 4rem;`}>{reconMessage}</span>
      </Loader>
    )
  }

  return <Fragment>{children}</Fragment>
};


export default WithRequestId
