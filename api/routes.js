import express from "express";
import { getUsersWithinRadius } from "./controller.js";
import { createUser } from "./controller.js";

const router = express.Router();

router.get("/users", getUsersWithinRadius);
router.post("/createUser", createUser);

export default router;
