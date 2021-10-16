import { Router } from "express";
import AuthHandler from "./auth-handler";

const app = Router();
app.post("/register", AuthHandler.register);
app.post("/login", AuthHandler.login);

export default app;
