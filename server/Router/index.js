const HeroesLogic = require("../BL/HeroesLogic");
const UsersLogic = require("../BL/UsersLogic");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env["JWT_SECRET"];
const logger = require("pino-http")({
  quietReqLogger: true, // turn off the default logging output
  useLevel: "info",
  customReceivedMessage: function (req, _res) {
    return "request received: " + req.method + " - " + req.url;
  },
  transport: {
    target: "pino-http-print",
    options: {
      all: true,
      destination: 1,
      translateTime: true,
      colorize: true,
      relativeUrl: true,
    },
  },
});

const Router = (app) => {
  app.post("/users/login", async (req, res) => {
    try {
      console.log(req.body);
      const { body } = req,
        result = await UsersLogic.login(body);
      if (result.name) {
        const token = jwt.sign({ ...result }, JWT_SECRET, { expiresIn: "1h" });
        result.token = token;
        res.send(result);
      } else {
        res.send(result);
      }
      logger(req, res);
    } catch (err) {
      res.send(err);
    }
  });

  app.get("/users/verify", async (req, res) => {
    const token = req.headers["x-access-token"];

    if (!token) {
      res.send("please send token!");
    } else {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          res.send(err);
        } else {
          console.log(decoded);
          res.send(decoded);
        }
        logger(req, res);
      });
    }
  });

  app.post("/users/signin", async (req, res) => {
    try {
      const { body } = req,
        result = await UsersLogic.singin(body);
      res.send(result);
      logger(req, res);
    } catch (err) {
      res.send(err);
    }
  });

  app.put("/heroes/:id?", async (req, res) => {
    console.log(req.params.id);
    try {
      const { body } = req,
        result = await HeroesLogic.setHeroPowerUp(body, _id);
      res.send(result);
      logger(req, res);
    } catch (err) {
      res.send(err);
    }
  });

  app.get("/heroes", async (req, res) => {
    try {
      result = await HeroesLogic.getHeroesList();
      res.send(result);
      logger(req, res);
    } catch (error) {
      res.send(error);
    }
  });
};

module.exports = Router;
