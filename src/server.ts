import express from "express";
import configRoutes from "./routes";
import configGlobalMiddlewares from "./middlewares";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

configGlobalMiddlewares(app);
configRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
