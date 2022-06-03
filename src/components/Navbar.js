import React from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = `/login`;
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/listings">
          Proplister
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {user ? (
              <>
                <div class="dropdown show">
                  <a
                    class="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.name}
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="/dashboard">
                      Dashboard
                    </a>
                    <a class="dropdown-item" href="/create">
                      Create Listing
                    </a>
                    <a class="dropdown-item" href="#" onClick={logOut}>
                      Log Out
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li>
                  <a className="nav-link" href="/listings">
                    Explore Listings
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}

            {/* <li className="nav-item active">
              <a className="nav-link" href="/register">
                Register
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li> */}
          </ul>
        </div>
      </nav>{" "}
    </div>
  );
};

export default Navbar;
