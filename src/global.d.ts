import WebSocket from 'ws';

declare global {
  interface Client extends WebSocket {
    Id: string;
  }
}
