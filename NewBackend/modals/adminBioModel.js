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
        type: Number,
       
    },
    email: {
        type: String,
        
       
    },
    username: {
        type: String,
        required: true,
    },
    bio: {
        type: String
    },
    image: {
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model('AdminBio', adminSchema);
