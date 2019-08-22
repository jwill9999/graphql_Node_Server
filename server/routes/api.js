const express = require('express');
const app = express.Router();


app.get("/", (req, res, next) =>
{

    var d = new Date();
    return res.json({
        "data": {
            "time": d.toGMTString()
        }
    })
})

module.exports = app;