const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("browserAPI", {
  go: (url) => ipcRenderer.invoke("go", url),
  nav: (action) => ipcRenderer.invoke("nav", action)
});
