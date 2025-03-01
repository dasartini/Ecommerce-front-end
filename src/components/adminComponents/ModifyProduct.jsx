import React, { useEffect, useState } from "react";
import { getProductById, getCategories, updateProduct, uploadPicture } from "../../../api";
import { useParams } from "react-router";
import SingleProductStyle from "../../styles/SingleProductStyle";

function ModifyProducts() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [visible, setVisible] = useState(null)
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image_url: "",
    description: "",
    category_id: "",
    isCoffee: "",
    details: {
      Altitude: "",
      Region: "",
      Variety: "",
      "Flavour notes": "",
    },
  });

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        const categoryData = await getCategories();
        setProduct(productData);
        setCategories(categoryData);

        setFormData({
          name: productData.name,
          price: productData.price,
          stock: productData.stock,
          image_url: productData.image_url,
          description: productData.description,
          category_id: productData.category_id,
          isCoffee: productData.isCoffee,
          details: productData.details || {
            Altitude: "",
            Region: "",
            Variety: "",
            "Flavour notes": "",
          },
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product or categories", err);
      }
    };

    fetchProductAndCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFormData((prevData) => ({
        ...prevData,
        image_url: URL.createObjectURL(file),
      }));
    }
  };

  const commitChanges = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to modify this product?"
    );

    if (!confirmation) return;

    try {
      let finalImageUrl = formData.image_url;

      if (selectedImage) {
        const imageFormData = new FormData();
        imageFormData.append("image", selectedImage);

        const uploadResponse = await uploadPicture(id, imageFormData);

        if (uploadResponse.data && uploadResponse.data.updatedRecord && uploadResponse.data.updatedRecord.image_url) {
          finalImageUrl = uploadResponse.data.updatedRecord.image_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const updatedProductData = { ...formData, image_url: finalImageUrl };
      await updateProduct(id, updatedProductData);

      alert("Product successfully updated!");
    } catch (err) {
      console.error("Error updating product", err);
      alert("Failed to update the product.");
    }
  };

  const handleCheckboxChange = (event) => {
    if(visible){setVisible(false)}
    else if(!visible){setVisible(true)}
    setFormData(prevData => ({
      ...prevData,
      isCoffee: event.target.checked
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      details: { ...formData.details, [name]: value },
    });
  };

  if (loading) return <div>Loading product...</div>;

  return (
    <SingleProductStyle>
      <div className="productCard">
        <img className="singleProduct" src={formData.image_url} alt={formData.name} />
        <div className="productSpecs">
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Modify Product:</label>
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
              {formData.image_url && (
                <img src={formData.image_url} alt="Product" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
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
            <input
              type="checkbox"
              defaultChecked={product.iscoffee}
              onChange={handleCheckboxChange} 
            />
            <br />
                {!visible&& 
              (<>
                Coffee Details:<br />
            Altitude:
            <input
              type="text"
              name="Altitude"
              onChange={handleDetailsChange}
              value={formData.details.Altitude}
            />
            <br />

            Region:
            <input
              type="text"
              name="Region"
              onChange={handleDetailsChange}
              value={formData.details.Region}
            />
            <br />

            Variety:
            <input
              type="text"
              name="Variety"
              onChange={handleDetailsChange}
              value={formData.details.Variety}
            />
            <br />

            Flavour notes:
            <input
              type="text"
              name="Flavour notes"
              onChange={handleDetailsChange}
              value={formData.details["Flavour notes"]}
            />
            <br /></>)}

            <button className="addToCartButton" onClick={commitChanges}>
              Commit Changes
            </button>
          </form>
        </div>
      </div>
    </SingleProductStyle>
  );
}

export default ModifyProducts;
