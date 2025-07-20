import 'dotenv/config';
import http from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';
import router from './router';
import { handleClose, handleConnection } from './handlers';

const app = express();
const port = 8080;

// Serve static files (optional, for a simple client)
// app.use(express.static('public'));

// Create an HTTP server from the Express app
export const server = http.createServer(app);

// Create a WebSocket server instance attached to the HTTP server
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on('connection', async (ws) => {
  console.log('client connected');

  // Handle messages from clients
  ws.on('message', router(ws));

  // Handle client disconnections
  ws.on('close', handleClose);

  // Send a message to the connected client
  handleConnection(ws)();
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`express and websocket server listening on port ${port}`);
});
