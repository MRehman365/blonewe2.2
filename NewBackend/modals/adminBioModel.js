const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminid: {
        type: mongoose.Schema.ObjectId,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
   
    },
    phone: {
        type: String,
       
    },
    email: {
        type: String,
        
       
    },
    username: {
        type: String,
        // required: true,
        unique: true
    },
    bio: {
        type: String
    },
    image: {
        type: String // URL for the uploaded profile picture
    }
}, { timestamps: true });

module.exports = mongoose.model('AdminBio', adminSchema);
