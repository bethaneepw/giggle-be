const endpoints = require("../../endpoints.json");

import { Request, Response } from "express";

const getApi = (req: Request, res: Response): void => {
  res.status(200).send({ endpoints });
};

module.exports = { getApi };


// const endpoints = require("../../endpoints.json");

// import { Request, Response } from "express";


// exports.getApi = (req: Request, res: Response): void => {
//   res.status(200).send({ endpoints });
// };

