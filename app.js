const express = require("express");
const path = require("path");
const ejs = require("ejs");


const app = express();

//  TEMPLATE ENGINE

//template engine views klasorunu arar o yuzden temp klasorunun ismini views olarak degistiriyoruz.

app.set("view engine", "ejs")


// MIDDLEWARES
//express.static ibaresi bir midleware dir. Ayni req ve res arasinda olan herseye midleware denir
// const myLogger = (req, res, next) => {
//   console.log("Middleware Log 1");
//   next();
// };
app.use(express.static("public"));
// app.use(myLogger);


//ROUTES
app.get("/", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"));
  //EJS kullandigimiz icin artik render kullanmamiz gerekecek!!! ONEMLI
  res.render('index')
});

app.get("/about", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"));
  //EJS kullandigimiz icin artik render kullanmamiz gerekecek!!! ONEMLI
  res.render('about')
});
app.get("/add", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "temp/index.html"));
  //EJS kullandigimiz icin artik render kullanmamiz gerekecek!!! ONEMLI
  res.render('add')
});




const port = 3000;
app.listen(port, () => {
  console.log(`pCat app listening on port ${port}!`);
});
