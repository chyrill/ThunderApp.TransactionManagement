import mongoose, { Schema } from 'mongoose';
import validator from 'validator';


const QuotationSchema = new Schema({
    ShoppingCartId: {
        type: String,
        required: [true, 'Shopping Cart Id is required']
    },
    Items: {
        type: []
    },
    TotalQuote: {
        type: Object
    },
    Status: {
        type: String
    },
    Customer: {
        type: Object
    },
    ExpirationDate: {
        type: Date
    },
    DateCreated: {
        type: Date
    },
    CreatedBy: {
        type: String
    },
    DateUpdated: {
        type: Date
    },
    UpdatedBy: {
        type: String
    },
    Context: {
        type: String
    },
    UserId: {
        type: String
    }
});

export default mongoose.model('Quotation', QuotationSchema);