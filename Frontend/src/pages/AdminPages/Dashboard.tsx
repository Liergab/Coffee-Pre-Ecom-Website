import { Button } from "@/components/ui/button"
import { DataTableDemo } from "./DataTableDemo"


const Dashboard = () => {

  return (
    <main className=' h-full min-h-[600px] border mt-10  rounded'>
      <div className="p-4">
        <Button>Add</Button>
        <div>
        <DataTableDemo/>
        </div>
      </div>
    </main>
  )
}

export default Dashboard