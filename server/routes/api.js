const express = require('express');
const app = express.Router();
const Data = require('../schema').Data;

console.log(']]]]]]]]]]] ', Data)

app.get("/", (req, res, next) =>
{

    const d = new Date();
    return res.json({
        "payload": {
            "status": {
                "time": d.toGMTString(),
                "statusCode": 200
            },
            "api": Data
        }
    })
})

module.exports = app;