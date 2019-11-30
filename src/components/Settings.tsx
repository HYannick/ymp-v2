/** @jsx jsx */
import React from 'react';
import {css, jsx} from "@emotion/core";
import {useTheme} from "../ThemeProvider";
import styled from "@emotion/styled";

interface OptionTypes {
  id: string | number,
  name: string,
  media?: any,
  action: any
}

interface SettingsTypes {
  id?: string | number,
  label: string,
  options: OptionTypes[]
}

const OptionContainer = styled('div')`
  h4 {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  & > div {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
  }
  button {
    width: 6rem;
    height: 6rem;
    background-color: ${({theme}: any) => theme.body};
    color: ${({theme}: any) => theme.background};
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(82,82,82,0.2);
    margin-right: 1rem;
    border: none;
    outline: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    
  }
`;

const Option: React.FC<SettingsTypes> = ({label, options}) => {
  return (
    <OptionContainer>
      <h4>{label}</h4>
      <div>
        {options.map(opt => <button key={opt.id} onClick={opt.action}>{opt.name}</button>)}
      </div>
    </OptionContainer>
  )
};

const Settings: React.FC = () => {
  const themeState = useTheme();

  const setLang = (lang: string) => {
    console.log('lang', lang)
  };

  const settings: SettingsTypes[] = [
    {
      id: 'dark-mode',
      label: 'Dark Theme',
      options: [
        {
          id: 1,
          name: themeState.dark ? 'light-theme' : 'dark-theme',
          action: themeState.toggle
        }
      ]
    },
    {
      id: 'lang',
      label: 'Language',
      options: [
        {
          id: 1,
          name: 'french',
          action: () => setLang('french')
        },
        {
          id: 2,
          name: 'english',
          action: () => setLang('english')
        }
      ]
    }
  ];

  return (
    <div css={css`padding: 1rem`}>
      <div>
        {settings.map(({id, ...rest}) => <Option key={id} {...rest}/>)}
      </div>
    </div>
  );
};

export default Settings;
