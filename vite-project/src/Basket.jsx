import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Basket.css';

function Basket({ basket, setBasket }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "GreenField Local Hub - Basket";
  }, []);
  
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
  }, []);

  const getBasketSummary = () => {
    const summary = {};
    basket.forEach(item => {
      if (!summary[item.id]) summary[item.id] = { ...item, price: Number(item.price || 0), quantity: 0 };
      summary[item.id].quantity += 1;
    });
    return Object.values(summary);
  };

  const updateBasket = (newBasket) => {
    setBasket(newBasket);
    localStorage.setItem(`basket_${currentUser?.username}`, JSON.stringify(newBasket));
  };

  const removeFromBasket = (productId) => {
    const index = basket.findIndex(item => item.id === productId);
    if (index > -1) {
      const newBasket = [...basket];
      newBasket.splice(index, 1);
      updateBasket(newBasket);
    }
  };

  const addToBasket = (product) => updateBasket([...basket, product]);

  const removeAllFromBasket = (productId) => {
    updateBasket(basket.filter(item => item.id !== productId));
  };

  const summary = getBasketSummary();
  const total = summary.reduce((sum, item) => sum + (Number(item.price || 0) * item.quantity), 0);

  return (
    <div className="basket-page">
      <h1>Your Basket</h1>
      {summary.length === 0 ? (
        <div className="empty-basket">
          <p>Your basket is empty</p>
          <button onClick={() => navigate('/shop')} className="continue-shopping-btn">Continue Shopping</button>
        </div>
      ) : (
        <div className="basket-container">
          <div className="basket-items">
            {summary.map(item => (
              <div key={item.id} className="basket-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>£{Number(item.price || 0).toFixed(2)} each</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => removeFromBasket(item.id)} className="qty-btn">−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToBasket(item)} className="qty-btn">+</button>
                </div>
                <p className="subtotal">£{(Number(item.price || 0) * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeAllFromBasket(item.id)} className="remove-btn">✕</button>
              </div>
            ))}
          </div>
          <div className="basket-summary">
            <h3>Total: £{total.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            <button className="back-btn" onClick={() => navigate('/shop')}>Back to Shop</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Basket;