import type { Application } from "express";
import LogMiddleware from "./LogMiddleware";

export default (app: Application) => {
  app.use(LogMiddleware);
};
