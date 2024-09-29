import compression from "compression";
import cors from "cors";
import express, { Application, Response, Request, NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "@src/modules/router";
import config from "@src/config";
import Logging from "@src/library/logging";
import connectMongoDB from "@src/database/mongo";
import connectRedis from "@src/database/redis";

const app: Application = express();
const port = config.PORT;

// Environment Configuration
const isDevelopment = config.NODE_ENV === "development";
const isTest = config.NODE_ENV === "test";
const prodCorsOrigin = config.PROD_CORS_ORIGIN;

// Middleware Setup
if (!isTest) {
  app.use(morgan("dev"));
}

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

// CORS Configuration
if (!isTest) {
  if (isDevelopment) {
    Logging.warn("Running in development mode - allowing CORS for all origins");
    app.use(
      cors({
        origin: "http://localhost:3000",
        allowedHeaders: ["content-type"],
        methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
        credentials: true,
      })
    );
  } else if (prodCorsOrigin) {
    Logging.info(
      `Running in production mode - allowing CORS for domain: ${prodCorsOrigin}`
    );
    app.use(
      cors({
        origin: prodCorsOrigin,
        allowedHeaders: ["content-type"],
        methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
        credentials: true,
      })
    );
  } else {
    Logging.warn("Production CORS origin not set, defaulting to no CORS.");
  }
}

// Routes
app.get("/", (res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1", router);

// Error Handling Middleware
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    data: null,
    error: {
      code: "NOT_FOUND",
      message: "The requested resource does not exist",
    },
  });
});

const startServer = async () => {
  try {
    await connectMongoDB();
    await connectRedis();

    if (process.env.NODE_ENV !== "test") {
      app.listen(port, () => {
        Logging.info(`Server is running at http://localhost:${port}`);
      });
    }
  } catch (error) {
    Logging.error(`Failed to connect to databases: ${error}`);
    process.exit(1);
  }
};

startServer();

export default app;
