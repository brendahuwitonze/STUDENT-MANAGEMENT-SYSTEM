import mongoose from 'mongoose';
const facilatatorScheme =new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    nationalId: {
        type: String,
        required: true,
        unique: true,
        length: 16,
    },
    course: {
        type: String,
        required: true,
    }
},{ timestamps: true });

const facilatatorModel = mongoose.model('facilatator',facilatatorScheme);

export default facilatatorModel;