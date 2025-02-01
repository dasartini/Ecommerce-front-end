import { useState } from 'react'
import Header from './components/Header'
import ProductsGrid from './components/ProductsGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    </>
  )
}

export default App
