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
if (process.env.NODE_ENV !== "testing") { app.use(logger('dev')); }



// route bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// routes
app.use("/", Home);
app.use("/api", API);

// listen
let server = app.listen(port, () =>
{
    process.env.NODE_ENV === "testing"
    ? null
    : console.log(`listening on port ${port}. Environment === ${process.env.NODE_ENV}`)
});

module.exports = server;