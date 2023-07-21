const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const db = "connector";

mongoose.connect(`mongodb+srv://connector:Teamfrank@crypto-wallet-connector.km8y2ml.mongodb.net/?retryWrites=true&w=majority/${db}`).then(() => {
    console.log(`Connection to db \"${db}\" established`);
}).catch(err => {
    console.log(`Error on attempt to establish db connection: ${err}`);
});