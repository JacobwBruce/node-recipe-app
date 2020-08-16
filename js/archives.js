window.addEventListener('load', function () {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  if (recipes.length === 0) {
    document.getElementById('email-button').disabled = true;
    document.getElementById('clear-button').disabled = true;
  }

  const container = document.getElementById('recipes-container');
  const form = document.getElementById('emailForm');
  for (let recipe of recipes) {
    container.innerHTML += `
        <div class="recipe">
            <img class="recipe-image" src="${recipe.image}">
            <div class="divider"></div>
            <h1 class="recipe-name">${recipe.name}</h1>
        </div>
        `;

    let ingredientsInput = document.createElement('input');
    ingredientsInput.type = 'hidden';
    ingredientsInput.name = 'hiddenIngredients';
    ingredientsInput.value = recipe.ingredients;

    let hiddenNames = document.createElement('input');
    hiddenNames.type = 'hidden';
    hiddenNames.name = 'hiddenRecipeNames';
    hiddenNames.value = recipe.name;

    form.appendChild(hiddenNames);
    form.appendChild(ingredientsInput);
  }

  document
    .getElementById('confirm-clear-button')
    .addEventListener('click', () => {
      localStorage.removeItem('recipes');
      window.location.reload();
    });
});
