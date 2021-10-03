const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  ipcRenderer,
  Notification,
} = require("electron");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require("electron-devtools-installer");
require('@electron/remote/main').initialize()

const { channels } = require("./shared/constants");
const Store = require("electron-store");

const store = new Store({
  name: "Resumes",
});

const path = require("path");
app.whenReady().then(() => {
  installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS]);
});
let win;
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1800,
    height: 900,
    frame: true,
    aspectRaio: 1.56,
    fullscreen: false,
    title: "ResPrep",
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenu(null);
  //load the index.html from a url
  win.loadURL("http://localhost:3000");

  var resizeTimeout;
  win.on("resize", (e) => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      var size = win.getSize();
      win.setSize(size[0], parseInt((size[0] * 9) / 16));
    }, 100);
  });

  console.log(app.getPath("userData"));

  // Open the DevTools.
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);
app.name = "SivaDesotop";
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notify", body: message }).show();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  var reload = () => {
    BrowserWindow.getCurrentWindow().reload();
  };

  globalShortcut.register("F5", reload);
  globalShortcut.register("CommandOrControl+R", reload);
  // here is the fix bug #3778, if you know alternative ways, please write them
  window.addEventListener("beforeunload", () => {
    globalShortcut.unregister("F5", reload);
    globalShortcut.unregister("CommandOrControl+R", reload);
  });
});

app.on("will-quit", () => {
  // Unregister a shortcut.
  globalShortcut.unregister("CommandOrControl+X");

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const products = {
  notebook: {
    name: "notebook",
    price: "2500",
    color: "gray",
  },
  headphone: {
    name: "headphone",
    price: "700",
    color: "black",
  },
};
store.set("foo.bar", products);
// End of the file

ipcMain.on(channels.GET_DATA, (event, arg) => {
  const { product } = arg;
  //  event.sender.send(channels.GET_DATA, products[product]);
  event.sender.send(channels.GET_DATA, store.get("profiles.first"));
});

ipcMain.on(channels.GET_ALL_PROFILES, (event, arg) => {
  event.sender.send(channels.GET_ALL_PROFILES, store.get("profiles"));
});

ipcMain.on(channels.SET_PROFILE_DATA, (event, arg) => {
  console.log(arg);
  const { proppath, statevalue } = arg;
  store.set("profiles." + proppath, statevalue);
});

ipcMain.on(channels.CREATE_PROFILE, (event, arg) => {
  console.log(arg);
  const { proppath, statevalue } = arg;
  store.set("profiles." + proppath, statevalue);
});

ipcMain.on(channels.DELETE_PROFILE, (event, arg) => {
  console.log(arg);
  const { proppath, statevalue } = arg;
  store.delete("profiles." + proppath);
});

// ipcMain.on(channels.CREATE_DOCX, (event, arg) => {
//   console.log(arg);
//   const { proppath, statevalue } = arg;
//   store.delete("profiles." + proppath);
// });
// const fs = require('fs');
// try { fs.writeFileSync('myfile.txt', 'the text to write in the file', 'utf-8'); }
// catch(e) { alert('Failed to save the file !'); }


ipcMain.on(channels.CLOSE_WINDOW,()=>{
  win.close();
})
ipcMain.on(channels.MAXIMIZE_WINDOW,()=>{
  win.maximize();
})
ipcMain.on(channels.MINIMIZE_WINDOW,()=>{
  win.minimize();
})

ipcMain.on(channels.TOGGLE_MAXIMIZE,()=>{
  win.isMaximized() ? win.unmaximize() : win.maximize();
})