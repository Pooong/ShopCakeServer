import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        color: { type: String, require: true },
        quantity: { type: Number, require: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
