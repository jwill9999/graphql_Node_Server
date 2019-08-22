const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const Home = require('./routes');
const API = require('./routes/api');

const port = 3000;
const app = express();

//middleware
app.use(logger('dev'));


// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.use("/", Home);
app.use("/api", API);
app.listen(port, () => console.log(`listening on port ${port}`));