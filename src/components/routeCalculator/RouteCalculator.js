import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import { SearchBoxes } from "../searchBoxes/SearchBoxes";
import { useSelector, useDispatch } from "react-redux";
import { selectOrigin, selectDestination, resetPlacesState } from "../searchBoxes/searchBoxesSlice";
import { addRoutes, resetRoutesState } from "./routeCalculatorSlice";
import mapsAPI from "../../config/mapsAPI.json";
import "./RouteCalculator.css";

export function RouteCalculator() {
  const [calculationType, setCalculationType] = useState("distance");
  const [routeDistance, setRouteDistance] = useState(0);
  const [vehicleType, setVehicleType] = useState("truck");
  const [costKm, setCostKm] = useState(0.5);
  const [routeCost, setRouteCost] = useState(0);
  const [calculationPerformed, setCalculationPerformed] = useState(false);

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
          let distanceKm = data.routes[0].distance / 1000;
          dispatch(addRoutes(data));
          setRouteDistance(distanceKm.toFixed(2));
          setRouteCost((distanceKm * costKm).toFixed(2));
        });
    }
    setRouteCost((routeDistance * costKm).toFixed(2));
    setCalculationPerformed(true);
  }

  return (
    <>
      <div className="routeCalculatorContainer">
        <div className="title">
          <h2>Route calculator</h2>
        </div>
        <div className="calcTypeInfo">
          <p>Select calculation type</p>
        </div>
        <div className="row">
          <button
            className={calculationType === "distance" ? "activeCalcTypeButton" : "calcTypeSelectorButton"}
            onClick={() => {
              setCalculationType("distance");
              setRouteDistance(0);
              setCalculationPerformed(false);
              dispatch(resetPlacesState());
              dispatch(resetRoutesState());
            }}
          >
            Distance
          </button>
          <button
            className={calculationType === "originDest" ? "activeCalcTypeButton" : "calcTypeSelectorButton"}
            onClick={() => {
              setCalculationType("originDest");
              setRouteDistance(0);
              setCalculationPerformed(false);
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
        <div className="vehicleTypeInfo">
          <p>Select vehicle type</p>
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
        {calculationPerformed && (
          <div className="calculationDataContainer">
            <p className="totalCost">{`Total distance: ${routeDistance} km`}</p>
            <p className="totalCost">{`Total cost: ${routeCost} €`}</p>
            {origin && destination && (
              <div className="calculateButtonContainer">
                <button
                  className="resetButton"
                  onClick={() => {
                    dispatch(resetPlacesState());
                    dispatch(resetRoutesState());
                    setCalculationPerformed(false);
                  }}
                >
                  Reset origin & destination
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
