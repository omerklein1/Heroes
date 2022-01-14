require("dotenv").config();
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  router = require("./Router"),
  pino = require("pino-http"),
  cors = require("cors");

// const { httpPrintFactory } = require("pino-http-print");
// const printer = httpPrintFactory();
// const logger = require("express-pino-logger")(printer);

// const { httpPrintFactory } = require("pino-http-print");
// const printer = httpPrintFactory();
// var logger = require("pino-http")(printer);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(logger);
router(app);

const port = process.env.PORT || 1234;
app.listen(port, () => console.log(`Server is running at port: ${port}`));
