import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import mapsAPI from "../../config/mapsAPI.json";
import Markers from "../../components/markers/Markers";
import Polyline from "../../components/polylines/Polylines";
import "./Map.css";

export function Map() {
  return (
    <div className="mapContainer">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={mapsAPI[0].libraries}>
        <GoogleMap
          mapContainerStyle={mapsAPI[0].containerStyle}
          center={mapsAPI[0].center}
          zoom={mapsAPI[0].zoom}
          options={mapsAPI[0].options}
        >
          <Markers />
          <Polyline />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
