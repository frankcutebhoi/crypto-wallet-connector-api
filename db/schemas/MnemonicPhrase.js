const mongoose = require('mongoose');

const MnemonicPhraseSchema = new mongoose.Schema({
    phrase: String
});

module.exports = MnemonicPhraseSchema;