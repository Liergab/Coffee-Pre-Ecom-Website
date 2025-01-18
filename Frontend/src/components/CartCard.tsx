import React, { useState } from 'react';
import { Plus, Minus, Trash } from 'lucide-react';

interface CartCardProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stocks: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartCard({
  id,
  name,
  price,
  quantity,
  image,
  stocks,
  onQuantityChange,
  onRemove,
}: CartCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    onQuantityChange(id, quantity + 1);
  };

  return (
    <div
      className="relative rounded-lg p-6 mb-4 bg-gradient-to-br from-[#a46c2a] to-[#845024] dark:from-[#845024] dark:to-[#5f3824]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-[#252525] rounded-lg p-2 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-white text-lg font-semibold">{name}</h3>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/10 text-white">
            Stocks {stocks}
          </span>
        </div>
        <p className="text-white text-xl font-bold">${price.toFixed(2)}</p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => quantity > 1 && onQuantityChange(id, quantity - 1)}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-white font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(id, quantity + 1)}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-white text-xl font-bold">
            Total: ${(price * quantity).toFixed(2)}
          </p>
          <button
            onClick={() => onRemove(id)}
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
