const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
const path = require("path");

let win, view;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  view = new BrowserView();
  win.setBrowserView(view);
  view.setBounds({ x: 0, y: 60, width: 1200, height: 740 });
  view.webContents.loadFile("home.html");

  win.loadFile("shell.html");

  win.on("resize", () => {
    const [width, height] = win.getContentSize();
    view.setBounds({ x: 0, y: 60, width: width, height: height - 60 });
  });
}

ipcMain.handle("go", (_event, url) => {
  if (!/^https?:\/\//i.test(url)) {
    url = "https://www.google.com/search?q=" + encodeURIComponent(url);
  }
  view.webContents.loadURL(url);
  if (!view) return;
  switch (action) {
    case "back":
      if (view.webContents.canGoBack()) view.webContents.goBack();
      break;
    case "forward":
      if (view.webContents.canGoForward()) view.webContents.goForward();
      break;
    case "reload":
      view.webContents.reload();
      break;
  }
});

app.whenReady().then(createWindow);
