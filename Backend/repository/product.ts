import Product from "../model/PRODUCT_MODEL"
import product from "../services/implementation/product"
import { productType } from "../types"

class ProductRepository {
    async createProduct(productData:Partial<productType>):Promise<productType>{
        return await Product.create(productData)
    }

    async save(product:productType):Promise<productType>{
        return await product.save()
    }

    async find():Promise<productType[]>{
        return await Product.find().exec()
    }

    async findById(id:string):Promise<productType | null>{
        return await Product.findById(id).exec()
    }

    async updateById(id:string, productData:Partial<productType>):Promise<productType | null>{
        return await Product.findByIdAndUpdate(id, productData,{new:true}).exec()
    }

    async deleteById(id:string):Promise<productType | null>{
        return await Product.findByIdAndDelete(id)
    }
    async searchProduct (query:any, sortOption:any, pageSize:any, pageNumber:any):Promise<{data:productType[], total:number}>{
        const skip = (pageNumber - 1) * pageSize;

        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(pageSize)
            .exec();

        const total = await Product.countDocuments(query);

        return { data: products, total };
    }

}

export default new ProductRepository()