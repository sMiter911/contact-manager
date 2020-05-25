const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');


function apiRouter(database) {
    const router = express.Router();

    router.use(
        checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate' })
    );

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({ error: err.message });
        }
    });

    router.get('/contacts', (req, res) => {
        const constactsCollection = database.collection('contacts');

        constactsCollection.find({}).toArray((err, docs) => {
            if (err) {
                console.log('There was an issue returning the collection...' + err)
            } else {
                return res.json(docs);
            }
        });
    });

    router.get('/contact', (req, res) => {
        const contact = req.body;
        console.log(contact)
        const constactsCollection = database.collection('contacts');

        constactsCollection.find({ _id: contact._id }).toArray((err, docs) => {
            if (err) {
                console.log('There was an issue returning the contact...' + err)
            } else {
                return res.json(docs);
            }
        });
    });

    router.post('/contacts', (req, res) => {
        const user = req.body;

        const constactsCollection = database.collection('contacts');

        constactsCollection.insertOne(user, (err, r) => {
            if (err) {
                return res.status(500).json({ error: 'Error inserting new record.' });
            }
            const newRecord = r.ops[0];

            return res.status(201).json(newRecord)
        });
    });

    router.post('/authenticate', (req, res) => {
        const user = req.body;

        const usersCollection = database.collection('users');

        usersCollection.findOne({ username: user.username }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'There was an error: ' + err });
            }
            if (!result) {
                return res.status(404).json({ error: 'User was not found!!!' });
            }
            if (!bcrypt.compareSync(user.password, result.password)) {
                return res.status(401).json({ error: 'Incorrect password.' })
            }
            const payload = {
                username: result.username,
                admin: result.admin
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

            return res.json({
                message: 'succesfully authed...',
                token: token
            });
        });

    })

    return router;
}

module.exports = apiRouter;