import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const clientOptions = { serverApi: { version: '1', strict: false, deprecationErrors: false } };

const URI = process.env.URI

// conectamos a la DB
// export default mongoose.connect(URI, clientOptions)
//     .then(() => {console.log("DB connected")})
//     .catch((error) => {console.log("DB connection failured - ", error)})

const mongodb = async() => {
    try {
        await mongoose.connect(URI, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } catch(error) {
        console.log("Error - ", error)
        await mongoose.disconnect();
    }
}

export default mongodb



