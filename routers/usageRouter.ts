import express, { Router } from "express";
import { getKeywords } from "../controller/uasageController";

const router: Router = express.Router();

router.route("/:id/get-words").get(getKeywords);

export default router;
