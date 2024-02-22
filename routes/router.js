import { Router } from "express";
import ProductSchema from "../models/product.model.js";
import UserSchema from "../models/user.model.js";

import sing from "jsonwebtoken/sign.js"
import * as dotenv from "dotenv";

const router = Router();

dotenv.config();

router.post("/config", async (req, res) => {
    const { name, description, price, stock, img, featured } = req.body

    // establecemos la estructura de la informacion
    const productData = {name: name, price: price, description: description, stock: stock, img: img, featured: featured}

    // ordenamos la informacion segun el schema del producto
    const newProduct = new ProductSchema(productData)

    // guardamos el producto en la DB
    const saveProduct = await newProduct.save()

    if (saveProduct) {
        res.send("Product saved on DB")
    }
}) 

router.post("/login-api", async (req, res) => {

        // tomamos el usuario y password pasado por el front
        const { user, password } = req.body;

        // buscamos en la base de datos si existe ese usuario
        const realUser = await UserSchema.findOne({ user: user } ).catch(
            (error) => {
                console.log("Error - ", error)
            }
        )

        // comprobamos que las contraseñas o usuario coincidan
        if (!realUser || realUser.password != password) {
            return res.status(401).json({message: "User or Password doesn't match!"})
        }

        // firmamos el token
        const token = sing( { id: realUser._id, user: realUser.user }, process.env.JWT_SECRET_WORD, {expiresIn: "24h"} );

        // devolvemos el token al front
        res.status(200).send({message:"Welcome back!", token})
})

router.get("/get-products-api", async (req, res) => {
    try {
        const products = await ProductSchema.find();
        res.status(200).json(products);
    } catch (error) {
        console.log("Getting products error - ", error)
    }

}) 

router.post("/remove-product-api", async (req,res) => {
    // recuperamos el nombre y categoria del producto a remover
    const { name, category } = req.body;

    try {
        // buscamos el producto y lo eliminamos
        // const removedProduct = await ProductSchema.findOne({name: name});

        const removedProduct = await ProductSchema.deleteOne({name: name});
        const message = {message: `${name} ${category} has been removed succesfully`}
        res.status(200).send(message)

    } catch (error) {
        console.log("Removing product error - ", error)
        const message = {message: `Error removing ${name}`}
        res.status(400).send(message)
    }

})

router.post("/update-product-api", async (req, res) => {
    const { id, name, desc, stock, price, category } = req.body;

    try {
        const toUpdateProduct = await ProductSchema.updateOne({_id:id}, {$set : {"name": name, "description" : desc, "stock" : stock, "price" : price, "category" : category}})
        // console.log(toUpdateProduct)

        const message = {message: `id: ${id} has been modified ${name}`}
        res.status(200).send(message)

    } catch (error) {
        console.log("Updating product error - ", error)
        const message = {message: `Error updating ${name}`}
        res.status(400).send(message)
    }


})

router.post("/add-product-api", async (req, res) => {
    const {name, desc, category, price, stock, amount} = req.body

    try {
        const newProduct = await ProductSchema.insertMany({name:name, description:desc, category:category, price:price, stock:stock, amount:amount})
        
        const message = {message: `New product ${name} has been added`}
        res.status(200).send(message)

    } catch (error) {
        console.log("Posting new product error - ", error)
        const message = {message: `Error adding ${name}`}
        res.status(400).send(message)
    }


})

export default router