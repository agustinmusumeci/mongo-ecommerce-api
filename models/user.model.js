import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {user: {type:String, required: true},
    password: {type:String, required: true}}
)

export default mongoose.model("User", UserSchema);