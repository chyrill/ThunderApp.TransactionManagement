import mongoose, { Schema } from 'mongoose';
import validator from 'validator';


const ShoppingCartSchema = new Schema({
    UserId: {
        type: String,
        required: [true, 'User Id is required']
    },
    Items: {
        type: []
    },
    Status: {
        type: String
    },
    DateCreated: {
        type: Date
    },
    CreatedBy: {
        type: String
    },
    ExpirationDate: {
        type: Date
    },
    TotalAmount: {
        type: Object
    }
});

export default mongoose.model('ShoppingCart', ShoppingCartSchema);