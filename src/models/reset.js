import mongoose from 'mongoose';

const resetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

resetSchema.index({expiresAt:1},{expireAfterSeconds:0})

const Reset = mongoose.models.Reset || mongoose.model("Reset",resetSchema);

export default Reset;