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
import "../styles/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  //Paginado:
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [orderName, setOrderName] = useState("");
  const [orderLike, setOrderLike] = useState("");

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
    <div className="home">
      <h1>THE WIKIPEDIA OF RECIPES...</h1>
      <SearchBar />
      <Link to="/recipe" className="linkCreate">
        <button className="btnCreate">Create your recipe</button>
      </Link>
      <div className="showAll">
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Show all recipes
        </button>
      </div>
      <div className="select">
        <span className="span">Order by Recipe Name</span>
        <select onChange={(n) => handleSelectByName(n)}>
          <option value="default">All</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <span className="span">Order by Score</span>
        <select onChange={(s) => handleSelectByScore(s)}>
          <option value="All">All</option>
          <option value="Asc">Highest Score</option>
          <option value="Desc">Lowest Score</option>
        </select>
        <span className="span">Filter by Type of diet</span>
        <select onChange={(e) => handleSelectTypeOfDiet(e)}>
          <option value="default">All Diets</option>
          {diets.map((d) => (
            <option value={d.name} key={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div className="paginate">
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
      </div>
      <div className="cards">
        {currentRecipes?.map((c) => (
          <div key={c.id}>
            <Link to={"/home/" + c.id} className="linkCard">
              <Card
                title={c.title}
                image={
                  c.image ? (
                    c.image
                  ) : (
                    <img
                      src="https://image.freepik.com/foto-gratis/fondo-alimentos-concepto-alimentos-varios-sabrosos-ingredientes-frescos-cocinar-ingredientes-italianos-comida-vista-arriba_1220-1493.jpg"
                      alt="Img not provided"
                    />
                  )
                }
                diets={
                  c.createdDb
                    ? c.diets.map((d) => (
                        <p key={d.name} className="dietsMap">
                          {d.name}
                        </p>
                      ))
                    : c.diets.map((d) => (
                        <p key={d} className="dietsMap">
                          {d}
                        </p>
                      ))
                }
                vegetarian={
                  c.vegetarian === true ? (
                    <p className="dietsMap">vegetarian</p>
                  ) : (
                    <p></p>
                  )
                }
                score={c.aggregateLikes}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="paginate">
        <Paginate
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
