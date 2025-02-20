import React, { useEffect, useState } from "react";
import { getProductById } from "../../api";
import { useParams } from "react-router";
import SingleProductStyle from "../styles/SingleProductStyle";
import { useBasketContext } from "../contexts/BasketContext";
import { motion , AnimatePresence} from "framer-motion";


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
        <div style={{display:"flex", justifyContent:"center",alignItems: "center"}}>
      <img className="singleProduct" src={product.image_url} alt={product.name} />
      </div>
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
              className={`sizeOption ${selectedSize === "500g" ? "active" : ""}`}
              onClick={() => setSelectedSize("500g")}
            >
              500g
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
    
        <div className="singleProductSecondCont">
        <div className="productCharact">
        <h1 className="productTitle">{product.name}</h1>

        <h4>
          Region:
          <h1>Huila</h1>
        </h4>
        <h4>
          Altitude:
          <h1>Acevedo </h1>
        </h4>
        <h4>
          Variety:
          <h1> Pink Bourbon </h1>
        </h4>
        <h4>
          Flavour notes:
          <h1> Apple Pie, Mangosteen, Blackberry</h1>
        </h4>
        
        </div>
        <motion.div 
      animate={{ y: isVisible ? -20 : 0 }} 
      transition={{ duration: 0.5 }} 
      className="productDescription p-4"
    >
      <h2>Description:</h2>
      <p>
        {product.description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Impedit illo architecto quae dolorum, ipsa nulla, maxime eligendi doloremque,
        dignissimos maiores voluptatibus odit sit corporis aut ad laudantium corrupti
        molestiae quam? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Repudiandae quo perspiciatis delectus tenetur consectetur voluptatem rerum
        quam voluptatibus consequuntur blanditiis qui cupiditate facere velit iure
        officia placeat ad, doloremque error! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Labore doloribus nulla eum, a soluta excepturi quis nemo
        illo corrupti impedit, nobis incidunt facilis id inventore doloremque
        consectetur. Officia, ut dolorum.
      </p>

      <hr style={{ borderTop: "1px solid white", width: "100%" }} />

      <div className="p-4">
        <span
          onClick={() => setIsVisible(!isVisible)}
        
          className="cursor-pointer text-blue-500 font-semibold"
        >
          <p   style={{textAlign:"center"}}> Delivery information</p>
          
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
