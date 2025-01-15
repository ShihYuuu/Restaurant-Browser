import React from "react";
import { FeaturesLeft } from "./features_left";
import { FeaturesRight } from "./features_right";

export const Features = (props) => {
  return (
    <div id="features" style={{ height: "2063px" }}>
      <h2>Features</h2>
      <div className="features-container">
        
        <div className="features-left">
          <FeaturesLeft data={props.data} />
        </div>
        <div className="features-right">
          <FeaturesRight />
        </div>
      </div>
    </div>
  );
};
