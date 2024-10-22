import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import config from "@src/config";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Coupon Code API",
    version: "1.0.0",
    description: "API documentation for the coupon code service",
  },
  servers: [
    {
      url: config.BACKEND_URL,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/modules/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwaggerDocs;