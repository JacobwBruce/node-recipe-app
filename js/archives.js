window.addEventListener('load', function () {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const container = document.getElementById('recipes-container');
    for (let recipe of recipes) {
        container.innerHTML += `
        <div class="recipe">
            <img class="recipe-image" src="${recipe.image}">
            <div class="divider"></div>
            <h1 class="recipe-name">${recipe.name}</h1>
        </div>
        `;
    }

    document.getElementById('clear-button').addEventListener('click', () => {
        if (confirm('Are you sur you want to delete your list?')) {
            localStorage.removeItem('recipes');
            window.location.reload();
        }
    });

    document.getElementById('email-button').addEventListener('click', () => {
        const email = prompt('Please enter your email');
        console.log(email);
    });
});