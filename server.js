const http = require('http');
const app = require('./lib/app');
require('./lib/connect');

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(`server running on port ${server.address()}`);
});