import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";

require("dotenv").config();

const app = express();
const PORT = process.env.APP_PORT || 8000;

app.use(bodyParser({ extends: { urlencoded: true } }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", routes);
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
