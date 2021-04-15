const routeCalculationReducers = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ORIGIN":
      return { ...state, ...{ origin: action.payload } };
    case "ADD_DESTINATION":
      return { ...state, ...{ destination: action.payload } };
    case "ADD_ROUTES":
      return { ...state, ...{ routes: action.payload } };
    default:
      return state;
  }
};

export default routeCalculationReducers;
