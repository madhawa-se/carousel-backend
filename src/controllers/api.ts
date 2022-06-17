import { Router } from "express";
import cors from "cors";
import carousel from "./api/carousel";

export default (): Router => {
  const router = Router();
  const corsOptions = {
    origin: "*",
  };
  router.use(cors(corsOptions));
  router.use("/carousel", carousel());

  return router;
};
