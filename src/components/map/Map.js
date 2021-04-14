import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import mapConfig from "../../mapConfig/mapConfig.json";
import "./Map.css";

export function Map() {
  return (
    <div className="mapContainer">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapConfig[0].containerStyle}
          center={mapConfig[0].center}
          zoom={mapConfig[0].zoom}
          options={{ fullscreenControl: false }}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
