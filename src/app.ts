import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongoDB } from "./config/connectionDB.config";

const app = express();
dotenv.config();

app.use(cors());

const apiVersion = "v1";
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    status: 200,
    message: "Server is running",
    endpoint: [
      `/${apiVersion}/characters`,
      `/${apiVersion}/creatures`,
      `/${apiVersion}/droids`,
      `/${apiVersion}/factions`,
      `/${apiVersion}/movies`,
      `/${apiVersion}/series`,
      `/${apiVersion}/species`,
      `/${apiVersion}/technologies`,
      `/${apiVersion}/vehicles`,
      `/${apiVersion}/weapons`,
    ],
  });
});

// Take all route method
import charactersRoutes from "./routes/characters.routes";
import creaturesRoutes from "./routes/creatures.routes";
import droidsRoutes from "./routes/droids.routes";
import factionsRoutes from "./routes/factions.routes";
import moviesRoutes from "./routes/movies.routes";
import seriesRoutes from "./routes/series.routes";
import speciesRoutes from "./routes/species.routes";
import technologiesRoutes from "./routes/technologies.routes";
import vehiclesRoutes from "./routes/vehicles.routes";
import weaponsRoutes from "./routes/weapons.routes";

// Association endpoint with route
app.use(`/${apiVersion}/characters`,charactersRoutes)
app.use(`/${apiVersion}/creatures`,creaturesRoutes)
app.use(`/${apiVersion}/droids`,droidsRoutes)
app.use(`/${apiVersion}/factions`,factionsRoutes)
app.use(`/${apiVersion}/movies`,moviesRoutes)
app.use(`/${apiVersion}/series`,seriesRoutes)
app.use(`/${apiVersion}/species`,speciesRoutes)
app.use(`/${apiVersion}/technologies`,technologiesRoutes)
app.use(`/${apiVersion}/vehicles`,vehiclesRoutes)
app.use(`/${apiVersion}/weapons`,weaponsRoutes)

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT} `);
  connectToMongoDB();
});


