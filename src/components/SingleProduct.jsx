import React, { useEffect, useState } from "react";
import { getProductById } from "../../api";
import { useParams } from "react-router";
import SingleProductStyle from "../styles/SingleProductStyle";
import { useBasketContext } from "../contexts/BasketContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SingleProduct() {
  const [isVisible, setIsVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("250g");
  const [selectedGrind, setSelectedGrind] = useState("Whole Bean"); 
  const { setQuantity, quantity, currentBasket, setCurrentBasket } = useBasketContext();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const sizeMultiplier = {
    "250g": 1,
    "500g": 2,
    "1kg": 4,
  };

  const getMaxQuantity = () => {
    return product ? Math.floor(product.stock / sizeMultiplier[selectedSize]) : 1;
  };

  const incrementProductQuantity = () => {
    setProductQuantity((prev) => Math.min(prev + 1, getMaxQuantity()));
  };

  const decrementProductQuantity = () => {
    if (productQuantity > 1) setProductQuantity((prev) => prev - 1);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setProductQuantity(1); 
  };

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

  if (loading) return <div>Loading product...</div>;

  return (
    <SingleProductStyle>
      <div className="productCard">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img className="singleProduct" src={product.image_url} alt={product.name} />
        </div>
        <div className="productSpecs">
          <h2>{product.name}</h2>
          <h3>£{(product.price * sizeMultiplier[selectedSize]).toFixed(2)}</h3>

          <div className="sizeSelection">
            <h4>Size:</h4>
            {["250g", "500g", "1kg"].map((size) => (
              <button
                key={size}
                className={`sizeOption ${selectedSize === size ? "active" : ""}`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
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

      <div className="singleProductSecondCont">
        <div className="productCharact">
          <h1 className="productTitle">{product.name}</h1>
          <br />
          <h4>Region:</h4>
          <h1>{product.details.Region}</h1>
          <h4>Altitude:</h4>
          <h1>{product.details.Altitude}</h1>
          <h4>Variety:</h4>
          <h1>{product.details.Variety}</h1>
          <h4>Flavour notes:</h4>
          <h1>{product.details["Flavour notes"]}</h1>
        </div>

        <motion.div animate={{ y: isVisible ? -20 : 0 }} transition={{ duration: 0.5 }} className="productDescription p-4">
          <h2>Description:</h2>
          <p>{product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet minima ipsum sint, magni veniam illo id molestiae ducimus voluptates dignissimos dolorum quam eius aliquid! Velit earum nam eveniet culpa unde.</p>

          <hr style={{ borderTop: "1px solid white", width: "100%" }} />

          <div className="p-4">
            <span onClick={() => setIsVisible(!isVisible)} className="cursor-pointer text-blue-500 font-semibold">
              <p style={{ textAlign: "center" }}>Delivery information</p>
            </span>

            <AnimatePresence>
              {isVisible && (
                <motion.p
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1 }}
                  className="mt-2 text-gray-700"
                >
                  We are able to offer delivery to all parts of the United Kingdom.
                  We use Royal Mail for small shipments and DPD for larger shipments.
                  <br />
                  <br />
                  <strong>Express delivery</strong> is sent via Royal Mail 1st Class Tracked.
                  You should expect to receive your order within 1 working day.
                  <br />
                  <br />
                  <strong>Standard delivery</strong> is sent via Royal Mail 2nd Class Tracked.
                  You should expect to receive your order within 2-3 working days.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SingleProductStyle>
  );
}
