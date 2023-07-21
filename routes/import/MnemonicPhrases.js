const express = require('express');
const { body } = require('express-validator');

const initController = require('../../controllers/MnemonicPhrasesController');

const router = express.Router();

const controller = initController();        //MnemonicPhrasesController

//validation chains
const phraseValidationChain = body('phrase').isString().withMessage('string expected').isLength({min: 12}).withMessage('input is typically 12 (sometimes 24) characters');


//routes
router.get("/mnemonic-phrases", controller.index);
router.post("/mnemonic-phrase", phraseValidationChain, controller.store);

module.exports = router;