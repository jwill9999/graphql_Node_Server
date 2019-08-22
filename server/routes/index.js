const express = require('express');
const app = express.Router();


app.get("/", (req, res, next) =>
{
    return res.json({
        "data": "success",
        "status": 200
    })
})





module.exports = app;