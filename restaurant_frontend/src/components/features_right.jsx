import React, { useState } from "react";
import { useSelector } from "react-redux";

export const FeaturesRight = () => {
  const [page, setPage] = useState(1); 
  const pageSize = 10; 

  const selectedResults = useSelector((state) => state.selectedResults.results);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageResults = selectedResults.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); 
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); 
    }
  };

  if (!selectedResults || selectedResults.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        position: "relative", 
        paddingBottom: "50px", 
      }}
    >
      {currentPageResults.map((result, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h3>{result.restaurant_name}</h3>
          <p>
            <strong>Rating:</strong> {result.dining_rating}
          </p>
          <p>
            <strong>Address:</strong> {result.address}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={result.website} target="_blank" rel="noopener noreferrer">
              {result.website}
            </a>
          </p>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          bottom: "1px",
          right: "10px",
          display: "flex",
          gap: "10px", 
        }}
      >
        {page > 1 && (
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
        )}

        {endIndex < selectedResults.length && (
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleNextPage}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
