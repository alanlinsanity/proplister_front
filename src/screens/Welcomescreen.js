import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Welcomescreen = () => {
  return (
    <div className="welcome">
      <h1>
        <b>Welcome to Proplister</b>
      </h1>
      <h5>List Your Property Or Lease A Property</h5>
      <Link to="/listings" rel="noopener noreferrer">
        <Button className="btn btn-success">
          <span>Explore Listings</span>
        </Button>
      </Link>
    </div>
  );
};

export default Welcomescreen;
