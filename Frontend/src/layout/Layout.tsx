import Footer from '@/components/shared/Footer'
import Hero from '@/components/shared/Hero'
import Navbar from '@/components/shared/Navbar'

import { Outlet } from 'react-router-dom'



const Layout = () => {
  return (
    <section className='h-full w-full'>
        <div className='min-h-screen flex flex-col'>
            <Navbar/> 
            <Hero/>
            <div className=' flex-1 bg-potters-clay-300'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    </section>
  )
}

export default Layout