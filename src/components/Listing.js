import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Listing = ({ listing }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const whatsappLink = `https://api.whatsapp.com/send?phone=65${listing.contact}&text=I%20am%20keen%20on%20your%20listing%20at%20${listing.property}.%20Please%20contact%20me!`;

  return (
    <div className="row bs">
      <div className="col-md-4 mb-3 mt-3">
        <img src={listing.images[0]} className="smallimg" />
      </div>
      <div className="col-md-7 mt-0">
        <h4><b>
          {listing.property} ({listing.propertyType})
          </b> </h4>
        <b>
          <p>{listing.rentalType}</p>
          <p>
            {listing.noOfBedrooms} Bed | {listing.noOfBathrooms} Bath |{" "}
            {listing.size} sqft
          </p>
          <p>Asking Rent: ${listing.price} per month</p>
        </b>
        <Button variant="primary" onClick={handleShow}>
        Learn More
      </Button>
      </div>
     

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{listing.property}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {listing.images.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <br />
          <p>
            {listing.rentalType} <br />
            Type: {listing.propertyType} <br />
            {listing.noOfBedrooms} bed {listing.noOfBathrooms} bath <br />
            Size: {listing.size} sqft
            <br />
            Asking Price: ${listing.price} per month
            <br /> <br />
            <u>Description</u> <br />
            {listing.description}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link
            to={`/listings/${listing._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="btn btn-success">
              <span>View Listing</span>
            </Button>
          </Link>

          <a href={whatsappLink}>
            <Button class="btn btn-success">WhatsApp</Button>
          </a>

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Listing;
