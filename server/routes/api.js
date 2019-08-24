const express = require('express');
const app = express.Router();
const Data = require('../schema').Data;

// api index route http://localhost:3000/api
app.get("/", (req, res, next) =>
{

    const d = new Date();
    return res.json({
        "api": Data

    })
})

module.exports = app;