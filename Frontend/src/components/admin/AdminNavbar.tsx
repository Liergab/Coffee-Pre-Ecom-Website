import { Link, useNavigate } from "react-router-dom"
import DarkModeToggle from "../DarkModeToggle"
import logolight from '../../assets/images/logo.png'
import logoBlack from '../../assets/images/logoBlack.png'
import { FaCartPlus } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { AiOutlineProduct } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useAppContext } from "@/context/AppContext";
import { useCurrentUserApi, useLogoutApi } from "@/services/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import EditProfile from "../Form/EditProfile";


const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [Id, setId] = useState<string>()
  const navigate= useNavigate()
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn:useLogoutApi,
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey:['currentUser']})
      queryClient.resetQueries({queryKey:['currentUser']})
      navigate('/')
    }
  })
  const {isLoggin} = useAppContext()
  const {data:currentUser, isLoading} = useCurrentUserApi()
  if(isLoading) return

  const handleEditProfile= (pId:string) => {
    setIsOpen(true)
    setId(pId)
  }

  const logoutButton = () => {
    logoutMutation.mutateAsync()
  }

  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  
  return (
    <div className="py-6 w-full">
        <div className="flex w-full justify-between items-center">
            <div>
                <img src={logolight} alt=""  className="w-28 md:w-40 inline dark:hidden"/>
                <img src={logoBlack} alt="" className="w-28 md:w-40 hidden dark:inline"/>
            </div>

            {/* Large Device */}
            <div className=" hidden md:flex items-center md:space-x-4 lg:space-x-8 xl:space-x-10">
                <Link to='/admin/dashboard' className="navbar-link">
                    <GoHome /> <span className="text-xs xl:text-lg">Dashboard</span>
                </Link>
                <Link to='/admin/coffee' className="navbar-link">
                    <AiOutlineProduct /> <span className="text-xs xl:text-lg">Coffee</span>
                </Link>
                <Link to='/admin/analytics' className="navbar-link">
                    <FiSearch /> <span className="text-xs xl:text-lg">Analytic</span>
                </Link>
                {isLoggin && (
                  <Link to='/order' className="navbar-link">
                      <GoPackage/> <span className="text-xs xl:text-lg">Orders</span>
                  </Link>

                )}
                {isLoggin && (
                  <Link to='/cart' className="navbar-link"> 
                      <FaCartPlus/> <span className="text-xs xl:text-lg">Cart</span>
                  </Link>
                )}
                 <Menubar className="bg-potters-clay-500">
                  <MenubarMenu>
                    <MenubarTrigger className="bg-potters-clay-300"><RxHamburgerMenu/></MenubarTrigger>
                    <MenubarContent>
                      {isLoggin && (
                      <MenubarSub>
                        <MenubarSubTrigger>Profile</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem>View</MenubarItem>
                          <MenubarItem  onClick={() => handleEditProfile(currentUser?._id!)}>Edit</MenubarItem>
                        {/* <MenubarItem>Notes</MenubarItem>*/} 
                        </MenubarSubContent>
                      </MenubarSub>
                      )}
                      {isLoggin && <MenubarSeparator />}
                      {isLoggin && (
                        <MenubarItem>
                          {currentUser?.firstName} {currentUser?.lastName}
                      </MenubarItem>
                      )}
                      <MenubarItem className="space-x-4">
                        {isLoggin ? (
                            <p className="navbar-login-register-link cursor-pointer" onClick={logoutButton}>Logout</p>
                          
                          ) : (
                            <>
                                <Link to='/login' className="navbar-login-register-link">Login</Link>
                                <Link to='/register' className="navbar-login-register-link">Register</Link>
                            </>
                          )}
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                <DarkModeToggle/>
                <EditProfile isOpen={isOpen} Id={Id!} onClose={handleCloseDialog}/>
            </div>

            {/* Small Device */}
            <div className="flex items-center space-x-3 md:hidden">
            <DarkModeToggle/>
            <Menubar className="bg-potters-clay-500">
                <MenubarMenu>
                  <MenubarTrigger className="bg-potters-clay-300"><RxHamburgerMenu/></MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link to='/' className="flex items-center justify-between w-full">
                          <span>Home</span> <GoHome /> 
                      </Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link to='/product' className="flex items-center justify-between w-full">
                          <span>Product</span>  <AiOutlineProduct /> 
                      </Link>
                    </MenubarItem>
                    {isLoggin && (
                    <MenubarItem>
                      <Link to='/product' className="flex items-center justify-between w-full">
                          <span>My order</span>  <GoPackage/>  
                      </Link>
                    </MenubarItem>
                    )}
                    {isLoggin && (
                      <MenubarItem>
                        <Link to='/product' className="flex items-center justify-between w-full">
                            <span>Cart</span>     <FaCartPlus/>  
                        </Link>
                      </MenubarItem>
                    )}
                    <MenubarSeparator />
                    {isLoggin && (
                    <MenubarSub>
                      <MenubarSubTrigger>Profile</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Email link</MenubarItem>
                        <MenubarItem>Messages</MenubarItem>
                        <MenubarItem>Notes</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    )}
                    {isLoggin && <MenubarSeparator />}
                    {isLoggin && (
                      <MenubarItem>
                        {currentUser?.firstName} {currentUser?.lastName}
                     </MenubarItem>
                    )}
                    <MenubarItem className="space-x-4">
                      {isLoggin ? (
                          <p className="navbar-login-register-link cursor-pointer" onClick={logoutButton}>Logout</p>
                        
                        ) : (
                          <>
                              <Link to='/login' className="navbar-login-register-link">Login</Link>
                              <Link to='/register' className="navbar-login-register-link">Register</Link>
                          </>
                        )}
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
        </div>
    </div>
  )
}

export default AdminNavbar