import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import Login from "./pages/PublicPages/Login"
const App = () => {
  return (
    <div className=' h-full min-h-screen dark:bg-potters-clay-900 bg-potters-clay-100 '>
      <div className='container'>
        <Routes>
            <Route path="/" element={<Layout><HomePage/></Layout>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
          <Route path='/login' element={<Layout><Login/></Layout>} />
        </Routes>
      </div>
    </div>
  )
}

export default App