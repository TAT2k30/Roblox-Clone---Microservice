import { Router } from "express";
import { getItems } from "../../controllers/Catalog.Controller";
import { authenticated } from "../../middlewares/roleMiddleWare";

const router = Router();

router.get("/items", authenticated, getItems);


export default router;
