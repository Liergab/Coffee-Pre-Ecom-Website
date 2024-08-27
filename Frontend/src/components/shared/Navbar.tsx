import { Link } from "react-router-dom"
import DarkModeToggle from "../DarkModeToggle"


const Navbar = () => {
  return (
    <div className="py-6 w-full">
        <div className="flex w-full justify-between items-center">
            <div>
                Logo
            </div>
            <div className=" hidden md:flex items-center md:space-x-8 lg:space-x-10 xl:space-x-20">
                <Link to='/coffee'>Coffe</Link>
                <Link to='/coffee'>Coffe</Link>
                <Link to='/coffee'>Coffe</Link>
                <Link to='/coffee'>Coffe</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>register</Link>
                <DarkModeToggle/>
            </div>
        </div>
       
    </div>
  )
}

export default Navbar