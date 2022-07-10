import { webSocket } from 'rxjs/webSocket';

const subject = webSocket('ws://localhost:8081');

subject.subscribe({
  next: msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
  error: err => console.log(err), //   Called if at any point WebSocket API signals some kind of error.
  complete: () => console.log('complete') //   Called when connection is closed (for whatever reason).
});

export enum ReceiveMsgType {
    CONNECTED = 'CONNECTED',     // 连接成功
}