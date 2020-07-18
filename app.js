import Express from "express";
import exphbs from "express-handlebars";
import path from "path";

// Middleware
const app = Express();
const __dirname = path.resolve();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(Express.static(__dirname));

// Handlers
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.get("/categories", (req, res) => {
  res.render("categories");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
