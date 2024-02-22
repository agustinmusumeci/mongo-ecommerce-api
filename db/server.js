import mongodb from "./mongo.js";
import * as dotenv from "dotenv";
import express from "express";
import router from "../routes/router.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// establezco el cors para permitir fetch's en el front
app.use(cors({origin: true, credentials: true}));

// routes
app.use("/", router)

// inicializamos el servidor
app.listen(PORT, () => {
    console.log("Server running")
})

mongodb()
