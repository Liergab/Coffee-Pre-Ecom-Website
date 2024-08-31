import { useAppContext } from '@/context/AppContext'
import { useCurrentUserApi } from '@/services/api/auth'


import { Navigate, Outlet } from 'react-router-dom'

const AdminProtect = () => {
    
  
    const {isLoggin} = useAppContext()
    const {data, isLoading} = useCurrentUserApi()
    
  if(isLoading) return

   
  return (
    <div>
        { isLoggin && data?.role == "vendor" ? <Outlet/> : <Navigate to='/forbidden'/>}
    </div>
  )
}

export default AdminProtect