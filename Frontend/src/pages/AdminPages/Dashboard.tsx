import { Button } from "@/components/ui/button"
import { DataTableDemo } from "./DataTableDemo"
import AddCoffeeProduct from "@/components/Form/AddCoffeeProduct"


const Dashboard = () => {

  return (
    <main className=' h-full min-h-[600px] border mt-10  rounded'>
      <div className="p-4 w-full">
        <AddCoffeeProduct/>
        <div>
        <DataTableDemo/>
        </div>
      </div>
    </main>
  )
}

export default Dashboard