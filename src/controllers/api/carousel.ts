
import { Router } from "express";
import bodyParser from "body-parser";
import { body, param } from "express-validator";
import { Op, QueryTypes } from "sequelize";
import { getSlides } from "../../commands/test/carousel";


export default (): Router => {
  const router = Router();
  router.use(bodyParser.json());


  router.get("/", async (req, res, next) => {
    try {
      const slideAmount = req.query.slides ? Number(req.query.slides) : 3;
      const data = await getSlides(slideAmount);
      res.send(data);
    } catch (e) {
      next(new Error(e));
    }
  });

  return router;
}

