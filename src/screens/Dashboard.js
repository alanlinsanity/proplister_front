import React, { useEffect, useState } from "react";
// import urlcat from "urlcat";
import axios from "axios";
import ListingDashboard from "../components/ListingDashboard";
import Carousel from "../components/Banner";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const contact = user.contact;

  const BACKEND = "http://localhost:5000";
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function loadListings() {
    try {
      setLoading(true);
      const listings = await axios(`${BACKEND}/api/listings/${contact}`);
      setListings(listings.data);
      console.log(listings);
    } catch (e) {
      setError(e);
      console.log(error);
    } finally {
      setLoading(false);
      console.log(loading);
    }
  }
  useEffect(() => {
    loadListings();
  }, []);

  return (
    <div className="container">
      <Carousel />
      <div className="row justify-content-center">
        Welcome to your Dashboard! There are a total of {listings.length}{" "}
        listing(s) found!
      </div>
      <div className="row justify-content-center mt-5 mb-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Unable to fetch listings</h1>
        ) : (
          listings.map((listing) => {
            return (
              <div className="col-md-9 mt-5">
                <ListingDashboard listing={listing} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
