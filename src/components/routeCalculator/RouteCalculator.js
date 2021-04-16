import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import { SearchBoxes } from "../searchBoxes/SearchBoxes";
import mapsAPI from "../../config/mapsAPI.json";
import "./RouteCalculator.css";

export function RouteCalculator() {
  const [routeDistance, setRouteDistance] = useState(0);
  const [costKm, setCostKm] = useState(0);
  const [routeCost, setRouteCost] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [calculationType, setCalculationType] = useState("distance");

  function calculateRouteCost(distance) {
    setRouteCost(distance * costKm);
  }

  return (
    <>
      <div className="routeCalculatorContainer">
        <div className="row">
          <h2>Route calculator</h2>
        </div>
        <div className="row">
          <button
            className={calculationType === "distance" ? "activeCalcTypeButton" : "calcTypeSelectorButton"}
            onClick={() => setCalculationType("distance")}
          >
            Distance
          </button>
          <button
            className={calculationType === "originDest" ? "activeCalcTypeButton" : "calcTypeSelectorButton"}
            onClick={() => setCalculationType("originDest")}
          >
            Org & dest
          </button>
        </div>
        <div>
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={mapsAPI[0].libraries}>
            {calculationType === "originDest" && <SearchBoxes />}
          </LoadScript>
        </div>
        <div className="row">
          {calculationType === "distance" && (
            <input className="distanceInput" onChange={(e) => setRouteDistance(e.target.value)} placeholder="km" />
          )}
        </div>
        <div className="row">
          <button
            className={vehicleType === "truck" ? "activeVehicleTypeButton" : "vehicleTypeSelectorButton"}
            onClick={() => {
              setVehicleType("truck");
              setCostKm(0.5);
            }}
          >
            Truck
          </button>
          <button
            className={vehicleType === "van" ? "activeVehicleTypeButton" : "vehicleTypeSelectorButton"}
            onClick={() => {
              setVehicleType("van");
              setCostKm(0.25);
            }}
          >
            Van
          </button>
          <button
            className={vehicleType === "other" ? "activeVehicleTypeButton" : "vehicleTypeSelectorButton"}
            onClick={() => {
              setVehicleType("other");
            }}
          >
            Other
          </button>
        </div>
        <div className="row">
          {vehicleType === "other" && (
            <input className="distanceInput" onChange={(e) => setCostKm(e.target.value)} placeholder="€/km" />
          )}
        </div>
        <div className="row">
          <button
            className="button"
            onClick={() => {
              calculateRouteCost(routeDistance);
            }}
          >
            Calculate!
          </button>
        </div>
        <div className="row">
          <h1>{`${routeCost} €`}</h1>
        </div>
      </div>
    </>
  );
}
