const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema').GraphQLSchema;
const Home = require('./routes');
const API = require('./routes/api');

const port = 3000;

// init app
const app = express();

//middleware
app.use(logger('dev'));


// route bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// routes
app.use("/", Home);
app.use("/api", API);

// listen
app.listen(port, () => console.log(`listening on port ${port}`));