import { useEffect, useState } from "react";
import { getOrderByID, getProductById } from "../../../api"; 
import OrderDetailsStyle from "../../styles/OrderDetailsStyle"; 

function OrderDetails({ orderId }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrderAndProductDetails() {
      try {

        const order = await getOrderByID(orderId);
        console.log("Order Details:", order);
        setOrderDetails(order);


        const productDetails = await Promise.all(
          order.items.map(async (item) => {
            const product = await getProductById(item.product_id);
            return { ...item, image_url: product.image_url }; 
          })
        );
        setProducts(productDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (orderId) {
      fetchOrderAndProductDetails();
    }
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <OrderDetailsStyle>
      <h4>Order Details:</h4>
      <p>Order ID: {orderDetails.id}</p>
      <p>Total Price: £{orderDetails.total_price.toFixed(2)}</p>
      <p>Date: {new Date(orderDetails.created_at).toLocaleDateString()}</p>

      <h5>Items:</h5>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <div className="product-image">
              <img src={product.image_url} alt={product.product_name} />
            </div>
            <div className="product-details">
              <p>
                <strong>{product.product_name}</strong>
              </p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: £{product.price.toFixed(2)}</p>
              <p>Grind: {product.grind}</p>
              <p>Size: {product.size}</p>
            </div>
          </li>
        ))}
      </ul>
    </OrderDetailsStyle>
  );
}

export default OrderDetails;