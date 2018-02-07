import mongoose, { Schema } from 'mongoose';
import validators from 'validators';


const PaymentSchema = new Schema({
    PaymentNo: {
        type: String,
        unique: true,
        required: true
    },
    PurchaseOrderId: {
        type: String,
        required: true
    },
    Context: {
        type: String
    },
    UserId: {
        type: String
    },
    PaymentType: {
        type: String
    },
    Status: {
        type: String
    },
    Amount: {
        type: Number
    },
    DateCreated: {
        type: Date,
        default: new Date()
    },
    CreatedBy: {
        type: String
    },
    DateUpdated: {
        type: Date
    },
    UpdatedBy: {
        type: String
    }
})

export default mongoose.model('Payment', PaymentSchema);