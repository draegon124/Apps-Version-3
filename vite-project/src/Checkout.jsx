import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout({ basket, setBasket }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    document.title = "GreenField Local Hub - Checkout";
    }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  // Group items by product
  const groupedItems = basket.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 1 };
    } else {
      acc[item.id].quantity++;
    }
    return acc;
  }, {});

  const items = Object.values(groupedItems);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!currentUser) return;

    // Save order history
    const existingOrders =
      JSON.parse(localStorage.getItem(`orders_${currentUser.username}`)) || [];

    const newOrder = {
      id: Date.now(),
      items,
      total,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      `orders_${currentUser.username}`,
      JSON.stringify([...existingOrders, newOrder])
    );

    // Clear user's basket
    localStorage.removeItem(`basket_${currentUser.username}`);
    setBasket([]);

    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {items.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <div className="checkout-list">
            {items.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>£{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    Subtotal: £{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="checkout-total">
            Total: £{total.toFixed(2)}
          </h2>

          <button className="checkout-btn" onClick={handleCheckout}>
            Place Order
          </button>
        </>
      )}

    </div>
  );
}


export default Checkout;