import React from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logOut() {
    localStorage.removeItem('currentUser');
    window.location.href=`/login`
  }
  
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg">
        <a className="navbar-brand" href="/listings">
          PROPLISTER
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            {user ? (
              
              <><div class="dropdown show">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {user.name}
              </a>
            
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" href="/dashboard">
                Dashboard
              </a>
                <a class="dropdown-item" href="/create">Create Listing</a>
                <a class="dropdown-item" href="#" onClick={logOut}>Log Out</a>
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
