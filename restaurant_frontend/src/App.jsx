import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { fetchInitialResults } from "./selectedResultsSlice";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const dispatch = useDispatch();
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    dispatch(fetchInitialResults());
  }, [dispatch]);

  useEffect(() => {
    setLandingPageData(JsonData);
    console.log(JsonData.Features);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default App;
