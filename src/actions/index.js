export const addOrigin = (origin) => {
  return {
    type: "ADD_ORIGIN",
    payload: origin,
  };
};

export const addDestination = (destination) => {
  return {
    type: "ADD_DESTINATION",
    payload: destination,
  };
};

export const addRoutes = (routes) => {
  return {
    type: "ADD_ROUTES",
    payload: routes,
  };
};
