import { take, call, put, all, fork, takeEvery, cancelled } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { sendMessage, receiveMessage, websocketConnected, websocketDisconnected } from './chatSlice';
import { removeQuotes } from '../utils/removeQuotes';

let ws;

function initializeWebSocket() {
  ws = new WebSocket('ws://localhost:8080');
  return ws;
}

function createWebSocketChannel(socket) {
  return eventChannel(emitter => {
    socket.onmessage = (event) => {
      const message = removeQuotes(JSON.parse(event.data));
      emitter(receiveMessage(message));
    };

    return () => {
      socket.close();
    };
  });
}

function* manageWebSocketConnectionSaga() {
  const socket = yield call(initializeWebSocket);
  if (socket) {
    yield put(websocketConnected());
  }

  socket.onerror = function* (error) {
    console.error('WebSocket error:', error);
    yield put(websocketDisconnected());
  };

  socket.onclose = function* () {
    console.log('WebSocket Disconnected');
    yield put(websocketDisconnected());
  };

  const channel = yield call(createWebSocketChannel, socket);

  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}


function* sendMessageSaga(action) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(action.payload));
  } else {
    console.error('WebSocket is not connected.');
  }
}

function* watchSendMessage() {
  yield takeEvery(sendMessage.type, sendMessageSaga);
}

export default function* rootSaga() {
  yield all([
    fork(manageWebSocketConnectionSaga),
    fork(watchSendMessage),
  ]);
}
