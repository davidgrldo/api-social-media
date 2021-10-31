import { Router } from "express";
import { verify } from "../libs/auth";
import auth from "../controllers/auth";
import post from "../controllers/post";
import comment from "../controllers/comment";

const app = Router();

app.use("/auth", auth);
app.use("/posts", verify, post);
app.use("/posts", verify, comment);

export default app;
