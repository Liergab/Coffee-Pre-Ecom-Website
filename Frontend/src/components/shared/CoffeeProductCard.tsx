import { productType } from '@/types';
import coffee from '../../assets/images/coffee.webp';
import { Button } from '../ui/button';
import { FaCartPlus } from "react-icons/fa";
import { useState } from 'react';
import CoffeeImagePreview from './CoffeeImagePreview';

type Props = {
  product: productType[];
};

const CoffeeProductCard = ({ product }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<productType | null>(null);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
      {product.map((p) => (
        <div key={p._id} className="w-full p-4 border border-gray-200 rounded-md flex flex-col gap-10">
          <div className="bg-gray-50 p-4 relative">
            <img
              src={Array.isArray(p.imageUrl) ? p.imageUrl[0] || coffee : p.imageUrl || coffee}
              className="w-full h-auto rounded"
              alt={p.name}
            />
            <div
              className="absolute inset-0 bg-white bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
              onClick={() => setSelectedProduct(p)} // Set the selected product on click
            >
              <span className='text-xl font-bold'>Preview</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-4">
            <div>
              <h1 className="text-gray-400">{p.name}</h1>
              <h1 className="py-1 px-2 bg-gray-200 rounded text-gray-400">Stocks {p.stock}</h1>
            </div>
            <h1 className="text-xl text-gray-400">${p.price}</h1>
          </div>
          <div>
            <Button className="w-full flex items-center text-lg gap-1 bg-transparent border border-gray-300 text-primary hover:bg-gray-50">
              <FaCartPlus /> Add to Cart
            </Button>
          </div>
        </div>
      ))}

      {selectedProduct && (
        <CoffeeImagePreview 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} // Clear selected product on close
        />
      )}
    </div>
  );
};

export default CoffeeProductCard;
