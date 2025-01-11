import { type Response, type Request } from "express";

function status(req: Request, res: Response) {
  res.send({ status: "Ok" });
}

export default {
  status,
};
