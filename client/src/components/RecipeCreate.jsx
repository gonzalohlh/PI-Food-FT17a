import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    aggregateLikes: 0,
    healthScore: 0,
    analyzedInstructions: "",
    image: "",
    diets: [],
  });

  function handleChange(e) {
    setInput((input) => ({
      ...input,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSelect(e) {
    setInput((input) => ({
      ...input,
      diets: [...input.diets, e.target.value],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("Recipe created!");
    setInput({
      title: "",
      summary: "",
      aggregateLikes: 0,
      healthScore: 0,
      analyzedInstructions: "",
      image: "",
      diets: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Back to Home</button>
      </Link>
      <h1>Create your own Recipe here</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Plate name:</label>
          <input
            type="text"
            value={input.title}
            name="title"
            onChange={(e) => handleChange(e)}
          />
          <label>Summary:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          <label>Score:</label>
          <input
            type="text"
            value={input.aggregateLikes}
            name="aggregateLikes"
            onChange={(e) => handleChange(e)}
          />
          <label>Health Level:</label>
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
          <label>Instructions:</label>
          <input
            type="text"
            value={input.analyzedInstructions}
            name="analyzedInstructions"
            onChange={(e) => handleChange(e)}
          />
          <label>Image:</label>
          <input
            type="text"
            placeholder="Example: https://..."
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {diets.map((d) => (
            <option value={d.name} key={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        {input.diets.map((d, i) => (
          <ul key={i}>
            <li>{d}</li>
          </ul>
        ))}
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}
/* [X] Un formulario controlado con los siguientes campos
Nombre
Resumen del plato
Puntuación
Nivel de "comida saludable"
Paso a paso
[X] Posibilidad de seleccionar/agregar uno o más tipos de dietas
[X] Botón/Opción para crear una nueva receta */
