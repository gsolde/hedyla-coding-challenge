import React, { useState } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import mapConfig from "../../mapConfig/mapConfig.json";
import "./Map.css";

export function Map() {
  const [searchBox, setSearchBox] = useState({});

  const onLoad = (ref) => {
    setSearchBox(ref);
    return searchBox;
  };

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
            <StandaloneSearchBox onLoad={onLoad}>
              <input className="searchBox" type="text" placeholder="Origin" />
            </StandaloneSearchBox>
            <StandaloneSearchBox onLoad={onLoad}>
              <input className="searchBox" type="text" placeholder="Destination" />
            </StandaloneSearchBox>
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
