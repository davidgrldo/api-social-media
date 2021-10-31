import { Router } from "express";
import CommentHandler from "./comment-handler";

const app = Router();

app.get("/:post_id/comments", CommentHandler.getComments);
app.post("/:post_id/comments/create", CommentHandler.createComment);

export default app;
