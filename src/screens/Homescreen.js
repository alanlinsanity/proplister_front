import React, { useEffect, useState } from "react";
// import urlcat from "urlcat";
import axios from "axios";
import Listing from "../components/Listing";
import Carousel from "../components/Banner";
import Search from "../components/Searchbar";

const Homescreen = () => {
  const BACKEND = "https://proplister.herokuapp.com";
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  async function loadListings() {
    try {
      setLoading(true);
      const listings = await axios(`${BACKEND}/api/listings/all`);
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

  const handleList = (retrievedList) => {
		setListings(retrievedList);
		console.log(retrievedList);
	};

  return (
    <div className="container">
      <Carousel />
      <Search handleList={handleList} />
      <br/>
      <div className="row justify-content-center">
      Displaying a total of "<b>{listings.length} listings</b>" based on the
				filter(s) you have selected.
			</div>
      <div className="row justify-content-center mt-5 mb-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Unable to fetch listings</h1>
        ) : ( 
          listings.map((listing) => {
            return <div className="col-md-9 mt-5">
              <Listing listing={listing} />
            </div>;
          })
        )}
      </div>
    </div>
  );
};

export default Homescreen;
