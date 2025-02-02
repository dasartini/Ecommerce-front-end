import { useState } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import { Route, Routes } from 'react-router'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import { BasketProvider } from './contexts/BasketContext'
import Basket from './components/Basket'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BasketProvider>
    <Header/>
    <main>
    <Routes>
 
    <Route path='/' element={<HomePage/>} />
    <Route path="/shop" element={<AllProducts/>}/>
    <Route path="/shop/:id" element={<SingleProduct/>}/>
    <Route path="/basket" element={<Basket/>}/>

    </Routes>
    </main>
    </BasketProvider>
    </div>
  )
}

export default App
