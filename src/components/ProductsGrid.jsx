import React, { useEffect, useState, useRef } from 'react';
import { allProducts, getCategories } from '../../api';
import GridStyle from '../styles/GridStyle';
import { Link } from 'react-router';

export default function ProductsGrid() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortOption, setSortOption] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const targetDivRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [originalTop, setOriginalTop] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector('header');
    setNavbarHeight(navbar.offsetHeight);
  
    const targetDiv = targetDivRef.current;
    if (targetDiv) {
      const rect = targetDiv.getBoundingClientRect();
      setOriginalTop(rect.top + window.pageYOffset);
    }
  
    const handleScroll = () => {
      if (window.innerWidth <= 768) return;
      if (!targetDiv) return;
  
      const scrollPosition = window.pageYOffset;
      const targetDivTop = originalTop - scrollPosition;
  
      if (targetDivTop <= navbarHeight) {
        targetDiv.style.position = 'fixed';
        targetDiv.style.top = `${navbarHeight + 10}px`;
        targetDiv.style.zIndex = '1';
      } else {
        targetDiv.style.position = 'absolute';
        targetDiv.style.top = '1rem';
        targetDiv.style.left = '0.5rem';
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navbarHeight, originalTop]);
 

  useEffect(() => {
    async function fetchData() {
      try {
        const productData = await allProducts()
        const categoryData = await getCategories()

        setProducts(productData)
        setFilteredProducts(productData)
        setCategories(categoryData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    let sortedProducts = [...filteredProducts]

    if (sortOption === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price)
    } else if (sortOption === "alphabetical") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(sortedProducts)
  }, [sortOption])

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category_id === parseInt(selectedCategory)
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [selectedCategory, products])


  if (error) return <div>Error: {error}</div>

  return (
    <GridStyle>
<div className='allProducts'>
      <div ref={targetDivRef} className="controls">
        <select
          className="dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="alphabetical">Alphabetically</option>
        </select>

        <select
          className="dropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/shop/${product.id}`}>
          <div  className="product-card">
            <img
              className="product-image"
              src={product.image_url}
              alt={product.name}
            />
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">£{product.price}</p>
            <button className="product-button">Add to Cart</button>
          </div>
          </Link>
        ))}
      </div>
      </div>
    </GridStyle>
  )
}
