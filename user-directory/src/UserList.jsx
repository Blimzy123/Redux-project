import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (isMounted) {
          setListOfUsers(response.data);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load users. Please check your connection and try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  if (loading) {
    return (
      <main className="page-container">
        <div className="status-card">
          <div className="loader" />
          <h2>Loading users...</h2>
          <p>Getting your directory ready.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <div className="status-card error-card">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button
            className="primary-button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <header className="hero">
        <span className="eyebrow">PEOPLE & CONNECTIONS</span>
        <h1>Meet the <span>people.</span></h1>
        <p>
          Discover your directory, explore profiles, and find
          the people you are looking for.
        </p>
      </header>

      <section className="directory-panel">
        <div className="directory-heading">
          <div>
            <h2>User directory</h2>
            <p>
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1 ? "person" : "people"} found
            </p>
          </div>

          <span className="count-badge">
            {listOfUsers.length} users
          </span>
        </div>

        <div className="search-wrapper">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users by name..."
            aria-label="Search users by name"
          />
          {search && (
            <button
              className="clear-button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {filteredUsers.length > 0 ? (
          <div className="user-grid">
            {filteredUsers.map((user) => (
              <button
                type="button"
                className={`user-card ${
                  selectedUser?.id === user.id ? "selected" : ""
                }`}
                key={user.id}
                onClick={() =>
                  setSelectedUser(
                    selectedUser?.id === user.id ? null : user
                  )
                }
                aria-expanded={selectedUser?.id === user.id}
              >
                <div className="avatar">
                  {user.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="user-card-content">
                  <h3>{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                  <span className="company-name">
                    {user.company.name}
                  </span>
                </div>

                <span className="card-arrow" aria-hidden="true">
                  {selectedUser?.id === user.id ? "−" : "+"}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">⌕</span>
            <h3>No users found</h3>
            <p>Try searching with a different name.</p>
            <button
              className="secondary-button"
              onClick={() => setSearch("")}
            >
              Clear search
            </button>
          </div>
        )}

        {selectedUser && (
          <section className="details-panel" aria-live="polite">
            <div className="details-heading">
              <div>
                <span className="eyebrow">USER PROFILE</span>
                <h2>{selectedUser.name}</h2>
              </div>

              <button
                className="close-button"
                onClick={() => setSelectedUser(null)}
                aria-label="Close user details"
              >
                ×
              </button>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span>Email</span>
                <a href={`mailto:${selectedUser.email}`}>
                  {selectedUser.email}
                </a>
              </div>

              <div className="detail-item">
                <span>Phone</span>
                <p>{selectedUser.phone}</p>
              </div>

              <div className="detail-item">
                <span>Website</span>
                <a
                  href={`https://${selectedUser.website}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedUser.website}
                </a>
              </div>

              <div className="detail-item">
                <span>Company</span>
                <p>{selectedUser.company.name}</p>
              </div>

              <div className="detail-item full-width">
                <span>Address</span>
                <p>
                  {selectedUser.address.street},{" "}
                  {selectedUser.address.suite},{" "}
                  {selectedUser.address.city},{" "}
                  {selectedUser.address.zipcode}
                </p>
              </div>
            </div>
          </section>
        )}
      </section>

      <footer className="page-footer">
        Built with React, Axios & JSONPlaceholder
      </footer>
    </main>
  );
}
