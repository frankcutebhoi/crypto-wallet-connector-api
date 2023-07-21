const mongoose = require('mongoose');

const Schema = require('../schemas/PrivateKey');

const PrivateKey = mongoose.model('PrivateKey', Schema);

module.exports = PrivateKey;