const request = require('supertest');
const express = require('express');
const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon')
const API = require('../routes/api');

const app = express();

app.use("/", API);

// test
describe('The API route', function ()
{

    describe('GET / http:localhost:3000/api', function ()
    {

        let Data = {
            "api": [
                {
                    id: 1,
                    title: "Harry Potter and the Sorcerer's stone",
                    author: 'J.K. Rowling',
                },
                {
                    id: 2,
                    title: 'Jurassic Park',
                    author: 'Michael Crichton',
                },
            ]
        }

        it('responds with json', function (done)
        {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>
                {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body).to.eql(Data);
                    return done();
                });
        });


    });


});
