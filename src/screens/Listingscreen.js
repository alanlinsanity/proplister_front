import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BACKEND = "http://localhost:5000";


const ListingIndiv = (listingId) => {
    const [selectedListing, setSelectedListing] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

	const { id } = useParams();
    
	console.log('id', id);
	console.log('listingId', listingId);

    async function loadListing() {
        try {
          setLoading(true);
          const listing = await axios(`${BACKEND}/api/listings/:id`);
          setSelectedListing(listing.data);
          console.log("selected", selectedListing)
        } catch (e) {
          setError(e);
          console.log(error);
        } finally {
          setLoading(false);
          console.log(loading);
        }
      }
      useEffect(() => {
        loadListing();
      }, []);
    

  return (
    <div className="container">
        {selectedListing.property}<br/><br/>
        {/* {selectedListing.images[0]}<br/><br/>
        {selectedListing.images[1]}<br/><br/>
        {selectedListing.images[2]}<br/><br/> */}

        District {selectedListing.district}<br/><br/>
        {selectedListing.propertyType}<br/><br/>
        {selectedListing.rentalType}<br/><br/>
        
        {selectedListing.noOfBedrooms} bedrooms<br/><br/>
        {selectedListing.noOfBathrooms} bathrooms<br/><br/>
        {selectedListing.size} sqft<br/><br/>
        ${selectedListing.price}<br/><br/>


        {selectedListing.description}<br/><br/>

        Lister {selectedListing.lister}<br/><br/>
        Mobile {selectedListing.contact}<br/><br/>


    </div>
  );
};

export default ListingIndiv;
