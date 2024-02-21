import mongoose from "mongoose";

// creamos el schema del producto
const ProductSchema = new mongoose.Schema(
    {name: {type: String, require: true},
    price: {type: Number, require: true},
    description: {type: String, require: true},
    stock: {type: Number, require: true},
    img: {type: String, require: true},
    category : {type: String, require: true},
    amount : {type: Number, require: true},
    featured: {type:  Boolean, require: true}}
)

export default mongoose.model("Product", ProductSchema);