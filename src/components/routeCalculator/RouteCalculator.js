import React, { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import { SearchBoxes } from "../searchBoxes/SearchBoxes";
import { useSelector, useDispatch } from "react-redux";
import { selectOrigin, selectDestination, resetPlacesState } from "../searchBoxes/searchBoxesSlice";
import { fetchRoutes, resetRoutesState, selectRoutes } from "./routeCalculatorSlice";
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
  const routes = useSelector(selectRoutes);

  const dispatch = useDispatch();

  function selectCalculationType(calcType) {
    setCalculationType(calcType);
    setRouteDistance(0);
    if (calcType === "distance") {
      setCalculationPerformed(false);
      dispatch(resetPlacesState());
      dispatch(resetRoutesState());
    } else if (calcType === "originDest") {
      setCalculationPerformed(false);
    }
  }

  function selectVehicleType(vehicleType) {
    setVehicleType(vehicleType);
    vehicleType === "truck" && setCostKm(0.5);
    vehicleType === "van" && setCostKm(0.25);
    vehicleType === "other" && setCostKm(0.0);
  }

  function calculateRoute() {
    if (origin && destination) {
      let distanceKm = (routes.routes[0].distance / 1000).toFixed(2);
      setRouteDistance(distanceKm);
      setRouteCost((distanceKm * costKm).toFixed(2));
    } else {
      setRouteCost((routeDistance * costKm).toFixed(2));
    }
    setCalculationPerformed(true);
  }

  function resetCalculation() {
    dispatch(resetPlacesState());
    dispatch(resetRoutesState());
    setCalculationPerformed(false);
  }

  useEffect(() => {
    origin && destination && dispatch(fetchRoutes({ origin, destination }));
  }, [origin, destination]);

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
            onClick={() => selectCalculationType("distance")}
          >
            Distance
          </button>
          <button
            className={calculationType === "originDest" ? "activeCalcTypeButton" : "calcTypeSelectorButton"}
            onClick={() => selectCalculationType("originDest")}
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
              selectVehicleType("truck");
            }}
          >
            Truck
          </button>
          <button
            className={vehicleType === "van" ? "activeVehicleTypeButton" : "vehicleTypeSelectorButton"}
            onClick={() => {
              selectVehicleType("van");
            }}
          >
            Van
          </button>
          <button
            className={vehicleType === "other" ? "activeVehicleTypeButton" : "vehicleTypeSelectorButton"}
            onClick={() => {
              selectVehicleType("other");
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
            Calculate cost
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
                    resetCalculation();
                  }}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
