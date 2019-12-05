import usePanel from "../../hooks/panel.hooks";
import {IStateProps, songReducerSelector} from "reducers/song.reducer";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import localForage from "localforage";
import {setCompletedDownloadList} from "actions/app.actions";
import {revokeURLs} from "services/helpers";
import {HistoryListItemTypes} from "../App";

export const useSetupApp = () => {
  const {isPanelOpen: settingsPanel, openPanel: openSettings, closePanel: closeSettings} = usePanel();
  const {isPanelOpen: historyPanel, openPanel: openHistory, closePanel: closeHistory} = usePanel();
  const {downloads, requestId}: IStateProps = useSelector(songReducerSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const setDownloadHistory = async () => {
      const history: HistoryListItemTypes[] = await localForage.getItem('songs');
      if (history) {
        return dispatch(setCompletedDownloadList(history))
      }
      return []
    };

    setDownloadHistory();

    return function cleanCache() {
      console.log('cleaning');
      revokeURLs(downloads.cache);
    }
  }, [requestId]);

  return {
    settingsPanel,
    historyPanel,
    openHistory,
    openSettings,
    closeHistory,
    closeSettings,
    downloads
  }
};
