import http, { Server } from 'http';
import app from './app';
import congif from 'config';

const envPort = parseInt(congif.get('server.port') || '');

const port: number = Number.isInteger(envPort) ? envPort : 5000;

const server: Server = http.createServer(app);

server.listen(port, () => console.log(`Server is running at port ${port}`));