import { useEffect, useState } from "react";
import { getAllOrders } from "../../../api";
import OrdersStyle from "../../styles/OrdersStyle";
import { motion, AnimatePresence } from "framer-motion";
import OrderDetails from "./OrderDetails";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [sortOption, setSortOption] = useState("date_newest"); 
  useEffect(() => {
    async function fetchData() {
      try {
        const allOrders = await getAllOrders();
        setOrders(allOrders);
        setSortedOrders(allOrders); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    sortOrders(sortOption); 
  }, [sortOption, orders]); 

  const formatDate = (isoDate) => {
    if (!isoDate) return "Unknown Date";
    return new Date(isoDate).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleExpand = (orderId) => {
    setExpanded(expanded === orderId ? null : orderId);
  };

  const sortOrders = (option) => {
    let sorted = [...orders];

    switch (option) {
      case "date_newest":
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "date_oldest":
        sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "price_low":
        sorted.sort((a, b) => a.total_price - b.total_price);
        break;
      case "price_high":
        sorted.sort((a, b) => b.total_price - a.total_price);
        break;
      default:
        break;
    }

    setSortedOrders(sorted);
  };

  return (
    <OrdersStyle>
      <>
        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        <div className="sorting">
          <label>Sort by: </label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="date_newest">📅 Date (Newest First)</option>
            <option value="date_oldest">📅 Date (Oldest First)</option>
            <option value="price_low">💲 Price (Low to High)</option>
            <option value="price_high">💲 Price (High to Low)</option>
          </select>
        </div>

        <div className="ordersGrid">
          {sortedOrders.map((order) => (
            <motion.div
              key={order.id}
              animate={{ y: expanded === order.id ? -20 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="orderItem">
                <div className="orderDetails">
                  <h1>Order ID: {order.id}</h1>
                  <h3>Date: {formatDate(order.created_at)}</h3>
                  <h3>Customer: {order.customer_name}</h3>
                  <span style={{ color: "blue", cursor: "pointer" }} onClick={() => handleExpand(order.id)}>
                    Details
                  </span>
                  <AnimatePresence>
                    {expanded === order.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                      >
                        <OrderDetails orderId={order.id} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="orderTotal">
                  <h2>£{order.total_price}</h2>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </>
    </OrdersStyle>
  );
}

export default AllOrders;
