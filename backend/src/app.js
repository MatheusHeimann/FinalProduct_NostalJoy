const express = require("express");
const app = express();
app.set('port', 3006);

const userRouter = require("./routes/userRouter");

app.use('/api', userRouter);

module.exports = app;
