const WebSocket = require('ws');

// starts server instance on http://localhost:8080
const wss = new WebSocket.Server({ port: 8080 });

// waits for connection to be established from the client
// the callback argument ws is a unique for each client
wss.on('connection', (ws) => {

    console.log('Client connected');

  // runs a callback on message event
    ws.on('message', (data) => {
        console.log('Recived data:', data.toString());
        console.log('Parsed data:', JSON.parse(data.toString()));

        data = JSON.parse(data.toString());

        switch(data.type){
            case 'login':
                console.log('User logged in:', data.name);
                break;
        }
        
        
        // sends the data to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });
});