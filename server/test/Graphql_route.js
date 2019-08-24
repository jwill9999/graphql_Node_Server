const expect = require('chai').expect;
const express = require('express');
const request = require('supertest');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema').GraphQLSchema;



const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const Books = [
    {

        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
    },
    {

        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];


describe('GraphQL Server', () =>
{
    it('Returns a list of Books with title and author', (done) =>
    {
        request(app)
            .get('/graphql')
            .send({ query: '{ books { title author } }' })
            .expect(200)
            .end((err, res) =>
            {
                // res will contain array with one user
                if (err) return done(err);
                expect(res.body.data.books).to.eql(Books);
                done();
            })
    })

    it('Returns a Single Book with title and author', (done) =>
    {
        request(app)
            .post('/graphql')
            .send({ query: '{ book(id: 1) { title author } }' })
            .expect(200)
            .end((err, res) =>
            {
                // res will contain array with one user
                if (err) return done(err);
                //console.log(res.body.data.book)
                expect(res.body.data.book).to.eql(Books[0]);
                done();
            })
    })
});
