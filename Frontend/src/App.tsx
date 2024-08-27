import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
const App = () => {
  return (
    <div className=' h-full min-h-screen dark:bg-potters-clay-900 bg-potters-clay-100 '>
      <div className='container'>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<HomePage/>}/>
          </Route>
          <Route path='*' element={<Navigate to='/'/>}/>

        </Routes>
      </div>
    </div>
  )
}

export default App