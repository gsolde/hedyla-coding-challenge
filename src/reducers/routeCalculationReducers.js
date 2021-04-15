const routeCalculationReducers = (state = [], action) => {
  switch (action.type) {
    case "ADD_ORIGIN":
      return [...state, action.payload];
    case "ADD_DESTINATION":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default routeCalculationReducers;
