import axios from "axios";

export const GET_BY_TYPE_OF_DIET = "GET_BY_TYPE_OF_DIET";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

export function getFilterByDiet(payload) {
  return {
    type: "GET_FILTER_BY__DIET",
    payload,
  };
}
