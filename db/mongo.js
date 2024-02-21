import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const URI = process.env.URI

// conectamos a la DB
export default mongoose.connect(URI)
    .then(() => {console.log("DB connected")})
    .catch((error) => {console.log("DB connection failured - ", error)})



