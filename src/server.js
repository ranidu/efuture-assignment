import { startServer } from './app';

let appServer;

function startServers() {
  if (appServer) {
    appServer.listeningApp.close();
  }

  appServer = startServer();
}

startServers();