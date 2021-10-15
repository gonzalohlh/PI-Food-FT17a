const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiInfo = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  return apiInfo.data.results;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = dbInfo.concat(apiInfo);
  return totalInfo;
};

router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  const recipesTotal = await getAllRecipes();
  if (name) {
    let recipeTitle = await recipesTotal.filter((r) =>
      r.title.toLowerCase().includes(name.toLowerCase())
    );
    recipeTitle.length
      ? res.status(200).json(recipeTitle)
      : res.status(400).send("This recipe doesn't exist");
  } else {
    res.status(200).json(recipesTotal);
  }
});

router.get("/types", async (req, res) => {
  const recipesApi = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const types = await recipesApi.data.results.map((t) => t.diets);
  const diets = types.flat();
  const typeDiets = [...new Set(diets), "vegetarian"];
  typeDiets.forEach((d) => {
    Diet.findOrCreate({
      where: { name: d },
    });
  });
  const allDiets = await Diet.findAll();
  res.json(allDiets);
});

router.post("/recipe", async (req, res) => {
  let {
    title,
    summary,
    aggregateLikes,
    healthScore,
    analyzedInstructions,
    image,
    diets,
  } = req.body;
  if (!title || !summary) {
    return res.json("You must enter a title and a summary to create a recipe");
  }
  let recipeCreated = await Recipe.create({
    title,
    summary,
    aggregateLikes,
    healthScore,
    analyzedInstructions,
    image,
  });
  let dietDb = await Diet.findAll({ where: { name: diets } });
  recipeCreated.addDiet(dietDb);
  res.send("Recipe created successfully");
});

//Nombre
//Resumen del plato
//Puntuación
//Nivel de "comida saludable"
//Paso a paso

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipesTotal = await getAllRecipes();
  if (id) {
    let recipeId = await recipesTotal.filter((r) => r.id == id);
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(404).send("Recipe not found");
  }
});

module.exports = router;
