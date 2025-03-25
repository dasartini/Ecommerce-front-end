import { useState } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import { Route, Routes } from 'react-router'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import { BasketProvider } from './contexts/BasketContext'
import Basket from './components/Basket'
import CheckoutForm from './components/CheckoutForm'
import { CustomerDataProvider } from './contexts/CustomerContext'
import Login from './components/LogIn'
import { AuthProvider } from './contexts/AuthContext'
import AdminPage from './components/AdminPage'
import PrivateRoute from './protect/PrivateRoute'
import AllOrders from "./components/adminComponents/AllOrders"
import CreateProduct from "./components/adminComponents/CreateProduct"
import ModifyProduct from "./components/adminComponents/ModifyProduct"
import CreateCategory from "./components/adminComponents/CreateCategory"
import Footer from './components/Footer'
import Contact from './components/Contact'
import About from './components/About'
function App() {

  return (
    <div>
      <AuthProvider>
      <BasketProvider>
        <CustomerDataProvider>
    <Header/>
    <main>
  

    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<Login />} />
  <Route
    path="/admin"
    element={
      <PrivateRoute>
        <AdminPage />
      </PrivateRoute>
    }
  >
    <Route path="create-product" element={<CreateProduct />} />
    <Route path="orders" element={<AllOrders />} />
    <Route path="create-category/modify-products/:id" element={<ModifyProduct />} />
    <Route path="create-category" element={<CreateCategory />} />

  </Route>
  <Route path='/about' element={<About/>}/>
  <Route path="/shop" element={<AllProducts />} />
  <Route path="/shop/:id" element={<SingleProduct />} />
  <Route path="/basket" element={<Basket />} />
  <Route path="/checkout-form" element={<CheckoutForm />} />
  <Route path='/contact' element={<Contact />}/>
</Routes>
<Footer/>
    </main>
    </CustomerDataProvider>
    </BasketProvider>
    </AuthProvider>
    </div>
  )
}

export default App

