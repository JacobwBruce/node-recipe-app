import Express from "express";
import exphbs from "express-handlebars";
import path from "path";
import { getRecipeById, getRecipesByCategory } from "./API_tools.js";

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
  const searchQuery = req.query.query;
  const meals = await getRecipesByCategory(searchQuery);
  res.render("recipe-list", {
    searchQuery,
    meals,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
