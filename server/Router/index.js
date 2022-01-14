const { get } = require("mongoose");
const BL = require("../BL");
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
    logger(req, res);
    try {
      console.log(req.body);
      const { body } = req,
        result = await BL.users.login(body);
      // res.log.info(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });

  app.post("/users/signin", async (req, res) => {
    logger(req, res);
    req.log.info("start to signin");
    try {
      const { body } = req,
        result = await BL.users.singin(body);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });

  app.put("/heroes/:hero_id", async (req, res) => {
    console.log(req.params.hero_id);
    try {
      const { body } = req,
        result = await BL.heroes.setHeroPowerUp(body);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });

  app.get("/heroes", async (req, res) => {
    try {
      result = await BL.heroes.getHeroesList();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });
};

module.exports = Router;
