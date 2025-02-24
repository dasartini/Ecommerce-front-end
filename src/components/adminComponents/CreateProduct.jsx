import React, { useState, useEffect } from "react";
import { createProduct, getCategories } from "../../../api";

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category_id: "",
    isCoffee: false,
    details: {
      Altitude: "",
      Region: "",
      Variety: "",
      "Flavour notes": "",
    },
  });

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setVisible(!visible);
    setFormData({ ...formData, isCoffee: !formData.isCoffee });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      details: { ...formData.details, [name]: value },
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCreate = async () => {
    const confirmation = window.confirm("Are you sure you want to create a new product?");

    if (confirmation) {
      try {
        const productData = new FormData();
        productData.append("name", formData.name);
        productData.append("price", formData.price);
        productData.append("stock", formData.stock);
        productData.append("description", formData.description);
        productData.append("category_id", formData.category_id);
        productData.append("isCoffee", formData.isCoffee);
        productData.append("details", JSON.stringify(formData.details));
        if (selectedImage) {
          productData.append("image", selectedImage);
        }

        await createProduct(productData);
        alert("Product successfully created!");
        location.reload();
      } catch (err) {
        console.error("Error creating product", err);
        alert("Failed to create the product.");
      }
    }
  };

  return (
    <div>
      <div className="productCard">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>Create a new product:</label>
          <br />

          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          <br />

          Price:
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
          <br />

          Stock:
          <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} />
          <br />

          Image:
          <div>
            <label htmlFor="image-upload">Upload Image:</label>
            <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </div>
          <br />

          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} />
          <br />

          Category:
          <select name="category_id" value={formData.category_id} onChange={handleInputChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
          <br />

          Is this a coffee?
          <input type="checkbox" checked={formData.isCoffee} onChange={handleCheckboxChange} />
          <br />

          {visible && (
            <>
              <label>Coffee Details:</label>
              <br />
              Altitude:
              <input type="text" name="Altitude" onChange={handleDetailsChange} value={formData.details.Altitude} />
              <br />

              Region:
              <input type="text" name="Region" onChange={handleDetailsChange} value={formData.details.Region} />
              <br />

              Variety:
              <input type="text" name="Variety" onChange={handleDetailsChange} value={formData.details.Variety} />
              <br />

              Flavour notes:
              <input
                type="text"
                name="Flavour notes"
                onChange={handleDetailsChange}
                value={formData.details["Flavour notes"]}
              />
              <br />
            </>
          )}
        </form>

        <button className="addToCartButton" onClick={handleCreate}>
          Create Product
        </button>
      </div>
    </div>
  );
}

export default CreateProduct;
