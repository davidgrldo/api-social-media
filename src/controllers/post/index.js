import { Router } from "express";
import PostHandler from "./post-handler";
import { upload } from "../../libs/upload";

const app = Router();

app.get("/list", PostHandler.getPosts);
app.post("/create", upload.single("posts"), PostHandler.createPost);

export default app;
