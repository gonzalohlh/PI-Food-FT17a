import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const GET_TYPES_OF_DIET = "GET_TYPES_OF_DIET";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_SCORE_LIKES = "ORDER_BY_SCORE_LIKES";
export const GET_NAME_RECIPE = "GET_NAME_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const GET_DETAIL = "GET_DETAIL";

export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

export function getTypesOfDiet() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: "GET_TYPES_OF_DIET",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByDiet(payload) {
  return {
    type: "FILTER_BY_DIET",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByScoreLikes(payload) {
  return {
    type: "ORDER_BY_SCORE_LIKES",
    payload,
  };
}

export function getNameRecipe(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        "http://localhost:3001/recipes?name=" + name
      );
      return dispatch({
        type: "GET_NAME_RECIPE",
        payload: json.data,
      });
    } catch (error) {
      alert("This recipe doesn't exist");
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}

export function postRecipe(payload) {
  return async function () {
    const json = await axios.post("http://localhost:3001/recipe", payload);
    return {
      type: "POST_RECIPE",
      json,
    };
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/recipes/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      alert("Id recipe not found");
    }
  };
}
