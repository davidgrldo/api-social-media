import { Router } from "express";
import PostHandler from "./post-handler";
import { upload } from "../../libs/upload";

const app = Router();

app.get("/list", PostHandler.getPosts);
app.post("/create", upload.single("posts"), PostHandler.createPost);
app.put("/update/:id", PostHandler.updatePost);
app.delete("/delete/:id", PostHandler.deletePost);

export default app;
