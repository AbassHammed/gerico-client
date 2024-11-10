import { proxy, snapshot, useSnapshot } from 'valtio';

export const appState = proxy({
  navigationPanelOpen: false,
  navigationPanelJustClosed: false,
  setNavigationPanelOpen: (value: boolean, trackJustClosed: boolean = false) => {
    if (value === false) {
      // If closing navigation panel by clicking on icon/button, nav bar should not open again until mouse leaves nav bar
      if (trackJustClosed) {
        appState.navigationPanelOpen = false;
        appState.navigationPanelJustClosed = true;
      } else {
        // If closing navigation panel by leaving nav bar, nav bar can open again when mouse re-enter
        appState.navigationPanelOpen = false;
        appState.navigationPanelJustClosed = false;
      }
    } else {
      // If opening nav panel, check if it was just closed by a nav icon/button click
      // If yes, do not open nav panel, otherwise open as per normal
      if (appState.navigationPanelJustClosed === false) {
        appState.navigationPanelOpen = true;
      }
    }
  },
  setNavigationPanelJustClosed: (value: boolean) => {
    appState.navigationPanelJustClosed = value;
  },
});

export const getAppStateSnapshot = () => snapshot(appState);

export const useAppStateSnapshot = (options?: Parameters<typeof useSnapshot>[1]) =>
  useSnapshot(appState, options);
