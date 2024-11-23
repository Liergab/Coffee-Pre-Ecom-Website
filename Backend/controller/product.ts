import { NextFunction, Request, Response } from "express";
import ProductImplementation from '../services/implementation/product'
import cloudinary from 'cloudinary'
import { ProductSearchResponse } from "../types";
//vendor
export const createProduct = async(req:Request,res:Response, next:NextFunction) => {
    try {
        const userId = req.user?.id
        const imageFiles =req.files as Express.Multer.File[]
        const uploadPromise =imageFiles.map(async(image) =>{
            const b64 =Buffer.from(image.buffer).toString("base64")
            let dataUri="data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataUri)
            return res.url;

        })
        const imageUrls = await Promise.all(uploadPromise)
        if(req.user?.role !== "vendor"){
            res.status(403)
            throw new Error('Access denied: Only vendors are authorized to create products.')
        }
        const product = await ProductImplementation.createProduct({...req.body, userId:userId, imageUrl: imageUrls})
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

export const updateProduct = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        // Check if files were uploaded
        const imageFiles = req.files as Express.Multer.File[];

        // If no files are uploaded, skip the file processing
        let imageUrls: string[] = [];
        if (imageFiles && imageFiles.length > 0) {
            const uploadPromise = imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString("base64");
                let dataUri = "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataUri);
                return res.url;
            });
            imageUrls = await Promise.all(uploadPromise);
        }

        if (req.user?.role !== "vendor") {
            res.status(403);
            throw new Error('Access denied: Only vendors are authorized to update products.');
        }

        // Update the product with the provided data and image URLs (if any)
        const product = await ProductImplementation.updateProduct(id, { ...req.body, imageUrl: imageUrls }, userId);

        res.status(200).json(product);

    } catch (error: any) {
        if (error.message === 'Access denied: Only owner of this product are authorized to update products.') {
            res.status(403);
        }
        next(error);
    }
};


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

    } catch (error:any) {
        if(error.message === 'Product not found!'){
            res.status(404)
        }
        if(error.message === 'Access denied: Only owner of this product are authorized to delete products.'){
            res.status(403)
        }
        next(error)
    }
}

//public 

export const getProductById = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params
        const product = await ProductImplementation.getProductById(id)

        res.status(200).json(product)
        
    } catch (error:any) {

        if(error.message === 'Product not found!'){
            res.status(404)
        }
        next(error)
    }
}

export const getallProductBySearch = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const pageSize = 5
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        )

        const {data:product, total} = await ProductImplementation.searchProducts(req.query, pageSize, pageNumber)

        const response:ProductSearchResponse ={
            data:product,
            pagination:{
                total,
                page:pageNumber,
                pages:Math.ceil(total/pageSize)
            }
        }
        res.json(response)
    } catch (error) {
        next(error)
    }

}


export const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
  
    if (queryParams.productname) {
      constructedQuery.$or = [
        { name: new RegExp(queryParams.productname, "i") },
        { description: new RegExp(queryParams.productname, "i") },
      ];
    }
  
    // if (queryParams.adultCount) {
    //   constructedQuery.adultCount = {
    //     $gte: parseInt(queryParams.adultCount),
    //   };
    // }
  
    // if (queryParams.childCount) {
    //   constructedQuery.childCount = {
    //     $gte: parseInt(queryParams.childCount),
    //   };
    // }
  
    // if (queryParams.facilities) {
    //   constructedQuery.facilities = {
    //     $all: Array.isArray(queryParams.facilities)
    //       ? queryParams.facilities
    //       : [queryParams.facilities],
    //   };
    // }
  
    // if (queryParams.types) {
    //   constructedQuery.type = {
    //     $in: Array.isArray(queryParams.types)
    //       ? queryParams.types
    //       : [queryParams.types],
    //   };
    // }
  
    if (queryParams.stars) {
      const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : parseInt(queryParams.stars);
  
      constructedQuery.starRating = { $in: starRatings };
    }
  
    if (queryParams.maxPrice) {
      constructedQuery.price = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
  };