import express from "express";
import configRoutes from "./routes";
import "dotenv/config"

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

configRoutes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
