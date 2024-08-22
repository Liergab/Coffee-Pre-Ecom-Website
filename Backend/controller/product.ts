import { NextFunction, Request, Response } from "express";
import ProductImplementation from '../services/implementation/product'

//vendor
export const createProduct = async(req:Request,res:Response, next:NextFunction) => {
    try {
        const userId = req.user?.id
        
        if(req.user?.role !== "vendor"){
            res.status(403)
            throw new Error('Access denied: Only vendors are authorized to create products.')
        }
        const product = await ProductImplementation.createProduct({...req.body, userId:userId})
        res.status(200).json({message:"Product Created!", product})
        
    } catch (error:any) {
        next(error)
    }
}

//public
export const getAllProduct = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const product = await ProductImplementation.getAllProduct()
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

//vendor
export const updateProduct = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const{id} = req.params

        const userId = req.user?.id

        if(req.user?.role !== "vendor"){
            res.status(403)
            throw new Error('Access denied: Only vendors are authorized to update products.')
        }

        const product = await ProductImplementation.updateProduct(id, req.body, userId)

        res.status(200).json(product)

    } catch (error) {
        next(error)
    }
}

//vender
export const deleteProduct = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const{id} = req.params
        const userId = req.user?.id
        if(req.user?.role !== "vendor"){
            res.status(403)
            throw new Error('Access denied: Only vendors are authorized to delete products.')
        }
        await ProductImplementation.deleteProduct(id, userId)

        res.status(200).json({message:"Product Deleted!"})

    } catch (error) {
        next(error)
    }
}