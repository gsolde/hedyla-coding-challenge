import React, { useState } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import mapConfig from "../../mapConfig/mapConfig.json";
import getRoutes from "../../services/osrm";
import "./Map.css";

export function Map() {
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
    getRoutes(org, dest);
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
            <button onClick={() => fetchRoute(origin, destination)}>Get it!</button>
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
