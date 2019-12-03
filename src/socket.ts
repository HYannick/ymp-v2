import socketIOClient from "socket.io-client";
import {setRequestId} from "./actions/app.actions";

export const socket = socketIOClient(`${process.env.REACT_APP_SOCKETIO_SERVER}`);

export const initSocketCon = (socket: any, store: any) => {
  socket.emit('connection');
  socket.on("connected", (res:any) => {
    const {requestId} = store.getState().songReducer;
    if(!requestId) store.dispatch(setRequestId(res.requestId));
  });
  socket.on('disconnect' , () => {
    store.dispatch(setRequestId(''));
  })
};
