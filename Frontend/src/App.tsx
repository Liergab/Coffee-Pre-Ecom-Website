import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import Login from "./pages/PublicPages/Login"
import Register from "./pages/PublicPages/Register"
import Verification from "./pages/PublicPages/Verification"
import Dashboard from "./pages/AdminPages/Dashboard"
import AdminProtect from "./layout/AdminProtect"
import ForbiddenPage from "./pages/PublicPages/ForbiddenPage"
const App = () => {
  return (
    <div className=' h-full min-h-screen dark:bg-potters-clay-900 bg-potters-clay-100 '>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Layout><HomePage/></Layout>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
          <Route path='/login' element={<Layout><Login/></Layout>} />
          <Route path="/register"element={<Layout><Register/></Layout>}/>
          <Route path="/verification"element={<Layout><Verification/></Layout>}/>
          <Route element={<AdminProtect/>}>
              <Route path="/admin/dashboard" element={<Dashboard/>}/>
          </Route>
          <Route path="/forbidden" element={<ForbiddenPage/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App