document.addEventListener("click", () => {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const mealId = document.getElementById("mealId").value;
  const name = document.getElementById("mealName").value;
  const image = document.getElementById("mealImage").value;
  const ingredients = document.getElementById("mealIngredientsString").value;
  recipes.push({
    mealId,
    name,
    image,
    ingredients,
  });
  localStorage.setItem("recipes", JSON.stringify(recipes));
  window.location = "/archives";
});
