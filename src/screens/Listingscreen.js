import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Carousel } from "react-bootstrap";

const BACKEND = "http://localhost:5000";

const ListingIndiv = (listingId) => {
  const [selectedListing, setSelectedListing] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const { id } = useParams();
  const whatsappLink = `https://api.whatsapp.com/send?phone=65${selectedListing.contact}&text=I%20am%20keen%20on%20your%20listing%20at%20${selectedListing.property}.%20Please%20contact%20me!`;

  console.log("id", id);
  console.log("listingId", listingId);

  async function loadListing() {
    try {
      setLoading(true);
      const listing = await axios(`${BACKEND}/api/listings/${id}`);
      setSelectedListing(listing.data);
      console.log("selected", selectedListing);
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
    <div className="indivListing">
      <div className="container">
        <div>
          <br />
          <h1>
            <b>
              {selectedListing.property} ({selectedListing.postal})
            </b>
          </h1>
          <br />
        </div>
        <Carousel>
          {selectedListing.images?.map((url) => {
            return (
              <Carousel.Item>
                <img className="d-block w-100 h-50 bigimg" src={url} />
              </Carousel.Item>
            );
          })}
        </Carousel>
        {/* {selectedListing.images[0]}<br/><br/>
        {selectedListing.images[1]}<br/><br/>
        {selectedListing.images[2]}<br/><br/> */}
        <br />
        <div className="row justify-content-center mt-5 mb-5">
          <h4>
            <u>
              <b>Unit Details</b>
            </u>{" "}
            <br />
            <br />
            District: {selectedListing.district}
            <br />
            <br />
            Property Type: {selectedListing.propertyType}
            <br />
            <br />
            Rental Type: {selectedListing.rentalType}
            <br />
            <br />
            {selectedListing.noOfBedrooms} bedrooms
            <br />
            <br />
            {selectedListing.noOfBathrooms} bathrooms
            <br />
            <br />
            Size: {selectedListing.size} sqft
            <br />
            <br />
            Asking Price: ${selectedListing.price}
            <br />
            <br />
            <br />
            <u>
              <b>Unit Description</b>
            </u>{" "}
            <br />
            <br />
            {selectedListing.description}
            <br />
            <br />
            Lister: {selectedListing.lister}
            <br />
            <br />
            Contact Number: +65 {selectedListing.contact}
          </h4>
        </div>
        <a href={whatsappLink}>
          <Button class="btn btn-success">WhatsApp</Button>
        </a>
      </div>
    </div>
  );
};

export default ListingIndiv;
