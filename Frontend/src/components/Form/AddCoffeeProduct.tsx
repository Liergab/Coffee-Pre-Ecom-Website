import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AddCoffeeSchema } from "@/schema/Form"
import { createCoffeeProduct } from "@/services/api/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import { FileUpload } from '@/components/ui/file-upload'

export type CoffeeFormData = {
  name: string;
  description: string;
  images: File[];
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
    mutationFn: createCoffeeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCoffee'] });
      navigate('/admin/dashboard');
      setDialogOpen(false);
      toast.success('Coffee product added successfully!');
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Error adding coffee product!';
      toast.error(errorMessage);
    }
  });
  
  const { 
    handleSubmit, 
    register, 
    reset, 
    setValue, 
    watch,
    formState: { 
      errors, 
      isSubmitSuccessful, 
      isSubmitting,
      isValid 
    } 
  } = useForm<CoffeeFormData>({
    resolver: zodResolver(AddCoffeeSchema),
    defaultValues: {
      name: '',
      description: '',
      images: [],
      price: 0,
      stock: 0,
      tags: ''
    },
    mode: 'onChange'
  });

  // Debug form errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Form Validation Errors:', errors);
    }
  }, [errors]);

  // Handle tags input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('tags', e.target.value, { shouldValidate: true });
  };

  const onSubmit = async (value: CoffeeFormData) => {
    console.log('Form Values:', value);

    const formData = new FormData();
    
    // Add basic fields
    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('price', String(value.price));
    formData.append('stock', String(value.stock));
    
    // Add tags - handle undefined/null case
    const tagsArray = value.tags.trim()
      ? value.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== '')
      : [];
    
    tagsArray.forEach(tag => {
      formData.append('tags[]', tag);
    });

    // Add images
    if (value.images && value.images.length > 0) {
      value.images.forEach((file) => {
        formData.append('imageFiles', file);
      });
    }

    try {
      console.log('Submitting to API...');
      await createProduct.mutateAsync(formData);
      console.log('API submission successful');
    } catch (error: any) {
      console.error('API Error:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to save product';
      toast.error(errorMessage);
    }
  };

  // Handle form submit with error logging
  const onSubmitWithErrors = handleSubmit(onSubmit, (formErrors) => {
    console.log('Form Submission Errors:', formErrors);
    toast.error('Please fill in all required fields correctly');
  });

  // Handle image change
  const handleImageChange = (files: File[]) => {
    console.log('Image files changed:', files);
    if (files.length === 0) {
      toast.error('Please select at least one image');
      return;
    }
    setValue('images', files, { shouldValidate: true });
  };

  // Watch for changes in images
  const watchedImages = watch('images');

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
        <form onSubmit={onSubmitWithErrors} className="grid gap-4 py-4">
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="name" className="text-left">Name</Label>
            <Input
              id="name"
              className={`col-span-3 w-full ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Kapeng Barako"
              {...register('name')}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="description" className="text-left">Description</Label>
            <Input
              id="description"
              className={`col-span-3 w-full ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Gawang Pilipinas"
              {...register('description')}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>
          <div className="grid grid-cols items-center gap-4">
            <Label htmlFor="tags" className="text-left">Tags</Label>
            <Input
              id="tags"
              className={`col-span-3 w-full ${errors.tags ? 'border-red-500' : ''}`}
              placeholder="tag1, tag2, tag3 (separate with commas)"
              {...register('tags')}
              onChange={handleTagsChange}
            />
            {errors.tags && (
              <span className="text-red-500 text-sm">{errors.tags.message}</span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center justify-center">
            <div className="grid grid-cols items-center gap-4">
              <Label htmlFor="price" className="text-left">Price</Label>
              <Input
                type="number"
                id="price"
                className={`col-span-3 w-full ${errors.price ? 'border-red-500' : ''}`}
                {...register('price', { valueAsNumber: true })}
                min="0"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">{errors.price.message}</span>
              )}
            </div>
            <div className="grid grid-cols items-center gap-4">
              <Label htmlFor="stock" className="text-left">Stocks</Label>
              <Input
                type="number"
                id="stock"
                className={`col-span-3 w-full ${errors.stock ? 'border-red-500' : ''}`}
                {...register('stock', { valueAsNumber: true })}
                min="0"
              />
              {errors.stock && (
                <span className="text-red-500 text-sm">{errors.stock.message}</span>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <Label>Images <span className="text-red-500">*</span></Label>
            <FileUpload
              value={watchedImages}
              onChange={handleImageChange}
              maxFiles={6}
            />
            {errors.images && (
              <span className="text-red-500 text-sm">{errors.images.message}</span>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoffeeProduct;