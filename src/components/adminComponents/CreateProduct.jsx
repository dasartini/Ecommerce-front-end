import React from "react";
import { useState, useEffect } from "react";
import { createProduct, getCategories } from "../../../api";

function CreateProduct() {
  const [categories,setCategories]= useState([])
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image_url: "",
    description: "",
    category_id: "",
  });

useEffect(()=>{
getCategories().then((data)=>{
  console.log(data)
  setCategories(data)
  
})

},[])

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleCreate = async () =>{
const confirmation = window.confirm(
  "Are you sure you want to create a new product?"
)

if(confirmation){
 try{
  await createProduct(formData)
  alert("Product successfully created!")
  location.reload()
 }
 catch(err){
  console.error("Error creating product", err);
  alert("Failed to create the product.");
 }
}

}


  return( <div>
      <div className="productCard">
    <form onSubmit={(e) => e.preventDefault()}>
<label>Create a new product:</label>
    <br></br>
    Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <br />

            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <br />

            Stock:
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
            <br />

            Image URL:
            <textarea
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              rows={2}
            />
            <br />

            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
            />
            <br />
            Category:
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
    </form>


    <button
            className="addToCartButton"
            onClick={handleCreate}
          >
            Create Product
          </button>
      </div>

  </div>
  );
}

export default CreateProduct;