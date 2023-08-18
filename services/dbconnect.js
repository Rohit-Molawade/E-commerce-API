const mongoose = require('mongoose');

//Mongoose Connection
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

exports.main = async function () {
    await mongoose.connect('mongodb+srv://api_user:example_pass@cluster0.49myvsm.mongodb.net/CommerceAPI?retryWrites=true&w=majority');
};