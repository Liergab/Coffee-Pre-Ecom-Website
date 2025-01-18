import Footer from '@/components/shared/Footer'
import Hero from '@/components/shared/Hero'
import Navbar from '@/components/shared/Navbar'
import { useLocation } from 'react-router-dom'

type Props = {
  children : React.ReactNode
}

const Layout = ({children}:Props) => {
  const location = useLocation()
  const ShowHero =  location.pathname === "/" 
  return (
    <section className='h-full w-full'>
        <div className='min-h-screen flex flex-col'>
            <Navbar/> 
            {ShowHero && <Hero/>}
            <div className='flex-1 h-full'>
                {children}
            </div>
            <Footer/>
        </div>
    </section>
  )
}

export default Layout