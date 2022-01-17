require("dotenv").config();
const express = require("express"),
  app = express(),
  router = require("./Router"),
  bodyParser = require("body-parser"),
  cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router(app);

const port = process.env.PORT || 1234;
app.listen(port, () => console.log(`Server is running at port: ${port}`));
