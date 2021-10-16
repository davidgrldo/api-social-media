import { Router } from "express";
import { verify } from "../libs/auth";
import auth from "../controllers/auth";
import post from "../controllers/post";

const app = Router();

app.use("/auth", auth);
app.use("/posts", verify, post);

export default app;
