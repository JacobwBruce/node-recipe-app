import Express from "express";
import exphbs from "express-handlebars";
import path from "path";
import {
  getRecipeById,
  getRecipesByCategory,
  getRecipesBySearch,
} from "./API_tools.js";

// Middleware
const app = Express();
const __dirname = path.resolve();

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.use(Express.static(__dirname));

app.use(
  Express.urlencoded({
    extended: true,
  })
);

// Handlers
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.get("/categories", (req, res) => {
  res.render("categories");
});

app.get("/search", async (req, res) => {
  const categories = [
    "SEAFOOD",
    "BEEF",
    "PORK",
    "CHICKEN",
    "PASTA",
    "BREAKFAST",
    "VEGETARIAN",
    "LAMB",
    "DESSERT",
  ];
  const searchQuery = req.query.query;
  let meals = [];
  if (categories.indexOf(searchQuery.toUpperCase()) == -1) {
    meals = await getRecipesBySearch(searchQuery);
  } else {
    meals = await getRecipesByCategory(searchQuery);
  }
  let errors;
  meals === [] ? (errors = true) : (errors = false);
  res.render("recipe-list", {
    searchQuery,
    meals,
    errors,
  });
});

app.get("/meal", async (req, res) => {
  let meal = await getRecipeById(req.query.id);
  meal.strInstructions = meal.strInstructions.split("\n");
  meal = ingredientsFormatter(meal);
  res.render("recipe", {
    meal,
  });
});


app.get("/archives", (req, res) => {
  res.render("archives");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

const ingredientsFormatter = (meal) => {
  meal.ingredients = [];
  for (let x = 1; x < 21; x++) {
    if (meal[`strIngredient${x}`].length < 1) {
      break;
    }
    meal.ingredients.push(
      `${meal[`strIngredient${x}`]} | ${meal[`strMeasure${x}`]}`
    );
  }
  return meal;
};