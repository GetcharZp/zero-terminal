const {app, BrowserWindow} = require('electron')
const path = require('path')

// 创建窗口
const createWindow = () => {
    const win = new BrowserWindow({
        icon: "icon.png",
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile("src/index.html")
}

// app ready
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 关闭所有窗口时退出应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
