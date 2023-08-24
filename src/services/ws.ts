// import { webSocket } from 'rxjs/webSocket';

// const subject = webSocket('ws://localhost:8081');

// subject.subscribe({
//   next: msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
//   error: err => console.log(err), //   Called if at any point WebSocket API signals some kind of error.
//   complete: () => console.log('complete') //   Called when connection is closed (for whatever reason).
// });

// export enum ReceiveMsgType {
//     CONNECTED = 'CONNECTED',     // 连接成功
// }


function create_conn(ws_path:string){
    let base_url = "ws://127.0.0.1"
    if (process.env.NODE_ENV == "production"){
        base_url = "wss://www.weridolin.cn"  // another way
    }
    return  new WebSocket(`${base_url}/${ws_path}`)
}

export {
  create_conn
}

