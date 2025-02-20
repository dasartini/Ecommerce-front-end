import { useEffect, useState, useRef } from "react";
import { allProducts, createCategory, getCategories } from "../../../api";
import AdminStyle from "../../styles/AdminStyle";
import { Link } from "react-router";

function CreateCategory() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

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
        targetDiv.style.position = 'absolute';
        targetDiv.style.top = `0`;
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
        const productData = await allProducts();
        const categoryData = await getCategories();

        setProducts(productData);
        setFilteredProducts(productData);
        setCategories(categoryData);
        console.log(categories)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category_id === parseInt(selectedCategory)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategory.trim()) {
      alert("Please enter a category name");
      return;
    }

    if (window.confirm(`Are you sure you want to add the category: "${newCategory}"?`)) {
      try {
        await createCategory(newCategory);
        setNewCategory("");
        alert("Category added successfully!");
        location.reload()
      } catch (err) {
        alert("Failed to add category. Please try again.");
        console.error(err);
      }
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <AdminStyle>
      <div className="allProductsAdmin">
        <div ref={targetDivRef} className="controlsAdmin">
          <select
            className="dropdownAdmin"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>

          <form onSubmit={handleAddCategory}>
            <label>Add a new category:</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
            <button type="submit">Add</button>
          </form>
        </div>

        <div className="product-gridAdmin">
          {filteredProducts.map((product) => (
     
              <div key={product.id} className="product-cardAdmin">
                <img
                  className="product-imageAdmin"
                  src={product.image_url}
                  alt={product.name}
                />
                <h2 className="product-titleAdmin">{product.name}</h2>
                <p className="product-priceAdmin">£{product.price}</p>
                <p className="product-stockAdmin">Stock:{product.stock}</p>

                <Link to={`modify-products/${product.id}`} > <button className="product-buttonAdmin">MODIFY</button></Link>
              </div>
          ))}
        </div>
      </div>
    </AdminStyle>
  );
}

export default CreateCategory;
