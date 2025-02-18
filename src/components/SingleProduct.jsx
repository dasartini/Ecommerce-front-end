import React, { useEffect, useState } from "react";
import { getProductById } from "../../api";
import { useParams } from "react-router";
import SingleProductStyle from "../styles/SingleProductStyle";
import { useBasketContext } from "../contexts/BasketContext";

export default function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("250g");
  const [selectedGrind, setSelectedGrind] = useState("Whole Bean"); 
  const { setQuantity, quantity, currentBasket, setCurrentBasket } = useBasketContext();

  const { id } = useParams();

  useEffect(() => {
    console.log(currentBasket);
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
        console.log(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const addToBasket = () => {
    const existingItem = currentBasket.find(
      (item) => 
        item.id === product.id && 
        item.grind === selectedGrind && 
        item.size === selectedSize
    );
  
    let updatedBasket;
    if (existingItem) {
      updatedBasket = currentBasket.map((item) =>
        item.id === product.id && item.grind === selectedGrind && item.size === selectedSize
          ? { ...item, quantity: item.quantity + productQuantity }
          : item
      );
    } else {
      updatedBasket = [
        ...currentBasket,
        { ...product, quantity: productQuantity, size: selectedSize, grind: selectedGrind },
      ];
    }
  
    setCurrentBasket(updatedBasket);
    const totalQuantity = updatedBasket.reduce((sum, item) => sum + item.quantity, 0);
    setQuantity(totalQuantity);
  };
  

  const incrementProductQuantity = () => setProductQuantity((prev) => prev + 1);

  const decrementProductQuantity = () => {
    if (productQuantity > 1) setProductQuantity((prev) => prev - 1);
  };

  if (loading) return <div>Loading product...</div>;

  return (
    <SingleProductStyle>
      <div className="productCard">
        <img className="singleProduct" src={product.image_url} alt={product.name} />
        <div className="productSpecs">
          <h2>{product.name}</h2>
          <h3>£{product.price}</h3>

          <div className="sizeSelection">
            <h4>Size:</h4>
            <button
              className={`sizeOption ${selectedSize === "250g" ? "active" : ""}`}
              onClick={() => setSelectedSize("250g")}
            >
              250g
            </button>
            <button
              className={`sizeOption ${selectedSize === "1kg" ? "active" : ""}`}
              onClick={() => setSelectedSize("1kg")}
            >
              1kg
            </button>
          </div>

          <div className="grindSelection">
            <h4>Grind Type:</h4>
            {["Whole Bean", "Aeropress", "Cafetiere / French Press", "Espresso", "Filter"].map(
              (grind) => (
                <button
                  key={grind}
                  className={`grindOption ${selectedGrind === grind ? "active" : ""}`}
                  onClick={() => setSelectedGrind(grind)}
                >
                  {grind}
                </button>
              )
            )}
          </div>

          <div className="counterContainer">
            <button className="counterButton" onClick={decrementProductQuantity}>
              -
            </button>
            <span className="ProductQuantity">{productQuantity}</span>
            <button className="counterButton" onClick={incrementProductQuantity}>
              +
            </button>
          </div>

          <button className="addToCartButton" onClick={addToBasket}>
            Add {productQuantity} to Cart
          </button>
        </div>
      </div>
    </SingleProductStyle>
  );
}
