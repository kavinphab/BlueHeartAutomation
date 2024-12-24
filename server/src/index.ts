import express, { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import logger from "pino";
import YAML from "yaml";

const LOGGER = logger();
const APP = express();
const CONFIG = YAML.parse(fs.readFileSync("config.yml", "utf8"));
APP.use(express.json());

APP.listen(3001, async () => {
  const address = CONFIG["server"]["address"] ?? "localhost";
  const port = (CONFIG["server"]["port"] as number) ?? 3001;
  const ssl = (CONFIG["server"]["ssl"]["enabled"] as boolean) ?? false;

  const endpoints = [];

  if (fs.existsSync(path.join(__dirname, "routes"))) {
    const files = await fs.promises.readdir(path.join(__dirname, "routes"), {
      recursive: true,
    });
    for (let f of files) {
      if (!f.endsWith(".ts")) continue;
      f = f.replaceAll("\\", "/");
      const directory = f.substring(0, f.lastIndexOf("/"));
      const fileName = f.substring(f.lastIndexOf("/") + 1);
      const imp = await import(`./routes/${directory}/${fileName}`);
      for (const key of Object.keys(imp)) {
        if (typeof imp[key] !== "function") continue;
        if (key === "GET") {
          console.log(directory);
          APP.get(
            `/${directory.replace("[", ":").replace("]", "")}`,
            async (request: Request, response: Response) => {
              await imp[key](request, response);
            },
          );
          endpoints.push([directory.replace("[", ":").replace("]", ""), key]);
          continue;
        }
        if (key === "POST") {
          APP.post(
            `/${directory.replace("[", ":").replace("]", "")}`,
            async (request: Request, response: Response) => {
              await imp[key](request, response);
            },
          );
          endpoints.push([directory.replace("[", ":").replace("]", ""), key]);
          continue;
        }
        if (key === "PUT") {
          APP.put(
            `/${directory.replace("[", ":").replace("]", "")}`,
            async (request: Request, response: Response) => {
              await imp[key](request, response);
            },
          );
          endpoints.push([directory.replace("[", ":").replace("]", ""), key]);
          continue;
        }
        if (key === "DELETE") {
          APP.delete(
            `/${directory.replace("[", ":").replace("]", "")}`,
            async (request: Request, response: Response) => {
              await imp[key](request, response);
            },
          );
          endpoints.push([directory.replace("[", ":").replace("]", ""), key]);
          continue;
        }
      }
    }
  }
  LOGGER.info(
    `Running BlueHearts Automation Server at: ${ssl ? "https://" : "http://"}${address}:${port}/`,
  );
  LOGGER.info(`Endpoints: \n${endpoints.join("\n")}`);
});
export const config = () => {
  return CONFIG;
};
