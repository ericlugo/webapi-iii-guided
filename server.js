const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(morgan('dev'));
server.use(methodLogger);
server.use(bridgeTroll);
server.use(express.json());
server.use('/api/hubs', hubsRouter);
server.use(helmet());

server.get('/', (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function methodLogger(request, response, next) {
  console.log(`${request.method} request received.`);
  next();
}

function bridgeTroll(req, res, next) {
  const seconds = new Date().getSeconds();
  console.log(seconds);
  seconds % 3 === 0 ? res.status(403).json({ message: `where's mah money!?` }) : next();
}

module.exports = server;
