// app.js
const express = require("express");
const app = express();
const path = require("node:path");
const usersRouter = require("./routes/usersRouter");
const searchRouter = require("./routes/searchRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", usersRouter);
app.use("/search", searchRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
