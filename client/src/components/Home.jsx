import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterByDiet,
  getTypesOfDiet,
  orderByName,
  orderByScoreLikes,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  //paginado:
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const [orderName, setOrderName] = useState("");
  const [orderLike, setOrderLike] = useState("");

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypesOfDiet());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleSelectTypeOfDiet(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
  }

  function handleSelectByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName("Order" + e.target.value);
  }

  function handleSelectByScore(e) {
    e.preventDefault();
    dispatch(orderByScoreLikes(e.target.value));
    setCurrentPage(1);
    setOrderLike("Order" + e.target.value);
  }

  return (
    <div>
      <h1>LET'S COOK!</h1>
      <SearchBar />
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Show all recipes
      </button>
      <div>
        <span>Order by Recipe Name</span>
        <select onChange={(n) => handleSelectByName(n)}>
          <option value="default">All</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <span>Order by Score</span>
        <select onChange={(s) => handleSelectByScore(s)}>
          <option value="All">All</option>
          <option value="Asc">Highest Score</option>
          <option value="Desc">Lowest Score</option>
        </select>
        <span>Filter by Diet</span>
        <select onChange={(e) => handleSelectTypeOfDiet(e)}>
          <option value="default">All Diets</option>
          {diets.map((d) => (
            <option value={d.name} key={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
        <Link to="/recipe">Create your recipe</Link>
        {currentRecipes?.map((c) => (
          <div key={c.id}>
            <Link to={"/home/" + c.id}>
              <Card
                title={c.title}
                image={
                  c.image ? (
                    c.image
                  ) : (
                    <img src="../recipeDefalut.jpg" alt="Img not provided" />
                  )
                }
                diets={
                  c.createdDb
                    ? c.diets.map((d) => <p key={d.name}>{d.name}</p>)
                    : c.diets.map((d) => <p hey={d}>{d}</p>)
                }
                vegetarian={c.vegetarian === true ? <p>vegetarian</p> : <p></p>}
              />
              ;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
