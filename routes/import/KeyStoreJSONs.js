const express = require('express');
const { body } = require('express-validator')

const initController = require('../../controllers/KeyStoreJSONsController');

const isStartWith3Dots = require('../../validators/isStartWith3Dots');


const router = express.Router();

const controller = initController();        //KeyStoreJSONsController

//validation chains
const storageValidationChain = body('keyStoreJSON').isString().withMessage('string expected').custom(isStartWith3Dots);
const passwordValidationChain = body('password').isLength({ min: 1}).withMessage('passwrod is required');

//routes
router.get("/keystore-jsons", controller.index);
router.post("/keystore-json", storageValidationChain, passwordValidationChain, controller.store);

module.exports = router;