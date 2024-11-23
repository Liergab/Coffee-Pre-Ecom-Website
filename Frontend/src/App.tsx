import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import Login from "./pages/PublicPages/Login"
import Register from "./pages/PublicPages/Register"
import Verification from "./pages/PublicPages/Verification"
import Dashboard from "./pages/AdminPages/Dashboard"
import AdminProtect from "./layout/AdminProtect"
import ForbiddenPage from "./pages/PublicPages/ForbiddenPage"
import Search from "./pages/PublicPages/Search"
import AdminLayout from "./layout/AdminLayout"
import Coffee from "./pages/AdminPages/Coffee"
import { Toaster }   from 'react-hot-toast';
import Analytics from "./pages/AdminPages/Analytics"
const App = () => {
  return (
    <div className=' h-full min-h-screen'>
      <div className='container'>
      <Toaster position='top-right'  toastOptions={{duration:5000}} />
        <Routes>
          <Route path="/" element={<Layout><HomePage/></Layout>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
          <Route path='/login' element={<Layout><Login/></Layout>} />
          <Route path="/register"element={<Layout><Register/></Layout>}/>
          <Route path="search" element={<Layout><Search/></Layout>} />
          <Route path="/verification"element={<Layout><Verification/></Layout>}/>
          <Route element={<AdminProtect/>}>
              <Route path="/admin/dashboard" element={<AdminLayout><Dashboard/></AdminLayout>}/>
              <Route path="/admin/coffee"  element={<AdminLayout><Coffee/></AdminLayout>}/>
              <Route path="/admin/analytics" element={<AdminLayout><Analytics/></AdminLayout>}/>
          </Route>
          <Route path="/forbidden" element={<ForbiddenPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App