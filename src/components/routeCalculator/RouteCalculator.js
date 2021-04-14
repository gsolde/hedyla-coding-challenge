import React, { useState } from "react";
import "./RouteCalculator.css";

export function RouteCalculator() {
  const [routeDistance, setRouteDistance] = useState(0);
  const [routeCost, setRouteCost] = useState(0);
  const [vehicleType, setVehicleType] = useState("truck");

  function calculateRouteCost(distance) {
    setRouteCost(vehicleType === "truck" ? distance * 25 : distance * 10);
  }

  return (
    <>
      <div className="routeCalculatorContainer">
        <div className="row">
          <input className="distanceInput" onChange={(e) => setRouteDistance(e.target.value)} />
        </div>
        <div className="row">
          <button
            className="button"
            onClick={() => {
              setVehicleType("truck");
            }}
          >
            Truck
          </button>
          <button
            className="button"
            onClick={() => {
              setVehicleType("van");
            }}
          >
            Van
          </button>
        </div>
        <button
          className="button"
          onClick={() => {
            calculateRouteCost(routeDistance);
          }}
        >
          Calculate!
        </button>
        <h1>{`${routeCost} €`}</h1>
      </div>
    </>
  );
}
