const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/iNotebook-Users';


const connectToMongo = () => {

    mongoose.connect(URI, () => {
        console.log('Connected to mongoose successfully');

    });
}

module.exports = connectToMongo;