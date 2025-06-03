import { Request, Response } from "express";

const {
  selectAllUsers,
  addNewuser,
  deleteUserByUserId,
  selectUserByUserId,
} = require("../models/users.models.ts");

interface User {
  id: number;
  name: string;
  profile_picture: string;
  trustworthiness: number;
}
