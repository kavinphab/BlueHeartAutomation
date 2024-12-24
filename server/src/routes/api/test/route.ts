import { Request, Response } from "express";

export const GET = async (request: Request, response: Response) => {
  response.send("hi").status(200);
};

export const POST = async (request: Request, response: Response) => {
  response.send("hi").status(200);
};
