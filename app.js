const express = require("express");
const web = require("./routes/web");
const api = require("./routes/api");
const channel = require("./routes/channel");
const exphbs = require("express-handlebars");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/database")();
const port = process.env.PORT || 8000;
 

// use
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    partialsDir: __dirname + "/views/partials/",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.use(cors());
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.get("/cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "This has CORS enabled 🎈" });
});

// routes
app.use("/", web);
app.use("/api", api);
app.use("/channel", channel);

// Express Error Handling
app.get("*", (req, res, next) => {
  res.render("pageNotFound");
  next();
});


// Port
app.listen(port, () => {
  console.log(`App is running ${port}`);
});
