import React from "react";
import { Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination } from "../searchBoxes/searchBoxesSlice";

function Markers() {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  return (
    <div>
      origin && <Marker position={origin} animation={2} opacity={0.8} />
      destination && <Marker position={destination} animation={2} opacity={0.8} />
    </div>
  );
}

export default Markers;
