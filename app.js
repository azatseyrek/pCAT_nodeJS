const express = require("express");
const path = require("path");
const ejs = require("ejs");
const Photo = require("./models/Photo");
const mongoose = require("mongoose");

const app = express();

//connect db

mongoose.connect("mongodb://localhost/pcat-db");

//  TEMPLATE ENGINE

//template engine views klasorunu arar o yuzden temp klasorunun ismini views olarak degistiriyoruz.

app.set("view engine", "ejs");

// -----------------------------------------------------------------
// MIDDLEWARES
//express.static ibaresi bir midleware dir. Ayni req ve res arasinda olan herseye midleware denir
// const myLogger = (req, res, next) => {
//   console.log("Middleware Log 1");
//   next();
// };
app.use(express.static("public"));
// app.use(myLogger);

//daha once bodyParser kullanirdik artk ejs icerisinde midleWares kullanarak bodyParserin isini yapabiliriz
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -----------------------------------------------------------------

//ROUTES
app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"));
  //EJS kullandigimiz icin artik render kullanmamiz gerekecek!!! ONEMLI
  const photos =  await Photo.find();
  res.render("index", {
    photos: photos,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});
//Burdaki photosu  form da method : post ve action = "/photos" yazdigimizdan dolayi kullaniyoruz
app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`pCat app listening on port ${port}!`);
});
