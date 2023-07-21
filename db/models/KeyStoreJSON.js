const mongoose = require('mongoose');

const Schema = require('../schemas/KeyStoreJSON');

const KeyStoreJSON = mongoose.model('KeyStoreJSON', Schema);

module.exports = KeyStoreJSON;