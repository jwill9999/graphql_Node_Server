const request = require('supertest');
const express = require('express');
const assert = require('assert');
const expect = require('chai').expect;
const Home = require('../routes');
let app;

// test
describe('Index route', function ()
{

    before(() =>
    {
        app = require('../index');
    });

    after(() =>
    {
        app.close();
    });

    describe('Tests Mocha is working correctly', function ()
    {
        it('should return -1 when the value is not present', function ()
        {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
    describe('GET / http:localhost:3000', function ()
    {
        it('responds with json', function (done)
        {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });


});
