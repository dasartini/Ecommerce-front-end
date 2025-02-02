import { useState } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import { Route, Routes } from 'react-router'
import AllProducts from './components/AllProducts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Header/>
    <main>
    <Routes>
 
    <Route path='/' element={<HomePage/>} />
    <Route path="/shop" element={<AllProducts/>}/>
   
    </Routes>
    </main>
    </div>
  )
}

export default App
