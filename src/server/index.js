const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const createExpressApp = require('./create-express-app')

require('dotenv').config();


MongoClient.connect(process.env.DB_CONN, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log('Databse Connection Error: ' + err);
    } else {
        console.log('Connected to instance...');

        database = client.db('contacts-app')

        createExpressApp(database).listen(3000, () => {
            console.log('Listening on Port 3000...')
        });
    }
});