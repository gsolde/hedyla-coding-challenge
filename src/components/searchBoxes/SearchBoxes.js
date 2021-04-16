import React, { useState } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { addOrigin, addDestination } from "../../actions/index";

import "./SearchBoxes.css";

export function SearchBoxes() {
  const [originSearchBox, setOriginSearchBox] = useState({});
  const [destinationSearchBox, setDestinationSearchBox] = useState({});

  const dispatch = useDispatch();

  function onLoadOrigin(ref) {
    setOriginSearchBox(ref);
    return originSearchBox;
  }

  function onLoadDestination(ref) {
    setDestinationSearchBox(ref);
    return destinationSearchBox;
  }

  function onPlacesChangedOrigin() {
    dispatch(
      addOrigin({
        name: originSearchBox.getPlaces()[0].formatted_address,
        lat: originSearchBox.getPlaces()[0].geometry.location.lat(),
        lng: originSearchBox.getPlaces()[0].geometry.location.lng(),
      })
    );
  }

  function onPlacesChangedDestination() {
    dispatch(
      addDestination({
        name: destinationSearchBox.getPlaces()[0].formatted_address,
        lat: destinationSearchBox.getPlaces()[0].geometry.location.lat(),
        lng: destinationSearchBox.getPlaces()[0].geometry.location.lng(),
      })
    );
  }

  return (
    <div className="searchBoxesContainer">
      <StandaloneSearchBox onLoad={onLoadOrigin} onPlacesChanged={onPlacesChangedOrigin}>
        <input className="searchBox" type="text" placeholder="Origin" />
      </StandaloneSearchBox>
      <StandaloneSearchBox onLoad={onLoadDestination} onPlacesChanged={onPlacesChangedDestination}>
        <input className="searchBox" type="text" placeholder="Destination" />
      </StandaloneSearchBox>
    </div>
  );
}

export default SearchBoxes;
