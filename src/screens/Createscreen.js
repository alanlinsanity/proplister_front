import React, { useState, useEffect } from "react";
import axios from "axios";



const Create = () => {
  const [rentalType, setRentalType] = useState("");
  const [property, setProperty] = useState("");
  const [postal, setPostal] = useState("");
  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [noOfBedrooms, setNoOfBedrooms] = useState("");
  const [noOfBathrooms, setNoOfBathrooms] = useState("");
  const [description, setDescription] = useState("");
  const [lister, setLister] = useState("");
  const [contact, setContact] = useState("");
  const [images, setImages] = useState(["https://images.unsplash.com/photo-1571905837410-87605d34ad73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZG98ZW58MHx8MHx8&w=1000&q=80"]);

  const [incomplete, setIncomplete] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function clearFields() {
    setRentalType("");
    setProperty("");
    setPostal("");
    setDistrict("");
    setPropertyType("");
    setPrice("");
    setSize("");
    setNoOfBedrooms("");
    setNoOfBathrooms("");
    setDescription("");
    setLister("");
    setContact("");
    // setImages([]);
    setIncomplete(false);
  }

  //   function addImages() {
  //       setImages(images.push(image1))
  //   }

  async function create(event) {
    event.preventDefault();
    if (
      rentalType &&
      property &&
      postal &&
      district &&
      propertyType &&
      price &&
      size &&
      noOfBedrooms &&
      noOfBathrooms &&
      description &&
      lister &&
      contact !== ""
    ) {
      setIncomplete(false);
      const listing = {
        rentalType,
        property,
        postal,
        district,
        propertyType,
        price,
        size,
        noOfBedrooms,
        noOfBathrooms,
        description,
        lister,
        contact,
        images,
      };

      try {
        const result = await axios.post("/api/listings/create", listing).data;
        setSuccess(true);

        setRentalType("");
        setProperty("");
        setPostal("");
        setDistrict("");
        setPropertyType("");
        setPrice("");
        setSize("");
        setNoOfBedrooms("");
        setNoOfBathrooms("");
        setDescription("");
        setLister("");
        setContact("");
        // setImages("");
      } catch (error) {
        console.log(error);
        setError(true);
      }
      console.log(listing);
    } else {
      setIncomplete(true);
    }
  }

  return (
    <div>
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-md-5 mt-5">
          {success && (
            <div className=" alert alert-success" role="alert">
              Listing Created Successfully
            </div>
          )}
          {incomplete && (
            <div className=" alert alert-danger" role="alert">
              Please Ensure All Fields Have Been Filled
            </div>
          )}

          <div className="bs">
            <h1>Create Listing</h1>
            <form>
              <select
                required
                type="rentalType"
                className="form-select"
                value={rentalType}
                onChange={(e) => {
                  setRentalType(e.target.value);
                }}
              >
                  
                <option defaultValue="Whole Unit">Please Select A Rental Type</option>
                <option value="Whole Unit">Whole Unit</option>
                <option value="Room Rental (En-Suite)">
                  Room Rental (En-Suite)
                </option>
                <option value="Room Rental (Common)">
                  Room Rental (Common)
                </option>
              </select>
              <select
                required
                type="propertyType"
                className="form-select"
                value={propertyType}
                onChange={(e) => {
                  setPropertyType(e.target.value);
                }}
              >
                <option defaultValue="HDB">Please Select A Property Type</option>
                <option value="HDB">HDB</option>
                <option value="Private">Private </option>
                <option value="Co-living">Co-living</option>
              </select>

              <input
                required
                type="postal"
                className="form-control"
                placeholder="Postal Code"
                value={postal}
                onChange={(e) => {
                  setPostal(e.target.value);
                }}
              />
              <input
                required
                type="district"
                className="form-control"
                placeholder="District"
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
              />
              <input
                required
                type="property"
                className="form-control"
                placeholder="Property Address"
                value={property}
                onChange={(e) => {
                  setProperty(e.target.value);
                }}
              />

              <input
                required
                type="price"
                className="form-control"
                placeholder="Price (per month)"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input
                required
                type="size"
                className="form-control"
                placeholder="Size (sq ft)"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
              <input
                required
                type="noOfBedrooms"
                className="form-control"
                placeholder="Number of Bedrooms"
                value={noOfBedrooms}
                onChange={(e) => {
                  setNoOfBedrooms(e.target.value);
                }}
              />
              <input
                required
                type="noOfBathrooms"
                className="form-control"
                placeholder="Number of Bathrooms"
                value={noOfBathrooms}
                onChange={(e) => {
                  setNoOfBathrooms(e.target.value);
                }}
              />
              <textarea
                id="exampleFormControlTextarea1"
                rows="5"
                required
                type="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <input
                required
                type="lister"
                className="form-control"
                placeholder="Lister Name"
                value={lister}
                onChange={(e) => {
                  setLister(e.target.value);
                }}
              />
              <input
                required
                type="contact"
                className="form-control"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
              {/* <input
                required
                type="images"
                className="form-control"
                placeholder="Images"
                value={images}
                onChange={(e) => {
                  images.push(e.target.value);
                }}
              /> */}

              <button
                type="submit"
                className="btn btn-primary"
                onClick={create}
              >
                Register
              </button>
            </form>
            <button className="btn btn-primary" onClick={clearFields}>
              Reset Fields
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
