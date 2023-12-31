const {app, BrowserWindow, Menu, dialog, shell} = require('electron')
const path = require('path')
const electronReload = require('electron-reload')
const newAppService = require('./src/service/app.js')

// 创建窗口
const createWindow = () => {
    const win = new BrowserWindow({
        icon: "icon.png",
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            // 关闭上下文隔离
            contextIsolation: false,
            // 允许使用开发工具
            devTools: true
        }
    })

    // 加载入口页面
    win.loadFile("src/index.html").then(res => {
        console.log("[SYS] init success")
    }).catch(e => {
        console.log("[SYS] init err: ", e)
    })
    
    // 自定义接口
    newAppService()

    // 打开开发工具
    // win.webContents.openDevTools();
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

// 监听并重新加载指定的文件或目录 (开发环境)
if (process.env.npm_lifecycle_event === 'start') {
    electronReload(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}

// 自定义菜单
// 创建一个自定义菜单模板
const template = [
    {
        label: 'Help',
        submenu: [
            {
                label: 'About',
                click: async () => {
                    const version = app.getVersion();
                    const name = app.getName();
                    try {
                        await dialog.showMessageBox({
                            title: 'About',
                            message: `Copyright: ${name} \r\nVersion: ${version}`,
                            buttons: ['OK']
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
        ]
    }
];
// 使用自定义菜单模板创建菜单
const menu = Menu.buildFromTemplate(template);
// 设置应用程序菜单
Menu.setApplicationMenu(menu);