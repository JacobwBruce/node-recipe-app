import Express from "express";
import exphbs from "express-handlebars";
import path from "path";
import {
  getRecipeById,
  getRecipesByCategory,
  getRecipesBySearch
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

// Handlers
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.get("/categories", (req, res) => {
  res.render("categories");
});

app.get("/search", async (req, res) => {
  const categories = ['SEAFOOD', 'BEEF', 'PORK', 'CHICKEN', 'PASTA', 'BREAKFAST', 'VEGETERIAN', 'LAMB', 'DESSERT'];
  const searchQuery = req.query.query;
  let meals = [];
  if (categories.indexOf(searchQuery.toUpperCase()) == -1) {
    meals = await getRecipesBySearch(searchQuery);
  } else {
    meals = await getRecipesByCategory(searchQuery);
  }
  let errors;
  meals === [] ? errors = true : errors = false;
  res.render("recipe-list", {
    searchQuery,
    meals,
    errors
  });
});

app.get("/meal", async (req, res) => {
  const meal = await getRecipeById(req.query.id);
  res.render("recipe", {
    meal
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));