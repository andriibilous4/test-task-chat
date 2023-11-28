const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let messages = [];

wss.on('connection', ws => {
  messages.forEach((message) => {
    ws.send(JSON.stringify(message));
  });

  ws.on('message', message => {
    messages.push(message);
    if (messages.length > 10) messages.shift();

    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });

  });
});
