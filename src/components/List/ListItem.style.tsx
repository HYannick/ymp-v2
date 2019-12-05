import styled from "@emotion/styled";
import {transparentize} from "polished";

export const HomeCard = styled('div')`
  width: 100%;
  height: 13rem;
  margin-bottom: 2rem;
  border-radius: 5rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg,rgba(221,214,243,.5),hsla(3,89%,82%,.5));
  transition: 0.3s;
  &:active {
    &:after {
       transform: scaleX(1);
    }
  }
  &:after {
    content: '';
    position: absolute;
    border-radius: 5rem;
    z-index: 2;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: ${({theme}) => transparentize(0.8, theme.body)};
    transform-origin: left;
    transform: scaleX(0);
    opacity: 0.5;
    transition: transform 0.4s;
  }
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

export const HistoryCard = styled('div')`
    display: flex; 
    align-items: center;
    margin-bottom: 1rem;
    img {
      object-fit: cover; 
      width: 5rem; 
      height: 3rem;
      border-radius: 2rem;
      margin-right: 1rem;
    }
    p {
      flex: 1; 
      margin: 0;
    }
  `;

export const DownloadCard: any = styled('div')<{ onClick: any }>`
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
  padding-bottom: 1rem;
  border-bottom: 0.1rem solid ${({theme}) => transparentize(0.8, theme.body)};
`;

DownloadCard.Content = styled('div')`
  flex: 1;
  margin: 0 1rem;
  position: relative;
`;

DownloadCard.Thumbnail = styled('div')<{ bgUrl: string }>`
  width: 5rem;
  height: 3rem;
  border-radius: 2rem;
  background: ${({bgUrl}) => `url(${bgUrl}) center center no-repeat`};
  background-size: cover;
  box-shadow: ${({theme}) => theme.thumbnailShadow};
`;

DownloadCard.Header = styled('div')<{ converting: boolean }>`
  display: flex;
  justify-content: space-between;
  .title {
    white-space: nowrap; 
    max-width: 16rem; 
    overflow: hidden;
    text-overflow: ellipsis; 
    opacity: ${({converting}) => converting ? 0.2 : 1};
    transition: opacity 0.3s;
  }
  .progress {
    position: absolute;
    right: 0;
    background: ${({theme}) => theme.background};
    padding-left: 1rem;
  }
  > h5 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: normal;
  }
`;

DownloadCard.ProgressBar = styled('div')<{ progress: string | number }>`
  width: 100%;
  overflow: hidden;
  height: 0.5rem;
  border-radius: 2rem 0.5rem 2rem 0.5rem;
  border: 0.1rem solid ${({theme}) => theme.body};
  margin-top: 0.5rem;
  & > div {
    transform: scaleX(${({progress}) => `${+progress / 100}`});
    transform-origin: left;
    height: 100%;
    background-color: ${({theme}) => theme.body};
    transition: transform 0.3s;
  }
`;

export const SongStatus = styled('div')`
  width: 4rem;
  height: 4rem;
  a {
    background-color: ${({theme}) => theme.body};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 4rem;
    position: relative;
    transition: 0.1s;
    &:active {
      transform: translateY(0.6rem);
      &:after {
        box-shadow: 0 0 0 0 rgba(82,82,82,0.5);
      }
    }
    &:after {
      content: '';
      position: absolute;
      border-radius: 4rem;
      top:0;
      left:0;
      right:0;
      bottom:0;
      box-shadow: 0 0.5rem 1rem rgba(82,82,82,0.5);
      opacity: 0.5;
      transition: 0.1s;
      }
    }
    svg {
     width: 2rem;
     height: 2rem;
     fill: none;
     stroke: ${({theme}) => theme.background};
    }
  }`;
