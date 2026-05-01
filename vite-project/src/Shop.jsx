import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WoodFrame from './Woodframe';
import './Shop.css';

const CIRCLES = {
  innerColor: "#5a3e1b",
  outerColor: "#7a5428",
  thickness: 10,
  dropShadow: "rgba(0,0,0,0.5)",
  borderRadius: "27px",
};

function Shop({ basket, setBasket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [customProducts, setCustomProducts] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "GreenField Local Hub - Shop";
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);

    if (user) {
      const savedBasket = localStorage.getItem(`basket_${user.username}`);
      if (savedBasket) {
        setBasket(JSON.parse(savedBasket));
      } else {
        setBasket([]);
      }
    }
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("customProducts")) || [];
    setCustomProducts(saved);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setBasket([]);
    navigate('/');
  };

  const [products] = useState([
    { id: 1, name: 'Organic Tomatoes', price: 4.99, image: '/tomatoes.png' },
    { id: 2, name: 'Fresh Lettuce', price: 2.49, image: '/lettuce.jpg' },
    { id: 3, name: 'Carrots Bundle', price: 3.99, image: '/carrots.jpg' },
    { id: 4, name: 'Bell Peppers', price: 5.49, image: '/peppers.jpg' },
    { id: 5, name: 'Cucumbers', price: 1.99, image: '/cucumbers.jpg' },
    { id: 6, name: 'Fresh Herbs', price: 2.99, image: '/herbs.jpg' },
    { id: 7, name: 'Rack of Lamb', price: 26.99, image: '/rack_lamb.jpg' },
    { id: 8, name: 'Prime Rib', price: 54.99, image: '/prime_rib.jpg' },
    { id: 9, name: 'Wagyu Beef', price: 31.49, image: '/wagyu_beef.jpg' },
    { id: 10, name: 'Silverside Beef', price: 29.99, image: '/silverside_beef.jpg' },
    { id: 11, name: 'Pork Belly', price: 24.95, image: '/pork_belly.jpg' },
    { id: 12, name: 'Pork Shoulder', price: 19.75, image: '/pork_shoulder.jpg' },
    { id: 13, name: 'Sea Salt', price: 9.75, image: '/sea_salt.jpg' },
    { id: 14, name: 'Plum Jam', price: 6.00, image: '/plum_jam.jpg' },
    { id: 15, name: 'Honey', price: 10.25, image: '/honey.jpg' },
    { id: 16, name: 'Cranberry Sauce', price: 7.65, image: '/cranberry_sauce.jpg' },
    { id: 17, name: 'Wagyu Dripping', price: 12.45, image: '/wagyu_dripping.jpg' },
    { id: 18, name: 'Elderflower Gin Liqueur', price: 23.95, image: '/elderflower_gin_liqueur.jpg' },
  ]);

  const getProductCount = (productId) =>
    basket.filter(id => id === productId).length;

  const addToBasket = (product) => {
    const newBasket = [...basket, product.id];
    setBasket(newBasket);

    if (currentUser) {
      localStorage.setItem(`basket_${currentUser.username}`, JSON.stringify(newBasket));
    }
  };

  const removeFromBasket = (productId) => {
    const index = basket.findIndex(id => id === productId);

    if (index > -1) {
      const newBasket = [...basket];
      newBasket.splice(index, 1);
      setBasket(newBasket);

      if (currentUser) {
        localStorage.setItem(`basket_${currentUser.username}`, JSON.stringify(newBasket));
      }
    }
  };

  const basketItemCount = basket.length;

  const handleAddProduct = () => {
    if (currentUser?.role !== "admin") return;
    if (!newName || !newPrice) return;

    const newProduct = {
      id: Date.now(),
      name: newName,
      price: parseFloat(newPrice),
      image: newImage || "/placeholder.jpg",
      approved: false,
      owner: currentUser.email
    };

    const updated = [...customProducts, newProduct];
    setCustomProducts(updated);
    localStorage.setItem("customProducts", JSON.stringify(updated));

    setNewName("");
    setNewPrice("");
    setNewImage("");
  };

  const handleDelete = (id) => {
    const updated = customProducts.filter(p => p.id !== id);
    setCustomProducts(updated);
    localStorage.setItem("customProducts", JSON.stringify(updated));
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <WoodFrame className="icon-menu" {...CIRCLES}>
          <button
            className="icon-toggle"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsOpen(true)}
          >
            <img src="/menu-icon.png" alt="Menu" className="menu-icon" />
          </button>
          <nav className={`icon-nav ${isOpen ? 'open' : ''}`}>
            <a href="/">
              <img src="/shop.jpg" alt="Home" className="nav-icon" />
            </a>
            <a href="#events">
              <img src="/events.jpg" alt="Events" className="nav-icon" />
            </a>
            <a href="#news">
              <img src="/news.jpg" alt="News" className="nav-icon" />
            </a>
            <a href="#support">
              <img src="/support.png" alt="Support" className="nav-icon" />
            </a>
          </nav>
        </WoodFrame>

        <div className="shop-right-controls">
          {!currentUser ? (
            <WoodFrame as="a" href="/login" className="login-button" {...CIRCLES}>
              <img src="/log_in.jpg" alt="Log In" className="login-icon" />
            </WoodFrame>
          ) : (
            <>
              <WoodFrame as="a" href="/account" className="account-button" {...CIRCLES}>
                <img src="/account.png" alt="Account" className="login-icon" />
              </WoodFrame>

              <WoodFrame as="a" href="/my-orders" className="orders-button" {...CIRCLES}>
                <img src="/orders.png" alt="Orders" className="login-icon" />
              </WoodFrame>

              <WoodFrame as="button" onClick={handleLogout} className="logout-button" {...CIRCLES}>
                Log Out
              </WoodFrame>
            </>
          )}

          <WoodFrame as="button" onClick={() => navigate('/basket')} className="basket-button-nav" {...CIRCLES}>
            <img src="/basket.png" alt="Basket" className="basket-icon" />
            {basketItemCount > 0 && (
              <span className="basket-count-badge">{basketItemCount}</span>
            )}
          </WoodFrame>
        </div>
      </div>

      <h1>Shop Local Produce</h1>

      {currentUser?.role === "admin" && (
        <div className="upload-form">
          <h2>Add New Product</h2>

          <input
            type="text"
            placeholder="Product name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();

              reader.onloadend = () => setNewImage(reader.result);

              if (file) reader.readAsDataURL(file);
            }}
          />

          <button onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      )}

      <div className="basket-counter">
        Items in basket: <span className="counter">{basketItemCount}</span>
      </div>

      {editingProduct && (
        <div className="upload-form">
          <h2>Edit Product</h2>

          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
          />

          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
          />

          <button
            onClick={() => {
              const updated = customProducts.map(p =>
                p.id === editingProduct.id
                  ? { ...editingProduct, price: parseFloat(editingProduct.price) }
                  : p
              );
              setCustomProducts(updated);
              localStorage.setItem("customProducts", JSON.stringify(updated));
              setEditingProduct(null);
            }}
          >
            Save
          </button>
        </div>
      )}

      <div className="products-grid">
        {[...products, ...customProducts.filter(p => p.approved)].map(product => {
          const productCount = getProductCount(product.id);

          return (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="price">£{Number(product.price).toFixed(2)}</p>

              <div className="quantity-controls">
                <button onClick={() => removeFromBasket(product.id)} disabled={productCount === 0}>
                  −
                </button>

                <span>{productCount}</span>

                <button onClick={() => addToBasket(product)}>
                  +
                </button>
              </div>

              {currentUser?.role === "admin" && (
                <>
                  <button onClick={() => setEditingProduct(product)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;