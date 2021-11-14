require("./models/db");

const express = require("express");
const path = require("path");
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");
const animalController = require("./controllers/animalController");
var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
    res.send(`
        <h2>Welcome to Animals Database</h2>
        <h3>Click here to access <b><a href="/animal/list">Database</a></b></h3>`);
});

app.set("views", path.join(__dirname, "/views/"));

app.engine(
    "hbs",
    exphbs({
        handlebars: allowInsecurePrototypeAccess(handleBars),
        extname: "hbs",
        defaultLayout: "MainLayout",
        layoutsDir: __dirname + "/views/layouts/"
    })
);

app.set("view engine", "hbs");

app.listen (3000, () => {
 console.log("Server started at port 3000");
});

app.use ("/animal", animalController);