const { ipcRenderer, contextBridge } = require("electron");
window.CustomElectronTitlebar = require("custom-electron-titlebar");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
});
