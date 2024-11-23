import express from 'express'
import * as controller from '../controller/product'
import { authMiddleware } from '../middleware/authMiddleware';
import multer from 'multer'

const  productRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({
    storage:storage,
    limits:{
        fileSize:5 * 1024 * 1024 //5MB
    }
})

productRouter.post('/product', authMiddleware, upload.array('imageFiles', 6), controller.createProduct)
productRouter.get('/product', controller.getAllProduct)
productRouter.get('/search', controller.getallProductBySearch)
productRouter.get('/product/:id', controller.getProductById)
productRouter.put('/product/:id',authMiddleware, upload.array('imageFiles', 6),controller.updateProduct)
productRouter.delete('/product/:id', authMiddleware, controller.deleteProduct)
export default productRouter