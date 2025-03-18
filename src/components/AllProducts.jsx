import React from 'react'
import ProductsGrid from './ProductsGrid'
import Design2 from './Design2'
import { useEffect } from 'react'

export default function AllProducts() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  return (
    <>
    <Design2/>
    <ProductsGrid/>
    </>
  )
}
