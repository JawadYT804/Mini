const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

const __path = process.cwd();
const PORT = process.env.PORT || 8000;

// Increase event listeners
require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__path, 'public')));

// Routes
app.use('/code', require('./pair'));
app.use('/pair', (req, res) => {
    res.sendFile(path.join(__path, 'main.html'));
});

app.use('/', (req, res) => {
    res.sendFile(path.join(__path, 'main.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`SIGMA-MD Server running on http://localhost:${PORT}`);
});

module.exports = app;
