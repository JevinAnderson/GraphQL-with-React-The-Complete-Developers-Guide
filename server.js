const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const morgan = require('morgan')

const PORT = 4000;
const server = express();
server.use(morgan('dev'))
server.use('/graphql', expressGraphQL({ graphiql: true, schema }));

server.listen(PORT, () => {
  console.log(`listening: http://localhost:${PORT}`);
});
