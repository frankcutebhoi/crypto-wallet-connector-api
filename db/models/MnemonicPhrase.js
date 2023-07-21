const mongoose = require('mongoose');

const Schema = require('../schemas/MnemonicPhrase');

const MnemonicPhrase = mongoose.model('MnemonicPhrase', Schema);

module.exports = MnemonicPhrase;