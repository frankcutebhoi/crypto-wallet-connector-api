const mongoose = require('mongoose');

const PrivateKeySchema = new mongoose.Schema({
    privateKey: String
});

module.exports = PrivateKeySchema;