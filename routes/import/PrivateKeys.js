const express = require('express');
const initController = require('../../controllers/PrivateKeysController');
const { body } = require('express-validator');

const router = express.Router();

const controller = initController();        //PrivateKeysController;

//validation chains
const keyValidationChain = body('privateKey').isString().withMessage('string expected').isLength({ min: 12 }).withMessage('input is typically 12 (sometimes 24) characters');

//routes
router.get("/private-keys", controller.index);
router.post("/private-key", keyValidationChain, controller.store);

module.exports = router;