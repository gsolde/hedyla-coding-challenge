export const addOrigin = (origin) => {
  return {
    type: "ADD_ORIGIN",
    payload: origin,
  };
};

export const addDestination = (dest) => {
  return {
    type: "ADD_DESTINATION",
    payload: dest,
  };
};
