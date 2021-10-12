import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  input.title
    ? (errors.title = "")
    : (errors.title = "You must name the recipe");
  input.summary
    ? (errors.summary = "")
    : (errors.summary = "You must provide a summary");
  input.diets.length < 1
    ? (errors.diets = "You must choose at least one diet")
    : (errors.diets = "");
  if (!input.image.includes("https://") && !input.image.includes("http://")) {
    errors.image = "This isn't a valid image address";
  } else {
    errors.image = "";
  }
  return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectDiet(e) {
    setInput((input) => ({
      ...input,
      diets: [...input.diets, e.target.value],
    }));
    setErrors(
      validate({
        ...input,
        diets: [...input.diets, e.target.value],
      })
    );
  }

  function handleSubmit(e) {
    if (
      input.title === "" ||
      input.summary === "" ||
      !input.aggregateLikes ||
      !input.healthScore ||
      input.analyzedInstructions === "" ||
      input.image === "" ||
      input.diets === []
    ) {
      e.preventDefault();
      alert("You must complete every field");
    } else {
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
  }

  function handleDelete(e, d) {
    e.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((diet) => diet !== d),
    });
  }

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
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
          <label>Summary:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Score:</label>
          <input
            type="text"
            value={input.aggregateLikes}
            name="aggregateLikes"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Health Level:</label>
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Instructions:</label>
          <input
            type="text"
            value={input.analyzedInstructions}
            name="analyzedInstructions"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            placeholder="Example: https://..."
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <select onChange={(e) => handleSelectDiet(e)}>
          {diets.map((d) => (
            <option value={d.name} key={d.name}>
              {d.name}
            </option>
          ))}
        </select>
        {input.diets.map((d, i) => (
          <ul key={i}>
            <li>{d}</li>
            <button onClick={(e) => handleDelete(e, d)}>x</button>
          </ul>
        ))}
        {errors.diets && <p>{errors.diets}</p>}
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
