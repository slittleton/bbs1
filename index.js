const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const topics = require('./routes/topics');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/users', users);
app.use('/api/topics', topics)

app.listen(PORT, console.log(`Listening on port ${PORT}`))