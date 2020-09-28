const express = require('express');
const cors = require('cors');

require('../db/mongoose');

const userRouter = require('./routers/user');
const articleRouter = require('./routers/article')

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(articleRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Listening to port '+port);
})