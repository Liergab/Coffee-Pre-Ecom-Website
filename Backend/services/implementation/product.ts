import { productType } from "../../types";
import ProductRepository from '../../repository/product'




class ProductImplement {

    async createProduct(productData:productType):Promise<productType>{
        return  await ProductRepository.createProduct(productData)
    }

    async getAllProduct():Promise<productType[]>{
        return await ProductRepository.find()
    }

    async updateProduct(id:string, productData:Partial<productType>, userId:string):Promise<productType | null>{

        const updateproduct = await ProductRepository.updateById(id, productData)
        if(userId !== updateproduct?.userId){
            throw new Error('Access denied: Only owner of this product are authorized to update products.')
        }
        if(!updateproduct){
            throw new Error('Product not found!')
        }
        return  updateproduct
    }

    async deleteProduct (id:string, userId:string):Promise<productType | null>{
     
        const product = await ProductRepository.findById(id)
        
        if(!product){
            throw new Error('Product not found!')
        }
   
        if(userId !== product?.userId){
            throw new Error('Access denied: Only owner of this product are authorized to delete products.')
        }
        const productDeleted = await ProductRepository.deleteById(product.id)

      

        return productDeleted
    }
}

export default new ProductImplement()