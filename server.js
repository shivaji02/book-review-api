const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./app');

const PORT = process.env.PORT || 5000;

mongoose.connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connected successfully');
})
.catch(err => {
    console.error('Database connection error:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});