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
        <div key={p._id} 
          className="relative w-full p-4 rounded-2xl border-[1px] flex flex-col gap-6 transition-all duration-300 overflow-hidden group
            dark:border-[#333]/40 border-gray-200
            dark:bg-gradient-to-br dark:from-[#171717]/95 dark:to-[#111]/98
            bg-gradient-to-br from-white to-gray-50"
        >
          {/* Indicator line */}
          <div 
            className="absolute top-0 left-0 w-full h-[2px] dark:opacity-30 opacity-50"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 165, 0, 0.5), transparent)'
            }}
          />

          {/* Abstract background shapes */}
          <div className="absolute inset-0 opacity-70"
            style={{
              background: `
                radial-gradient(circle at 100% 100%, rgba(30, 30, 30, 0.95) 0%, transparent 60%),
                radial-gradient(circle at 0% 0%, rgba(40, 40, 40, 0.9) 0%, transparent 50%)
              `
            }}
          />

          <div className="relative p-4 rounded-xl
            dark:bg-[#1a1a1a]/40 bg-gray-50/50">
            <img
              src={Array.isArray(p.imageUrl) ? p.imageUrl[0] || coffee : p.imageUrl || coffee}
              className="w-full h-[300px] rounded-xl object-cover object-center"
              alt={p.name}
            />
            <div
              className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer rounded-xl
                dark:bg-[#111]/80 bg-gray-900/60"
              onClick={() => setSelectedProduct(p)}
            >
              <span className='text-xl font-bold text-white/90'>Preview</span>
            </div>
          </div>

          <div className="relative flex justify-between items-center px-2">
            <div>
              <h1 className="font-medium text-lg
                dark:text-white/90 text-gray-800">{p.name}</h1>
              <div className="mt-1 py-1 px-3 rounded-full text-sm backdrop-blur-[2px]
                dark:bg-[#1a1a1a]/40 dark:text-white/80
                bg-gray-100 text-gray-600">
                Stocks {p.stock}
              </div>
            </div>
            <h1 className="text-2xl font-semibold
              dark:text-white/90 text-gray-800">${p.price}</h1>
          </div>

          <Button 
            className="relative w-full flex items-center justify-center text-lg gap-2 transition-colors duration-300 backdrop-blur-[2px]
              dark:bg-[#1a1a1a]/30 dark:hover:bg-[#1a1a1a]/50 dark:border-[#ffa500]/10 dark:text-white/90 dark:hover:border-[#ffa500]/20
              bg-gray-100 hover:bg-gray-200 border-orange-200 text-gray-700 hover:border-orange-300
              border-[0.5px]"
          >
            <FaCartPlus /> Add to Cart
          </Button>
        </div>
      ))}

      {selectedProduct && (
        <CoffeeImagePreview 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default CoffeeProductCard;
