const electron = require('electron');
// 控制应用生命周期的模块。
// eslint-disable-next-line no-unused-vars
const {app, ipcMain} = electron;
// 创建原生浏览器窗口的模块。
const {BrowserWindow} = electron;

let mainWindow;

function createWindow() {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        transparent: true,
        frame: false,
        width: 490,
        height: 770,
        resizable: false,
        minimizable: false,
        maximizable: false,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // 加载应用的 index.html。
    // mainWindow.loadURL(`file://${__dirname}/common/index.html`);
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    // mainWindow.loadURL(`http://localhost:8080`);
    // 启用开发工具
    // mainWindow.webContents.openDevTools();

    mainWindow.setSkipTaskbar(true)

    mainWindow.setPosition(1350,140)
    // mainWindow.setPosition(parseInt(screen.width/4*3),parseInt(screen.height/2))
}
app.whenReady().then(() =>{
    // const {screen} = electron;
    // mainWindow.setPosition(screen.width/4*3, screen.height/2)
})

// Electron 会在初始化后并准备
app.on('ready', createWindow);
// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    // 绝大部分应用会重新创建一个窗口。
    if (mainWindow === null) {
        createWindow();
    }
});