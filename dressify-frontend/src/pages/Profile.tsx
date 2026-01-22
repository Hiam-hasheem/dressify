import "./Profile.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <p className="subtitle">Manage your account and listings</p>

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">{user?.name.charAt(0).toUpperCase()}</div>
          <div>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button>Edit Profile</button>
          <button className="secondary">My Listings</button>
          <button className="secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}