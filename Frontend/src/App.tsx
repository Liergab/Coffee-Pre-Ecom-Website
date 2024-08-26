
import DarkModeToggle from './components/DarkModeToggle'
import { Button } from './components/ui/button'

const App = () => {
  return (
    <div className='dark:bg-potters-clay-900 bg-potters-clay-100 h-screen'>
      <Button>
        Test
      </Button>
      <DarkModeToggle/>
    </div>
  )
}

export default App