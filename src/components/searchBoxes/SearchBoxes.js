import React, { useState } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import getRoutes from "../../services/osrm";
import "./SearchBoxes.css";

export function SearchBoxes() {
  const [originSearchBox, setOriginSearchBox] = useState({});
  const [destinationSearchBox, setDestinationSearchBox] = useState({});
  let origin, destination;

  function onLoadOrigin(ref) {
    setOriginSearchBox(ref);
    return originSearchBox;
  }

  function onLoadDestination(ref) {
    setDestinationSearchBox(ref);
    return destinationSearchBox;
  }

  function onPlacesChangedOrigin() {
    origin = {
      name: originSearchBox.getPlaces()[0].formatted_address,
      lat: originSearchBox.getPlaces()[0].geometry.location.lat(),
      lng: originSearchBox.getPlaces()[0].geometry.location.lng(),
    };
    console.log(origin);
  }

  function onPlacesChangedDestination() {
    destination = {
      name: destinationSearchBox.getPlaces()[0].formatted_address,
      lat: destinationSearchBox.getPlaces()[0].geometry.location.lat(),
      lng: destinationSearchBox.getPlaces()[0].geometry.location.lng(),
    };
    console.log(destination);
  }

  function fetchRoute(org, dest) {
    org && dest && getRoutes(org, dest);
  }

  return (
    <div className="searchBoxesContainer">
      <StandaloneSearchBox onLoad={onLoadOrigin} onPlacesChanged={onPlacesChangedOrigin}>
        <input className="searchBox" type="text" placeholder="Origin" />
      </StandaloneSearchBox>
      <StandaloneSearchBox onLoad={onLoadDestination} onPlacesChanged={onPlacesChangedDestination}>
        <input className="searchBox" type="text" placeholder="Destination" />
      </StandaloneSearchBox>
      <button onClick={() => fetchRoute(origin, destination)}>Get it!</button>
    </div>
  );
}

export default SearchBoxes;
