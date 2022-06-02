import React, { useEffect, useState } from "react";
import urlcat from "urlcat";

const BACKEND = "http://localhost:5000";

const Search = (props) => {
  //   const [searchValue, setSearchValue] = useState("");
  const [searchValue_min, setSearchValue_min] = useState();
  const [searchValue_max, setSearchValue_max] = useState();
  const [searchValue_HDBorPrivate, setSearchValue_HDBorPrivate] =
    useState("Any");
  const [searchValue_Rooms, setSearchValue_Rooms] = useState("Any");
  const [searchValue_Bathrooms, setSearchValue_Bathrooms] = useState("Any");

  const [listings, setListings] = useState([]);

  const [error, setError] = useState("");

  const createSearch = (search) => {
    const url = urlcat(BACKEND, `/api/listings/search`);
    console.log(search);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .then((response) => response.json())
      .then((data) => {
        setListings(data);

        if (data.error) {
          setError(data.error);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const passList = () => {
      props.handleList(listings);
    };
    passList();
  }, [listings]);

  const resetFilters = (event) => {
    event.preventDefault();
    setSearchValue_min("");
    setSearchValue_max("");
    setSearchValue_HDBorPrivate("Any");
    setSearchValue_Rooms("Any");
    setSearchValue_Bathrooms("Any");
    console.log("reset")
    
  };

  const callSearchFunction = (event) => {
    event.preventDefault();
    const searchParams = {
      searchValue_min,
      searchValue_max,
      searchValue_HDBorPrivate,
      searchValue_Rooms,
      searchValue_Bathrooms,
    };
    createSearch(searchParams);
    // alert('Search created');
  };

  return (
    <div className="row justify-content-center mt-5">
      <div>
        <div className="bs1">
          <form
            action={urlcat(BACKEND, "search")}
            method="POST"
            // onSubmit={handleSubmit}
          >
              <div>
            <label>Price Range</label>
            
            <input
              value={searchValue_min}
              onChange={(event) => setSearchValue_min(event.target.value)}
              type="number"
              className="form-control"
              placeholder="min price"
            />
            
            <input
              value={searchValue_max}
              onChange={(event) => setSearchValue_max(event.target.value)}
              type="number"
              className="form-control"
              placeholder="max price"
            />{" "}
            </div>
            
            <label>Property Type</label> 
            <select
              name="HDBorPrivate"
              id="HDBorPrivate"
              value={searchValue_HDBorPrivate}
              className="form-select"
              onChange={(event) =>
                setSearchValue_HDBorPrivate(event.target.value)
              }
              type="text"
            >
              <option value="Any">Any</option>
              <option value="HDB">HDB</option>
              <option value="Private Property">Private Property</option>
            </select>{" "}
            
            <label>Bedrooms</label> 
            <select
              name="RoomsToRent"
              id="RoomsToRent"
              value={searchValue_Rooms}
              className="form-select"
              onChange={(event) => setSearchValue_Rooms(event.target.value)}
              type="text"
            >
              <option value="Any">Any</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedroom</option>
              <option value="3">3 Bedroom</option>
              <option value="4">4 Bedroom</option>
              <option value="More than 4 rooms">More than 4 Bedroom</option>
            </select>{" "}
            
            <label>Bathrooms</label> 
            <select
              name="Bathrooms"
              id="Bathrooms"
              value={searchValue_Bathrooms}
              className="form-select"
              onChange={(event) => setSearchValue_Bathrooms(event.target.value)}
              type="text"
            >
              <option value="Any">Any</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathroom</option>
              <option value="3">3 Bathroom</option>
              <option value="4">4 Bathroom</option>
              <option value="More than 4 rooms">More than 4 Bathroom</option>
            </select>
              <br/>
            <button
              className="btn btn-primary"
              onClick={resetFilters}
            >
              Reset Filters
            </button>

            <button
              className="btn btn-primary"
              onClick={callSearchFunction}
              type="submit"
              value="Search"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
