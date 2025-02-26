import { useEffect, useState } from "react";
import { getAllOrders } from "../../../api";
import ordersImg from "../../assets/orders.png";
import OrdersStyle from "../../styles/OrdersStyle";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const allOrders = await getAllOrders();
        console.log(allOrders)
        setOrders(allOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const formatDate = (isoDate) => {
    if (!isoDate) return "Unknown Date";
    return new Date(isoDate).toLocaleDateString("en-US", {
      weekday: "short", 
      month: "short",   
      day: "2-digit",    
      year: "numeric",   
      hour: "2-digit",   
      minute: "2-digit", 
      hour12: true      
    });
  };
  return (
    <OrdersStyle>
    <>
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      
      <div className="ordersGrid">
        {orders.map((order) => (
          <div key={order.id} className="orderItem">
            <div className="orderDetails">
              <h1>Order ID: {order.id}</h1>
              <h3>Date: {formatDate(order.created_at)}</h3>
              <h3>Customer: {order.customer_name}</h3>
              
            </div>
            <div className="orderTotal">
              <h2>£{order.total_price}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
    </OrdersStyle>
  );
}

export default AllOrders;
