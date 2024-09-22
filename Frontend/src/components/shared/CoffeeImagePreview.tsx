import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import coffee from '../../assets/images/coffee.webp';
  type CoffeeImagePreviewProps = {
    product: {
      _id: string;
      name: string;
      imageUrl: string[]; 
    };
    onClose: () => void;
  };
  
  const CoffeeImagePreview = ({ product, onClose }: CoffeeImagePreviewProps) => {
    return (
      <AlertDialog open={true} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{product.name} Preview</AlertDialogTitle>
            <AlertDialogDescription>
              <img
                src={product.imageUrl[0] || coffee} 
                alt={product.name}
                className="w-full h-auto rounded"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default CoffeeImagePreview;
  