const express = require('express');

function apiRouter(database) {
    const router = express.Router();

    router.get('/contacts', (req, res) => {
        const constactsCollection = database.collection('contacts');
    
        constactsCollection.find({}).toArray((err, docs) => {
            if(err) {
                console.log('There was an issue returning the collection...' + err)
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
                return res.status(500).json({error: 'Error inserting new record.'});
            }
            const newRecord = r.ops[0];
    
            return res.status(201).json(newRecord)
        });
    });

    return router;
}

module.exports = apiRouter;