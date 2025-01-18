import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useGetAllCoffeeProductById, useUpdateCoffeeProduct } from "@/services/api/product";
import { EditCoffeeSchema } from "@/schema/Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../ui/file-upload";

interface EditCoffeeProps {
  isOpen: boolean;
  onClose: () => void;
  Id: string;
}

interface EditCoffeeFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  tags: string;
}

const EditCoffee = ({ isOpen, Id, onClose }: EditCoffeeProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState<string[]>([]); 
  const [newImageFiles, setNewImageFiles] = useState<FileList | null>(null);

  const { data, isLoading: coffeeByIdLoading } = useGetAllCoffeeProductById(Id);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditCoffeeFormData>({
    resolver: zodResolver(EditCoffeeSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      tags: "",
    },
  });

  // Clean up object URLs
  const cleanupObjectUrls = (urls: string[]) => {
    urls.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
  };

  const editCoffee = useMutation({
    mutationFn: useUpdateCoffeeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCoffee'] })
        .then(() => {
          cleanupObjectUrls(selectedImages);
          onClose();
          setTimeout(() => navigate('/admin/dashboard'), 100);
        });
    },
    onError: (error) => {
      console.error('Update failed:', error);
      cleanupObjectUrls(selectedImages);
    }
  });

  // Load initial data
  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '',
      });
      setSelectedImages(data.imageUrl || []);
    }
  }, [data, reset]);

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanupObjectUrls(selectedImages);
  }, [selectedImages]);

  const handleImageChange = (files: File[]) => {
    if (files.length > 0) {
      cleanupObjectUrls(selectedImages);

      const dt = new DataTransfer();
      files.forEach(file => dt.items.add(file));
      setNewImageFiles(dt.files);

      const newImages = files.map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev.filter(url => !url.startsWith('blob:')), ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => {
      const removedUrl = prev[index];
      if (removedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(removedUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const onSubmit = async (value: EditCoffeeFormData) => {
    const formData = new FormData();
    
    // Add basic fields
    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('price', String(value.price));
    formData.append('stock', String(value.stock));
    
    // Add tags - handle undefined/null case
    const tagsArray = typeof value.tags === 'string' && value.tags.trim()
      ? value.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== '')
      : [];
    
    tagsArray.forEach(tag => {
      formData.append('tags[]', tag);
    });

    // Add existing images
    const existingImages = selectedImages.filter(url => url.startsWith('http'));
    existingImages.forEach(url => {
      formData.append('existingImages[]', url);
    });
    
    // Add new images
    if (newImageFiles?.length) {
      Array.from(newImageFiles).forEach(file => {
        formData.append('imageFiles', file);
      });
    }
     
    toast.promise(
      editCoffee.mutateAsync({ Id, coffeeData: formData }),
      {
        loading: 'Updating Coffee Product...',
        success: 'Coffee Product Updated!',
        error: 'Error Updating Coffee Product'
      }
    );
  };

  if (coffeeByIdLoading) {
    return <div className="flex items-center justify-center p-4">Loading...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Coffee Product</DialogTitle>
          <DialogDescription>
            Make changes to the coffee product. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input {...register("name")} className={errors.name ? "border-red-500" : ""} />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Input {...register("description")} className={errors.description ? "border-red-500" : ""} />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input 
              {...register("tags")} 
              placeholder="Enter tags separated by commas" 
              className={errors.tags ? "border-red-500" : ""} 
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">Example: coffee, arabica, hot</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input 
                type="number" 
                min="0"
                step="0.01"
                {...register("price", { 
                  valueAsNumber: true,
                  setValueAs: v => v === "" ? undefined : parseFloat(v)
                })} 
                className={errors.price ? "border-red-500" : ""} 
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="stock">Stocks</Label>
              <Input 
                type="number"
                min="0"
                step="1"
                {...register("stock", { 
                  valueAsNumber: true,
                  setValueAs: v => v === "" ? undefined : parseInt(v)
                })} 
                className={errors.stock ? "border-red-500" : ""} 
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Images</Label>
            <FileUpload
              onChange={handleImageChange}
              value={newImageFiles ? Array.from(newImageFiles) : undefined}
              className="w-full"
            />
          </div>

          {selectedImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image}
                    alt={`Selected ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 
                             opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCoffee;
