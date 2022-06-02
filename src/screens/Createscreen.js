import React, { useState, useEffect } from "react";
import axios from "axios";


// database for district based on prefix
const districts = [
  {
    district: "01",
    postal_prefix: ["01", "02", "03", "04", "05", "06"],
    areas: ["Raffles Place", "Marina Bay"],
  },
  {
    district: "02",
    postal_prefix: ["07", "08"],
    areas: ["Chinatown", "Tanjong Pagar"],
  },
  {
    district: "03",
    postal_prefix: ["14", "15", "16"],
    areas: ["Queenstown", "Redhill", "Tiong Bahru"],
  },
  {
    district: "04",
    postal_prefix: ["09", "10"],
    areas: ["Telok Blangah", "Harbourfront"],
  },
  {
    district: "05",
    postal_prefix: ["11", "12", "13"],
    areas: ["Pasir Panjang", "Clementi", "West Coast"],
  },
  {
    district: "06",
    postal_prefix: ["17"],
    areas: ["City Hall"],
  },
  {
    district: "07",
    postal_prefix: ["18", "19"],
    areas: ["Bugis", "Rochor"],
  },
  {
    district: "08",
    postal_prefix: ["20", "21"],
    areas: ["Farrer Park", "Little India"],
  },
  {
    district: "09",
    postal_prefix: ["22", "23"],
    areas: ["Orchard", "River Valley"],
  },
  {
    district: "10",
    postal_prefix: ["24", "25", "26", "27"],
    areas: ["Bukit Timah", "Holland"],
  },
  {
    district: "11",
    postal_prefix: ["28", "29", "30"],
    areas: ["Novena", "Newton"],
  },
  {
    district: "12",
    postal_prefix: ["31", "32", "33"],
    areas: ["Balestier", "Toa Payoh"],
  },
  {
    district: "13",
    postal_prefix: ["34", "35", "36", "37"],
    areas: ["Macpherson", "Potong Pasir"],
  },
  {
    district: "14",
    postal_prefix: ["38", "39", "40", "41"],
    areas: ["Geylang", "Eunos", "Kembangan"],
  },
  {
    district: "15",
    postal_prefix: ["42", "43", "44", "45"],
    areas: ["Katong", "Marine Parade", "Siglap", "Tanjong Rhu"],
  },
  {
    district: "16",
    postal_prefix: ["46", "47", "48"],
    areas: ["Bedok", "Bayshore"],
  },
  {
    district: "17",
    postal_prefix: ["49", "50", "81"],
    areas: ["Loyang", "Changi"],
  },
  {
    district: "18",
    postal_prefix: ["51", "52"],
    areas: ["Tampines", "Pasir Ris"],
  },
  {
    district: "19",
    postal_prefix: ["53", "54", "55", "82"],
    areas: ["Serangoon Garden", "Hougang", "Punggol"],
  },
  {
    district: "20",
    postal_prefix: ["56", "57"],
    areas: ["Bishan", "Ang Mo Kio"],
  },
  {
    district: "21",
    postal_prefix: ["58", "59"],
    areas: ["Upper Bukit Timah", "Clementi Park", "Ulu Pandan"],
  },
  {
    district: "22",
    postal_prefix: ["60", "61", "62", "63", "64"],
    areas: ["Jurong", "Boon Lay", "Tuas"],
  },
  {
    district: "23",
    postal_prefix: ["65", "66", "67", "68"],
    areas: ["Hillview", "Bukit Batok", "Bukit Panjang", "Choa Chu Kang"],
  },
  {
    district: "24",
    postal_prefix: ["69", "70", "71"],
    areas: ["Lim Chu Kang", "Tengah", "Kranji"],
  },
  {
    district: "25",
    postal_prefix: ["72", "73"],
    areas: ["Admiralty", "Woodlands"],
  },
  {
    district: "26",
    postal_prefix: ["77", "78"],
    areas: ["Upper Thomson", "Springleaf"],
  },
  {
    district: "27",
    postal_prefix: ["75", "76"],
    areas: ["Yishun", "Sembawang"],
  },
  {
    district: "28",
    postal_prefix: ["79", "80"],
    areas: ["Seletar", "Yio Chu Kang"],
  },
];

function districtLookupBy(postal) {
  if (postal.length === 6) {
    const postal_prefix = postal.slice(0, 2);
    const district = districts.find((district) =>
      district.postal_prefix.includes(postal_prefix)
    );
    return district.district;
  } else {
    return "Invalid Postal";
  }
}

const Create = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));


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
  const [lister, setLister] = useState();
  const [contact, setContact] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [images, setImages] = useState([]);

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
    setImage1("");
    setImage2("");
    setImage3("");
    setImages([]);
    setIncomplete(false);
  }

  const inputHandler = (event) => {
    const postalCode = event.target.value;
    setPostal(postalCode);
    setDistrict(districtLookupBy(postalCode));
  };

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
        images:[image1, image2, image3]
      };

      try {
        const result = await axios.post("/api/listings/create", listing).data;
        setSuccess(true);
        console.log(result.images)
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
        setImages([]);
        setImage1("");
        setImage2("");
        setImage3("");
      } catch (error) {
        console.log(error);
        setError(true);
        clearFields();
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
            <form >
              <select
                required
                type="rentalType"
                className="form-select"
                value={rentalType}
                onChange={(e) => {
                  setRentalType(e.target.value);
                }}
              >
                <option defaultValue="Whole Unit">
                  Please Select A Rental Type
                </option>
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
                <option defaultValue="Unknown">
                  Please Select A Property Type
                </option>
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
                onInput={inputHandler}
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
              <input
                required
                type="image1"
                className="form-control"
                placeholder="Image 1"
                value={image1}
                onChange={(e) => {
                  setImage1(e.target.value);
                }}
              />
              <input
                required
                type="image2"
                className="form-control"
                placeholder="Image 2"
                value={image2}
                onChange={(e) => {
                  setImage2(e.target.value);
                }}
              />
              <input
                required
                type="image3"
                className="form-control"
                placeholder="Image 3"
                value={image3}
                onChange={(e) => {
                  setImage3(e.target.value);
                }}
              />

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
