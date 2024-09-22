import CoffeeProductCard from "@/components/shared/CoffeeProductCard"
import CoffeeList from "@/components/shared/CoffeList"
import { useGetAllCoffee } from "@/services/api/product"

const HomePage = () => {
  const{data:product, isLoading} = useGetAllCoffee()

  if(isLoading) return
  
 
  return (
    
    <section className="px-4 md:container h-full w-full flex flex-col  items-center ">
        <h1 className="mt-10 mb-5 text-5xl font-bold dark:text-secondary-foreground text-primary">Coffee List</h1>
        <CoffeeList/>
        <div className="mt-10 w-full  h-full rounded-md p-2 md:p-8">
          <CoffeeProductCard product={product!}/>
        </div>
        
    </section>
  )
}

export default HomePage


