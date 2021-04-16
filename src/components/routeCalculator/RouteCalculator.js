import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import { SearchBoxes } from "../searchBoxes/SearchBoxes";
import { useSelector, useDispatch } from "react-redux";
import { selectOrigin, selectDestination } from "../searchBoxes/searchBoxesSlice";
import { addRoutes } from "./routeCalculatorSlice";
import getRoutes from "../../services/osrm";
import mapsAPI from "../../config/mapsAPI.json";
import "./RouteCalculator.css";

export function RouteCalculator() {
  const [routeDistance, setRouteDistance] = useState(0);
  const [costKm, setCostKm] = useState(0.5);
  const [routeCost, setRouteCost] = useState(0);
  const [vehicleType, setVehicleType] = useState("truck");
  const [calculationType, setCalculationType] = useState("distance");

  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();

  function calculateRoute() {
    if (origin && destination) {
      fetch(
        `http://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?alternatives=true&geometries=polyline&steps=true`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(addRoutes(data));
          setRouteDistance(data.routes[0].distance / 1000);
          setRouteCost(routeDistance * costKm);
        });
    } else {
      setRouteCost(routeDistance * costKm);
    }
  }

  return (
    <>
      <div className="routeCalculatorContainer">
        <div className="title">
          <h1>Route calculator</h1>
        </div>
        <div className="row">
          <button
            className={calculationType === "distance" ? "activeCalcTypeButton" : "calcTypeSelectorButton"}
            onClick={() => {
              setCalculationType("distance");
              setRouteDistance(0);
            }}
          >
            Distance
          </button>
          <button
            className={calculationType === "originDest" ? "activeCalcTypeButton" : "calcTypeSelectorButton"}
            onClick={() => {
              setCalculationType("originDest");
              setRouteDistance(0);
            }}
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
            <div>
              <input className="dataInput" onChange={(e) => setRouteDistance(e.target.value)} placeholder="km" />
              <label className="label">distance in km</label>
            </div>
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
              setCostKm(0.0);
            }}
          >
            Other
          </button>
        </div>
        <div className="row">
          <div>
            <input
              className="dataInput"
              onChange={(e) => setCostKm(e.target.value)}
              value={costKm}
              placeholder="cost"
            />
            <label className="label">€/km</label>
          </div>
        </div>
        <div className="calculateButtonContainer">
          <button
            className="calculateButton"
            onClick={() => {
              calculateRoute();
            }}
          >
            Calculate!
          </button>
        </div>
        {routeDistance > 0 && routeCost > 0 && (
          <div className="calculationDataContainer">
            <p className="totalCost">{`Total distance: ${routeDistance.toFixed(2)} km`}</p>
            <p className="totalCost">{`Total cost: ${routeCost.toFixed(2)} €`}</p>
          </div>
        )}
      </div>
    </>
  );
}
