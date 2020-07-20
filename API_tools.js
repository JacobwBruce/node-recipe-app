import axios from "axios";

const API_KEY = 1;

export const getRecipesByCategory = async (category) => {
  const data = await axios.get(`
            https://www.themealdb.com/api/json/v1/${API_KEY}/filter.php?c=${category}`);
  return data.data.meals;
};

export const getRecipeById = async (recipeId) => {
  const data = await axios.get(
    `https://www.themealdb.com/api/json/v1/${API_KEY}/lookup.php?i=${recipeId}`
  );
  return data.data.meals[0];
};

export const getRecipesBySearch = async (query) => {
  const data = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  return data.data.meals;
}