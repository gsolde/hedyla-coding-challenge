import React from "react";
import { Polyline } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { selectRoutes } from "../routeCalculator/routeCalculatorSlice";
import polyline from "@mapbox/polyline";

function Polylines() {
  const routes = useSelector(selectRoutes);
  let routeGeometry;
  let decodedPolyline;

  function decodePolyline(routes) {
    routeGeometry = routes.routes[0].geometry;
    decodedPolyline = polyline.decode(routeGeometry, 5).map((latLng) => {
      return { lat: latLng[0], lng: latLng[1] };
    });
  }

  routes && decodePolyline(routes);

  const options = {
    strokeColor: "black",
    strokeOpacity: 0.3,
    strokeWeight: 5,
  };

  return (
    <div>
      <Polyline path={decodedPolyline} options={options} />
    </div>
  );
}

export default Polylines;
