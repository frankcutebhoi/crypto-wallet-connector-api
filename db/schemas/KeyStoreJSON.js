const mongoose = require('mongoose');

const KeyStoreJSONSchema = new mongoose.Schema({
    keyStoreJSON: String,
    password: String
});

module.exports = KeyStoreJSONSchema;