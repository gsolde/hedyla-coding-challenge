import React, { useState } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import mapConfig from "../../mapConfig/mapConfig.json";
import "./Map.css";

export function Map() {
  const [originSearchBox, setOriginSearchBox] = useState({});
  const [destinationSearchBox, setDestinationSearchBox] = useState({});

  function onLoadOrigin(ref) {
    setOriginSearchBox(ref);
    return originSearchBox;
  }

  function onLoadDestination(ref) {
    setDestinationSearchBox(ref);
    return destinationSearchBox;
  }

  function onPlacesChangedOrigin() {
    console.log(originSearchBox.getPlaces());
  }

  function onPlacesChangedDestination() {
    console.log(destinationSearchBox.getPlaces());
  }

  return (
    <div className="mapContainer">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={mapConfig[0].libraries}>
        <GoogleMap
          mapContainerStyle={mapConfig[0].containerStyle}
          center={mapConfig[0].center}
          zoom={mapConfig[0].zoom}
          options={{ fullscreenControl: false }}
        >
          <div className="searchBoxesContainer">
            <StandaloneSearchBox onLoad={onLoadOrigin} onPlacesChanged={onPlacesChangedOrigin}>
              <input className="searchBox" type="text" placeholder="Origin" />
            </StandaloneSearchBox>
            <StandaloneSearchBox onLoad={onLoadDestination} onPlacesChanged={onPlacesChangedDestination}>
              <input className="searchBox" type="text" placeholder="Destination" />
            </StandaloneSearchBox>
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
