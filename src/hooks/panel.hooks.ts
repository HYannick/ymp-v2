import {useState} from "react";

const usePanel = () => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const togglePanel = () => {
    setPanelOpen(!isPanelOpen)
  };

  const openPanel = () => setPanelOpen(true);
  const closePanel = () => setPanelOpen(false);

  return {
    isPanelOpen, setPanelOpen, togglePanel, closePanel, openPanel
  }
};

export default usePanel
