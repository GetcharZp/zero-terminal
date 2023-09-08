const {ipcMain, dialog} = require('electron')
const {v4: uuidv4} = require('uuid')
const Store = require('electron-store')

// 初始化存储对象
const store = new Store();
// 连接配置的 Key
const connectionKey = "CONNECTION_KEY";

const newAppService = () => {
    // 获取连接列表
    ipcMain.handle('getConnectionList', () => {
        return store.get(connectionKey);
    })

    // 保存连接
    ipcMain.handle('saveConnection', (_, req) => {
        let connections = store.get(connectionKey) || [];
        if (req.identity === undefined || req.identity === "") { // 新增配置
            req.identity = uuidv4();
            connections.push(req);
        } else { // 修改配置
            for (let i = 0; i < connections.length; i++) {
                if (connections[i].identity === req.identity) {
                    connections[i] = req;
                    break;
                }
            }
        }
        store.set(connectionKey, connections);
        return {"code": 200, "msg": "success"};
    })

    // 删除连接
    ipcMain.handle('deleteConnection', (_, req) => {
        let connections = store.get(connectionKey) || [];
        for (let i = 0; i < connections.length; i++) {
            if (connections[i].identity === req.identity) {
                connections.splice(i, 1)
                break;
            }
        }
        store.set(connectionKey, connections);
        return {"code": 200, "msg": "success"};
    })

    // 打开保存文件的弹出框
    ipcMain.handle('showSaveDialog', async (_,req) => {
        const options = {
            title: '选择文件保存位置',
            defaultPath: req['filename'], // 默认文件名
            buttonLabel: '保存', // 按钮显示的文本
            filters: [
                {name: '文本文件', extensions: ['txt']},
                {name: '所有文件', extensions: ['*']}
            ],
            properties: ['showOverwriteConfirmation'] // 可选，添加此属性以显示覆盖确认对话框
        };

        try {
            const result = await dialog.showSaveDialog(options);
            if (!result.canceled) {
                return result.filePath;
            }
        } catch (err) {
            console.error(err);
        }
    });

    return ipcMain
}

module.exports = newAppService;