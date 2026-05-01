import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));

    if (!current || current.role !== "admin") {
      navigate("/");
    } else {
      setUser(current);
    }

    const savedProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
    setProducts(savedProducts);
  }, []);

  const handleApprove = (id) => {
    const updated = products.map(p =>
      p.id === id ? { ...p, approved: true } : p
    );

    setProducts(updated);
    localStorage.setItem("customProducts", JSON.stringify(updated));
  };

  if (!user) return null;

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>
      <p>Welcome, {user.username}</p>

      <h2>Pending Products</h2>

      {products.filter(p => !p.approved).length === 0 && (
        <p>No pending products</p>
      )}

      {products
        .filter(p => !p.approved)
        .map(product => (
          <div key={product.id} className="admin-product">
            <img src={product.image} alt={product.name} width="80" />
            <div>
              <p>{product.name}</p>
              <p>£{Number(product.price).toFixed(2)}</p>
            </div>

            <button onClick={() => handleApprove(product.id)}>
              Approve
            </button>
          </div>
        ))}
    </div>
  );
}

export default Admin;