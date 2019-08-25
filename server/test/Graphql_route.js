const expect = require('chai').expect;
const express = require('express');
const request = require('supertest');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema').GraphQLSchema;
const Books = require('../Data');
let app;





describe('GraphQL Server', () => {

    before(() => {
        app = require('../index');
    });

    after(() => {
        app.close();
    });

    describe('RootQuery', () => {


        it('Returns a list of Books with title and author', (done) => {
            const booksQuery = {
                query: '{ books { id title author } }'
            };
            request(app)
                .get('/graphql')
                .send(booksQuery)
                .expect(200)
                .end((err, res) => {
                    const {
                        books
                    } = res.body.data
                    // res will contain array with res.body.data
                    if (err) return done(err);
                    expect(books).to.eql(Books);
                    done();
                })
        })

        it('Returns a Single Book with title and author when passing id as String', (done) => {

            const bookQuery = {
                query: '{ book(id: "1") { id title author } }'
            }
            request(app)
                .post('/graphql')
                .send(bookQuery)
                .expect(200)
                .end((err, res) => {
                    const {
                        book
                    } = res.body.data
                    // res will contain array with res.body.data
                    if (err) return done(err);

                    expect(book).to.eql(Books[0]);
                    done();
                })
        })

        it('Returns a Single Book with title and author when passing id as Number', (done) => {

            const bookQuery = {
                query: '{ book(id: 1) { id title author } }'
            }
            request(app)
                .post('/graphql')
                .send(bookQuery)
                .expect(200)
                .end((err, res) => {
                    const {
                        book
                    } = res.body.data
                    // res will contain array with res.body.data
                    if (err) return done(err);

                    expect(book).to.eql(Books[0]);
                    done();
                })
        })
    });
});