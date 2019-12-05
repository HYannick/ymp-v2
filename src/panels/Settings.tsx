/** @jsx jsx */
import React from 'react';
import {css, jsx} from "@emotion/core";
import {useTheme} from "../ThemeProvider";
import styled from "@emotion/styled";
import Exposure from "../core/svg/Exposure";
import Moon from "../core/svg/Moon";
import FRFlag from "../core/svg/FRFlag";
import UKFlag from "../core/svg/UKFlag";
import {useTranslation} from "react-i18next";

interface OptionTypes {
  id: string | number,
  name: string,
  icon: {
    component: React.FC,
    props: any
  },
  action: () => void,
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
`;

const OptionButton = styled('button')<{ withColor: boolean }>`
{
  width: 6rem;
  height: 6rem;
  background-color: ${({theme}) => theme.body};
  color: ${({theme}) => theme.background};
  border-radius: 2.5rem;
  box-shadow: 0 0.5rem 1rem rgba(82,82,82,0.2);
  margin-right: 1rem;
  border: none;
  outline: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  svg {
    width: 3rem;
    height: 3rem;
    path {
      ${({theme, withColor}) => !withColor ? `fill: ${theme.background}` : ''};
    }
  }
}
`;

const Option: React.FC<SettingsTypes> = ({label, options}) => {
  return (
    <OptionContainer>
      <h4>{label}</h4>
      <div>
        {options.map(({id, action, icon: {component: Icon, props}}) => (
          <OptionButton key={id} onClick={action} {...props}>
            <Icon/>
          </OptionButton>
        ))}
      </div>
    </OptionContainer>
  )
};

const Settings: React.FC = () => {
  const {t, i18n} = useTranslation();
  const themeState = useTheme();

  const setLang = async (lang: string) => {
    await i18n.changeLanguage(lang);
    window.localStorage.setItem('lang', lang);
  };

  const settings: SettingsTypes[] = [
    {
      id: 'dark-mode',
      label: t('settings.theme'),
      options: [
        {
          id: 1,
          name: themeState.dark ? 'light-theme' : 'dark-theme',
          action: themeState.toggle,
          icon: {component: themeState.dark ? Exposure : Moon, props: {withColor: false}}
        }
      ]
    },
    {
      id: 'lang',
      label: t('settings.lang'),
      options: [
        {
          id: 1,
          name: 'french',
          action: () => setLang('fr'),
          icon: {component: FRFlag, props: {withColor: true}}
        },
        {
          id: 2,
          name: 'english',
          action: () => setLang('en'),
          icon: {component: UKFlag, props: {withColor: true}}
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
