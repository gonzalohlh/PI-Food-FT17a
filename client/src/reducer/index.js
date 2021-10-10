const initialState = {
  recipes: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_FILTER_BY__DIET":
      return {
        ...state,
        recipes: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
