import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import mapConfig from "../../config/mapConfig.json";
import SearchBoxes from "../../components/searchBoxes/SearchBoxes";
import "./Map.css";

export function Map() {
  return (
    <div className="mapContainer">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={mapConfig[0].libraries}>
        <GoogleMap
          mapContainerStyle={mapConfig[0].containerStyle}
          center={mapConfig[0].center}
          zoom={mapConfig[0].zoom}
          options={mapConfig[0].options}
        >
          <SearchBoxes />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
