import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Use require for swagger-jsdoc (no official types available)
const swaggerJsdoc = require("swagger-jsdoc");

// Define the options type manually
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express + TypeScript API",
      version: "1.0.0",
      description: "API documentation with Swagger + Express + TypeScript",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/index.ts"], // files for Swagger docs
};

// Generate swagger specification
const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: number) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`📄 Swagger docs available at http://localhost:${port}/api-docs`);
}
