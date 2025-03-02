import { useEffect, useState } from "react";
import { getCustomerDetailsByID, getOrderByID, getProductById } from "../../../api";
import OrderDetailsStyle from "../../styles/OrderDetailsStyle";

function OrderDetails({ orderId }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerDetails, setCustomerDetails] = useState([])
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrderAndProductDetails() {
      try {
        const order = await getOrderByID(orderId);
        const customer = await getCustomerDetailsByID(orderId)

        setOrderDetails(order);
        setCustomerDetails(customer)
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
        <div>
      <h4>Order Details:</h4>
        <p><strong>Order ID:</strong> {orderDetails.id}</p>
        <p><strong>Total Price:</strong> £{orderDetails.total_price.toFixed(2)}</p>
        <p><strong>Date:</strong> {new Date(orderDetails.created_at).toLocaleDateString()}</p>
   
      <h4>Customer Details:</h4>
        <p><strong>Address line 1:</strong> {customerDetails.address_line_1}</p>
        <p><strong>Address line 2:</strong> {customerDetails.address_line_2 || "N/A"} </p>
        <p><strong>Postcode:</strong> {customerDetails.postal_code}</p>
        <p><strong>City:</strong> {customerDetails.admin_area_2}</p>
        <p><strong>County:</strong> {customerDetails.admin_area_1 || "N/A"}</p>
        <p><strong>Email:</strong> {customerDetails.email}</p>
        </div>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <div className="product-imageOrders">
              <img src={product.image_url} alt={product.product_name} />
            </div>
            <div className="product-detailsOrders">
              <strong>{product.product_name}</strong>
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
