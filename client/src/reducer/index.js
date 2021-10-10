import {
  GET_RECIPES,
  FILTER_BY_DIET,
  GET_TYPES_OF_DIET,
  ORDER_BY_NAME,
  GET_NAME_RECIPE,
} from "../actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case GET_TYPES_OF_DIET:
      return {
        ...state,
        diets: action.payload,
      };
    case FILTER_BY_DIET:
      let allRecipes = state.allRecipes;
      const recipesApi = allRecipes.filter((r) => !r.createdDb);
      const filteredRecipesApi = recipesApi.filter((r) =>
        r.diets.includes(action.payload)
      );
      const recipeDb = allRecipes.filter((r) => r.createdDb);
      const filteredRecipeDb = recipeDb.filter(
        (r) => r.diets.name === action.payload
      );
      const filtered = filteredRecipeDb.concat(filteredRecipesApi);
      const vegetarianApi = allRecipes.filter((r) => r.vegetarian === true);
      const vegetarianDb = recipeDb.filter(
        (r) => r.diets.name === "vegetarian"
      );
      const vegetarian = vegetarianDb.concat(vegetarianApi);
      const ternario = action.payload === "vegetarian" ? vegetarian : filtered;

      return {
        ...state,
        recipes: action.payload === "default" ? allRecipes : ternario,
        //if, else if, else
      };
    case ORDER_BY_NAME:
      let totalRecipes = [...state.allRecipes];
      let sortedRecipes =
        action.payload === "A-Z"
          ? totalRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : totalRecipes.sort(function (a, b) {
              if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() < a.title.toLowerCase()) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        recipes:
          action.payload === "default" ? state.allRecipes : sortedRecipes,
      };
    case GET_NAME_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
