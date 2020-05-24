const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./api-router');

function createExpressApp(database) {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
    app.use('/api', apiRouter(database));

    // Angular hosted route
    app.use('*', (req, res) => {
        return res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    return app;
}

module.exports = createExpressApp;