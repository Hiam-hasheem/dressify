import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <p className="subtitle">Manage your account and listings</p>

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">A</div>
          <div>
            <h3>Anna Smith</h3>
            <p>anna@email.com</p>
          </div>
        </div>

        <div className="profile-actions">
          <button>Edit Profile</button>
          <button className="secondary">My Listings</button>
          <button className="secondary">Logout</button>
        </div>
      </div>
    </div>
  );
}
