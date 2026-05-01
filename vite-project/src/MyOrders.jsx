import { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);

    if (user) {
      const savedOrders =
        JSON.parse(localStorage.getItem(`orders_${user.username}`)) || [];
      setOrders(savedOrders.reverse()); // newest first
    }
  }, []);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span>{order.date}</span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                Total: £{order.total.toFixed(2)}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;