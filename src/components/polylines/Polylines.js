import React from "react";
import { Polyline } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { selectRoutes } from "../routeCalculator/routeCalculatorSlice";
import polyline from "@mapbox/polyline";

function Polylines() {
  const routes = useSelector(selectRoutes);

  console.log(routes);

  let decodedPolyline = polyline
    .decode(
      "g}t|FuhgK}As]~h@yHvCbp@xq@cRxFzAu@`FfDcRbu@qo@zjB}h@fS}VhUssAnJmR~t@yWdn@bIjTmUvRof@rFyDz@dGiEcG[oa@jIuzAeYucBxBo_@aZe}@ix@svAc@wiApPmg@pu@mo@jc@io@rd@iCdXmOte@yIro@}|Alm@}u@bHgc@rZwLvR{i@b`@gZ~m@eOv|@uk@jBnC{fB}lB}ErJk[ws@xG}KiPsS",
      5
    )
    .map((latLng) => {
      return { lat: latLng[0], lng: latLng[1] };
    });

  const path = decodedPolyline;

  const options = {
    strokeColor: "black",
    strokeOpacity: 0.3,
    strokeWeight: 5,
  };

  return (
    <div>
      <Polyline path={path} options={options} />
    </div>
  );
}

export default Polylines;
