const express = require('express');
const app = express.Router();


app.get("/", (req, res, next) =>
{
    const d = new Date();
    return res.json({
        "data": {
            "time": d.toGMTString(),
            "statusCode": 200
        },
    })
})





module.exports = app;