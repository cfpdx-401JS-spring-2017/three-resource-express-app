const app = require('./lib/app');
const http = require('http');
require('./lib/connect');

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Listening on', server.address());
});