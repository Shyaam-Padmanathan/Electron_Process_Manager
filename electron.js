const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const url = require('url');

async function createWindow() {
    const isDev = await import('electron-is-dev');
    const buildURL = url.format({
        pathname: path.join(__dirname, '/build/index.html'),
        protocol: 'file'
    });
    const startURL = isDev ? 'http://localhost:3000' : buildURL;

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.webContents.openDevTools();
    win.loadURL(startURL).catch(err => console.error(err)); // Log any loading errors
}

// IPC listener for command execution
ipcMain.on('run-command', (event, { command, filePath }) => {
    exec(command, { cwd: filePath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        event.reply('command-response', `Error: ${stderr}`);
        return;
      }
      event.reply('command-response', stdout);
    });
  });

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
