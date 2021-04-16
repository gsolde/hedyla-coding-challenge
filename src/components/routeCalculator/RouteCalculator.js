import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import { SearchBoxes } from "../searchBoxes/SearchBoxes";
import mapsAPI from "../../config/mapsAPI.json";
import "./RouteCalculator.css";

export function RouteCalculator() {
  const [routeDistance, setRouteDistance] = useState(0);
  const [costKm, setCostKm] = useState(0);
  const [routeCost, setRouteCost] = useState(0);
  const [vehicleType, setVehicleType] = useState("truck");

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
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={mapsAPI[0].libraries}>
            <SearchBoxes />
          </LoadScript>
        </div>
        <div className="row">
          <button className="button">km</button>
          <button className="button">Origin & destination</button>
        </div>
        <div className="row">
          <input className="distanceInput" onChange={(e) => setRouteDistance(e.target.value)} placeholder="km" />
        </div>
        <div className="row">
          <input
            type="radio"
            name="vehicleType"
            onChange={() => {
              setVehicleType("truck");
              setCostKm(0.5);
            }}
          />
          <label>Truck (0.5 €/km)</label>
          <input
            type="radio"
            name="vehicleType"
            onChange={() => {
              setVehicleType("van");
              setCostKm(0.25);
            }}
          />
          <label>Van (0.25 €/km)</label>
          <input type="radio" name="vehicleType" onChange={() => setVehicleType("other")} />
          <label>Other</label>
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
