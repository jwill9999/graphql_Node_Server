const request = require('supertest');
const express = require('express');
const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon')
const API = require('../routes/api');
const Data = require('../Data');
let app;

// test
describe('API route', function ()
{
    before(() =>
    {
        app = require('../index');
    });

    after(() =>
    {
        app.close();
    });

    describe('GET / http:localhost:3000/api', function ()
    {



        it('responds with json', function (done)
        {
            request(app)
                .get('/api')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) =>
                {
                    if (err) {
                        return done(err);
                    }

                    expect(res.body).to.eql({ "api": Data });
                    return done();
                });
        });


    });


});
