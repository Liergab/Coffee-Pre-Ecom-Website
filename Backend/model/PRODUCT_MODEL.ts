import mongoose, { model, Schema } from "mongoose";
import { productType } from "../types";


const productSchema = new Schema<productType>({
    userId:{
        type:String,
        required:true
    },
    name:{
        type     : String,
        required : true,
    },
    description:{
        type     : String,
        required : true,
    },
    price:{
        type     : Number,
        required : true
    },
    tags:{
        type     : [{type:String, required:true}]
    },
    imageUrl:{
        type     : [{type:String, required:true}]
    },
    stock:{
        type     : Number,
        required : true,
        default  : 0
    }
},{timestamps:true})

const Product = model<productType>("Product", productSchema)

export default Product