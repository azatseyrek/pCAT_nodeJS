const express = require("express");
const path  = require("path");
const app = express();
const port = 3000;

// const myLogger = (req, res, next) => {
//   console.log("Middleware Log 1");
//   next();
// };

// MIDDLEWARES
//express.static ibaresi bir midleware dir. Ayni req ve res arasinda olan herseye midleware denir
app.use(express.static("public"));
// app.use(myLogger);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'))
});

app.listen(port, () => {
  console.log(`pCat app listening on port ${port}!`);
});


