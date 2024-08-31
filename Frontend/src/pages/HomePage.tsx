import CoffeeList from "@/components/shared/CoffeList"





const HomePage = () => {

 
  return (
    
    <section className=" container h-screen w-full flex flex-col  items-center ">
        <h1 className="mt-10 text-5xl font-bold dark:text-secondary-foreground text-primary">Coffee List</h1>
        <CoffeeList/>
        
    </section>
  )
}

export default HomePage


