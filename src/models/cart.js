import mongoose,{Schema} from 'mongoose';


const CartSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
},
    {timestamps: true}
)

const Cart = mongoose.models.Cart || mongoose.model("Cart",CartSchema);

export default Cart;