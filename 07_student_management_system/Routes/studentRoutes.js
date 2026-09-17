import express from "express";
import studentController from "../Controller/studentController.js";

const router = express.Router();

router.post("/addStudent", studentController);

export default router;
