import { Router } from "express";
import PostHandler from "./post-handler";

const app = Router();

app.get("/list", PostHandler.getPosts);

export default app;
