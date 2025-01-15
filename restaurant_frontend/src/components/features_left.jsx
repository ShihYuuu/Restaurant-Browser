import React, { useState } from "react";
import Button from "@mui/material/Button";

export const FeaturesLeft = (props) => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const handleCRatingsboxChange = (event) => {
    const value = event.target.value;
    setSelectedRatings((prev) =>
      prev.includes(value)
        ? prev.filter((region) => region !== value)
        : [...prev, value]
    );
  };

  const handlePriceboxChange = (event) => {
    const value = event.target.value;
    setSelectedPrice((prev) =>
      prev.includes(value)
        ? prev.filter((region) => region !== value)
        : [...prev, value]
    );
  };

  const handleCRegionsboxChange = (event) => {
    const value = event.target.value;
    setSelectedRegions((prev) =>
      prev.includes(value)
        ? prev.filter((region) => region !== value)
        : [...prev, value]
    );
  };

  const handleClick = () => {
    console.log("Button clicked!");
  };

  if (!props.data || !props.data.categories_by_region) {
    return <div>Loading...</div>;
  }

  return (
    <div id="feature" className="text-center">
      <div className="container1">
        <h1>Ratings</h1>
        <ul>
          {props.data.ratings.map((rate) => (
            <li key={rate}>
              <input
                type="checkbox"
                value={rate}
                checked={selectedRatings.includes(rate)}
                onChange={handleCRatingsboxChange}
              />
              {rate}
            </li>
          ))}
        </ul>

        <h1>Price</h1>
        <ul>
          {props.data.price.map((priced) => (
            <li key={priced}>
              <input
                type="checkbox"
                value={priced}
                checked={selectedPrice.includes(priced)}
                onChange={handlePriceboxChange}
              />
              {priced}
            </li>
          ))}
        </ul>

        <h1>Cuisine</h1>
        <ul>
          {props.data.categories_by_region.map((region) => (
            <li key={region}>
              <input
                type="checkbox"
                value={region}
                checked={selectedRegions.includes(region)}
                onChange={handleCRegionsboxChange}
              />
              {region}
            </li>
          ))}
        </ul>

        <div style={{ textAlign: "center", marginTop: "35px", paddingLeft: "130px" }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                Apply
            </Button>
        </div>
      </div>
    </div>
  );
};
