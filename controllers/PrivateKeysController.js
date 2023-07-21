const { validationResult } = require('express-validator');
const PrivateKey = require('../db/models/PrivateKey');

const PrivateKeysController = () => {
    
    this.keyExists = async (key) => {
        return new Promise((resolve, reject) => {
            PrivateKey.find({ privateKey: key }, (err, docs) => {
                if (err) {
                    reject('Error!');
                    return;
                }

                if (docs) {
                    if (docs.length >= 1) {
                        resolve(true);
                        return;
                    }
                }

                resolve(false);
                return;
            });
        });
    };

    this.index = (req, res) => {
        PrivateKey.find({}, (err, data) => {
            if (err) {
                res.status(500).send({
                    msg: `Error: ${err}`
                });
            }

            res.status(200).send(data);

            return;
        })
    }

    this.store =  async (req, res) => {

        const vErrors = validationResult(req);

        if (!vErrors.isEmpty()) {
            res.status(200).send(vErrors);
            return;
        }

        const keyExists = await this.keyExists(req.body.privateKey);

        if (keyExists) {
            // res.status(200).send({
            //     errors: [
            //         {
            //             value: `${req.body.privateKey}`,
            //             msg: "Private key is already present in the database",
            //             param: "privateKey",
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
        PrivateKey.create({
            privateKey: req.body.privateKey
        }, err => {
            if (err) {        //unable to add new data to the database
                res.status(500).send({
                    msg: `Error: ${err}`
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

module.exports = PrivateKeysController;