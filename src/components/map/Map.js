import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination } from "../searchBoxes/searchBoxesSlice";
import mapsAPI from "../../config/mapsAPI.json";
import Markers from "../markers/Markers";
import Polyline from "../polylines/Polylines";
import "./Map.css";

export function Map() {
  const [mapCenter, setMapCenter] = useState(mapsAPI[0].center);

  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  function mapCenterSetter() {
    origin && setMapCenter(origin);
    origin && destination && setMapCenter(destination);
  }

  useEffect(() => {
    mapCenterSetter();
  });

  return (
    <div className="mapContainer">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={mapsAPI[0].libraries}>
        <GoogleMap
          mapContainerStyle={mapsAPI[0].containerStyle}
          center={mapCenter}
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
