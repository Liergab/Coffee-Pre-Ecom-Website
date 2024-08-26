import express from 'express'
import * as controller from '../controller/product'
import { authMiddleware } from '../middleware/authMiddleware';
const  productRouter = express.Router();

productRouter.post('/product', authMiddleware, controller.createProduct)
productRouter.get('/product', controller.getAllProduct)
productRouter.get('/product/:id', controller.getProductById)
productRouter.put('/product/:id',authMiddleware, controller.updateProduct)
productRouter.delete('/product/:id', authMiddleware, controller.deleteProduct)
export default productRouter