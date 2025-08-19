import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerJsdoc = require("swagger-jsdoc");


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dexa API Documentation",
      version: "1.0.0",
      description: "API documentation with Swagger + Express + TypeScript",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/index.ts"], 
};


const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: number) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`📄 Swagger docs available at http://localhost:${port}/api-docs`);
}
