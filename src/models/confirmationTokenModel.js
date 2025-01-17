import mongoose from "mongoose";

const confirmationTokenSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

const ConfirmationToken = mongoose.models.ConfirmationToken || mongoose.model('ConfirmationToken', confirmationTokenSchema);
export default ConfirmationToken;
