import React, { useEffect, useState } from "react";
import { getProductById } from "../../api";
import { useParams } from "react-router";
import SingleProductStyle from "../styles/SingleProductStyle";

export default function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Quantity state

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (loading) return <div>Loading product...</div>;

  return (
    <SingleProductStyle>
      <div className="productCard">
        <img className="singleProduct" src={product.image_url} alt={product.name} />
        <div className="productSpecs">
          <h2>{product.name}</h2>
          <h3>£{product.price}</h3>

          {/* Counter Section */}
          <div className="counterContainer">
            <button className="counterButton" onClick={decrementQuantity}>
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button className="counterButton" onClick={incrementQuantity}>
              +
            </button>
          </div>

          <button className="addToCartButton">Add {quantity} to Cart</button>
        </div>
      </div>
    </SingleProductStyle>
  );
}
