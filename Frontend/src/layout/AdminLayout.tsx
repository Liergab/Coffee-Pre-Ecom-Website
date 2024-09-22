import AdminNavbar from '@/components/admin/AdminNavbar'
import { capitalizeFirstLetter } from '@/lib/helper'
import { useCurrentUserApi } from '@/services/api/auth'
import { useLocation } from 'react-router-dom'
type Props = {
    children : React.ReactNode
}

const AdminLayout = ({children}: Props) => {
    const {data: currentUser, isLoading} =  useCurrentUserApi()
    const location = useLocation()
    const path = location.pathname.split('/admin/')[1] || '' 
    const pageName = capitalizeFirstLetter(path)
    if(isLoading) return
    
  return (
    <main className='h-full min-h-screen'>
        <AdminNavbar/>
        <div className='flex flex-row-reverse w-full justify-between'>
            <div className="flex space-x-2 text-primary">
                <h1 className="text-2xl font-bold">Welcome  {" "}
                <span>{currentUser?.firstName} {currentUser?.lastName}</span> </h1>
                <h1 className="animate-wave">👋</h1>
            </div>
            <h1 className='text-2xl'>{pageName} Page</h1>
        </div>
        {children}
    </main>
  )
}

export default AdminLayout