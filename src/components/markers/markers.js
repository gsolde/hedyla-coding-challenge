import React from "react";
import { Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";

function Markers() {
  const routeDetails = useSelector((state) => state);

  return (
    <div>
      <Marker position={routeDetails.origin} animation={2} opacity={0.8} />
      <Marker position={routeDetails.destination} animation={2} opacity={0.8} />
    </div>
  );
}

export default Markers;
