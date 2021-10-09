import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getByTypeOfDiet } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diet = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  /* function handleSelectTypeOfDiet(e) {
    e.preventDefault();
    dispatch(getByTypeOfDiet(e.target.value));
  } */

  return (
    <div>
      <Link to="/recipe">Create your recipe</Link>
      <h1>LET'S COOK!</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Show all recipes
      </button>
      <div>
        {/* <select onChange={(e) => handleSelectTypeOfDiet(e)}>
          {diet.map((diet) => (
            <option value={diet.name} key={diet.id}>
              {diet.name}
            </option>
          ))}
        </select> */}
        <select>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select>
          <option value="Asc">Highest Score</option>
          <option value="Desc">Lowest Score</option>
        </select>
        <select>
          <option value="AllDiets">All Diets</option>
          <option value="DairyFree">Dairy Free</option>
          <option value="GlutenFree">Gluten Free</option>
          <option value="LactoOvoVeg">Lacto Ovo Vegetarian</option>
          <option value="Primal">Primal</option>
          <option value="Pescatarian">Pescatarian</option>
          <option value="Whole30">Whole30</option>
          <option value="FodmapFriendly">Fodmap Friendly</option>
          <option value="Paleolithic">Paleolithic</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
        </select>
        {allRecipes?.map((c) => {
          return (
            <div>
              <Link to={"/home/" + c.id}>
                <Card
                  title={c.title}
                  image={c.image}
                  diets={c.diets}
                  key={c.id}
                />
                ;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
