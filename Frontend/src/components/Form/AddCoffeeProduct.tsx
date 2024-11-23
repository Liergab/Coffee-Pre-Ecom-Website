import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AddCoffeeSchema } from "@/schema/Form"
import { useCreateCoffeeProduct } from "@/services/api/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import * as z from 'zod'
import toast from 'react-hot-toast'
export type AddCoffeeFormProps = z.infer<typeof AddCoffeeSchema> 
export type CoffeeFormData = {
  name: string;
  description: string;
  imageFiles: FileList;
  imageUrls: string[];
  price: number;
  stock: number;
  tags: string;
}

const AddCoffeeProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // State to manage dialog open/close
  const [isDialogOpen, setDialogOpen] = useState(false);
  
  const createProduct = useMutation({
    mutationFn: useCreateCoffeeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCoffee'] });
      navigate('/admin/dashboard');
      setDialogOpen(false);
    }
  });
  
  const { handleSubmit, register, reset, formState: { errors, isSubmitSuccessful } } = useForm<CoffeeFormData>({
    resolver: zodResolver(AddCoffeeSchema)
  });

  const onSubmit = (value: CoffeeFormData) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("description", value.description);
    formData.append("price", value.price.toString());
    formData.append('tags', value.tags);
    formData.append("stock", value.stock.toString());

    Array.from(value.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    toast.promise(
      createProduct.mutateAsync(formData),
      {
        loading: 'Adding product...',
        success: 'Coffee product added successfully!',
        error: 'Error adding coffee product!',
      })
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          Add Coffee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[490px]">
        <DialogHeader>
          <DialogTitle>Add Coffee Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="name" className="text-left">Name</Label>
            <Input
              id="name"
              className="col-span-3 w-full"
              placeholder="Kapeng Barako"
              {...register('name')}
            />
          </div>
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="description" className="text-left">Description</Label>
            <Input
              id="description"
              className="col-span-3 w-full"
              placeholder="Gawang Pilipinas"
              {...register('description')}
            />
          </div>
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="tags" className="text-left">Tags</Label>
            <Input
              id="tags"
              className="col-span-3 w-full"
              placeholder="separated by commas"
              {...register('tags')}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center justify-center">
            <div className="grid grid-cols items-center gap-4">
              <Label htmlFor="price" className="text-left">Price</Label>
              <Input
                type="number"
                id="price"
                className="col-span-3 w-full"
                {...register('price')}
              />
            </div>
            <div className="grid grid-cols items-center gap-4">
              <Label htmlFor="stock" className="text-left">Stocks</Label>
              <Input
                type="number"
                id="stock"
                className="col-span-3 w-full"
                {...register('stock')}
              />
            </div>
          </div>
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="imageFiles" className="text-left">File</Label>
            <Input
              type="file"
              id="imageFiles"
              className="col-span-3 w-full"
              {...register('imageFiles')}
              multiple
              accept='image/*'
            />
          </div>
          <Button type="submit">Save changes</Button>
        </form>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoffeeProduct;
