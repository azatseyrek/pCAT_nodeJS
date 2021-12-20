const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const Photo = require("./models/Photo");
const mongoose = require("mongoose");
const fs = require("fs");

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
app.use(fileUpload()); //express-fileupload ten gele midleware

// -----------------------------------------------------------------

//ROUTES
app.get("/", async (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"));
  //EJS kullandigimiz icin artik render kullanmamiz gerekecek!!! ONEMLI
  const photos = await Photo.find().sort('-dateCreated') //dateCreated in basina eksi koyduk son yuklenen basa gelmesi icin onemli nokta
  res.render("index", {
    photos: photos,
  });
});

//tiklanilan id yi yakalamak icin kullaniyoruz. ilgili Viewde ahref ejs ile id tanimlandi
app.get("/photos/:id", async (req, res) => {
  // console.log(req.params.id);
  // res.render("photo");
  let photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo: photo,
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
  // console.log(req.files.image);

  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
    res.redirect("/");
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`pCat app listening on port ${port}!`);
});
