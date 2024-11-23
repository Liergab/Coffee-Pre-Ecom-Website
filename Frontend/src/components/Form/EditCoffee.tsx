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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  Id: string;
};

export type EditCoffeeFormData = {
  name: string;
  description: string;
  imageFiles: FileList; // Ensure this is used for file input
  price: number;
  stock: number;
  tags: string[];
};

const EditCoffee = ({ isOpen, Id, onClose }: Props) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [selectedImages, setSelectedImages] = useState<string[]>([]); 
  const editCoffee = useMutation({
    mutationFn: useUpdateCoffeeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCoffee'] })
      onClose()
      navigate('/admin/dashboard');
      
    },
  });

  const { data, isLoading: coffeeByIdLoading } = useGetAllCoffeeProductById(Id);

  const { register, handleSubmit, reset } = useForm<EditCoffeeFormData>({
    resolver: zodResolver(EditCoffeeSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      tags: [],
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        tags: Array.isArray(data.tags) ? data.tags : [],
      });
      setSelectedImages(data.imageUrl || []);
    }
  }, [data, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const onSubmit = async (value: EditCoffeeFormData) => {
    const coffeeData = {
      ...value,
      tags: Array.isArray(value.tags) ? value.tags.map(tag => tag.trim()) : [],
    };
  
    const formData = new FormData();
    for (const key in coffeeData) {
      if (key === "imageFiles") {
        if (value.imageFiles) {
          Array.from(value.imageFiles).forEach(file => formData.append("imageFiles", file)); // Append each file correctly
        }
      } else if (typeof coffeeData[key as keyof EditCoffeeFormData] === 'string' || typeof coffeeData[key as keyof EditCoffeeFormData] === 'number') {
        formData.append(key, String(coffeeData[key as keyof EditCoffeeFormData])); // Convert to string if necessary
      }
    }
     
    toast.promise(
      editCoffee.mutateAsync({ Id, coffeeData: formData }),
      {
        loading: 'Updating product...',
        success: 'Coffee product updated successfully!',
        error: 'Error adding coffee product!',
      })
  };
  

  if (coffeeByIdLoading) return <p>Loading...</p>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Coffee Product</DialogTitle>
          <DialogDescription>
            Make changes to the coffee product. Click save when you're done.
            {Id}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="name" className="text-left">Name</Label>
            <Input
              id="name"
              className="col-span-3 w-full"
              placeholder="Kapeng Barako"
              {...register("name")}
            />
          </div>
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="description" className="text-left">Description</Label>
            <Input
              id="description"
              className="col-span-3 w-full"
              placeholder="Gawang Pilipinas"
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="tags" className="text-left">Tags</Label>
            <Input
              id="tags"
              className="col-span-3 w-full"
              placeholder="separated by commas"
              {...register("tags")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center justify-center">
            <div className="grid grid-cols items-center gap-4">
              <Label htmlFor="price" className="text-left">Price</Label>
              <Input
                type="number"
                id="price"
                className="col-span-3 w-full"
                {...register("price")}
              />
            </div>
            <div className="grid grid-cols items-center gap-4">
              <Label htmlFor="stock" className="text-left">Stocks</Label>
              <Input
                type="number"
                id="stock"
                className="col-span-3 w-full"
                {...register("stock")}
              />
            </div>
          </div>
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="imageFiles" className="text-left">Files</Label>
            <Input
              type="file"
              id="imageFiles"
              className="col-span-3 w-full"
              {...register("imageFiles")}
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {selectedImages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Selected Images:</h3>
              <div className="flex gap-2">
                {selectedImages.map((image, index) => (
                  <img key={index} src={image} alt={`Selected Preview ${index}`} className="h-16 w-16 object-cover" />
                ))}
              </div>
            </div>
          )}
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCoffee;
