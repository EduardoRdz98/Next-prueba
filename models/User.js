const mongoose = require('mongoose');

//Modelo del usuario
const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);