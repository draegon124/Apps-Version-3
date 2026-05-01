import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";

function Account() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));

    if (!current) {
      navigate("/login");
      return;
    }

    setUser(current);
    setName(current.name || "");
    setUsername(current.username || "");
  }, []);

  const handleSave = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check username conflict (excluding current user)
    const usernameTaken = users.find(
      u => u.username === username && u.username !== user.username
    );

    if (usernameTaken) {
      setMessage("Username already taken");
      return;
    }

    // Update user
    users = users.map(u => {
      if (u.username === user.username) {
        return {
          ...u,
          name,
          username,
          password: password ? password : u.password
        };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(users));

    const updatedUser = {
      ...user,
      name,
      username,
      password: password ? password : user.password
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    setMessage("Changes saved successfully!");
    setPassword("");
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="account-card">
        <h1>Account Settings</h1>

        {message && <p className="account-message">{message}</p>}

        <label>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="Leave blank to keep current password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSave} className="account-save-btn">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Account;