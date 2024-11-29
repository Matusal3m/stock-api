import express from "express";
import configRoutes from "./routes";

const app = express();
const port = 3000;

configRoutes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});