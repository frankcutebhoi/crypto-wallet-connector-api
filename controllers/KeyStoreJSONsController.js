const { validationResult } = require('express-validator');
const KeyStoreJSON = require('../db/models/KeyStoreJSON');

const KeyStoreJSONsController = () => {

    this.keyExists = async (key) => {

        return new Promise((resolve, reject) => {

            KeyStoreJSON.find({keyStoreJSON : key}, (err, docs) => {
                if (err) {
                    reject("Error");
                }
    
    
                if (docs) {
                    if (docs.length >= 1) {

                        console.log("to return true");

                        resolve(true);
                    }
                }

                resolve(false);
            });
            
        });
        
        
    }

    /**
     * retrieves and returns all KeyStoreJSON data in the database
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    this.index = (req, res) => {
        KeyStoreJSON.find({}, (err, data) => {
            if (err) {
                res.status(500).send({
                    msg: `Error: ${err}`
                });
                return;
            }

            res.status(200).send(data);

            return;
        });
    }

    /**
     * add a new KeyStoreJSON data to the database
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    this.store = async (req, res) => {

        const errs = validationResult(req);     //validation errors

        if (!errs.isEmpty()) {
            res.status(200).send(errs);
            return;
        }

        const keyExists = await this.keyExists(req.body.keyStoreJSON);

        if (keyExists) {
            // res.status(200).send({
            //     errors: [
            //         {
            //             value: `${req.body.keyStoreJSON}`,
            //             msg: "Key is already present in the database",
            //             param: "keyStoreJSON",
            //             location: "body"
            //         }
            //     ]
            // });
            // return;

            //ignore request
            res.status(200).send({
                msg: "success"
            });
            return;
        }

        //try inserting the data into the database
        KeyStoreJSON.create({
            keyStoreJSON: req.body.keyStoreJSON,
            password: req.body.password
        }, (error) => {
            if (error) {        //unable to add new data to the database
                res.status(500).send({
                    msg: `Error: ${error}`
                });
                return;
            }

            res.status(200).send({
                msg: "success"
            });
            return;
        });
    };

    return this;
};

module.exports = KeyStoreJSONsController;