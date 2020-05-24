require('dotenv').config();

const users  = require('./users.json');
const contacts  = require('./contacts.json');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const dbName = 'contacts-app';

function seedCollection(collectionName, initialRecords) {
    MongoClient.connect(process.env.DB_CONN, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log("Database Connection Error: " + err);
        }
        else {
            console.log("Connected...");

            const db = client.db(dbName)

            const collection = db.collection(collectionName);

            // remove collection...
            collection.deleteMany();

            // intialize records
            initialRecords.forEach((item) => {
                if (item.passsword) {
                    item.passsword = bcrypt.hashSync(item, 10);
                }
            });

            // enter records into spcified collection
            collection.insertMany(initialRecords, (err, result) => {
                console.log(`${result.insertedCount} records inserted`);
                console.log('Closing connection...');
                client.close();
                console.log('Done...')
            });
        }
    });
}

seedCollection('users', users);
seedCollection('contacts', contacts);