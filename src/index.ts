import "reflect-metadata"; 
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import userRoutes from "./routes/users";
import { swaggerDocs } from "./swagger";

const app: Express = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
swaggerDocs(app,PORT)

app.use("/users", userRoutes); 
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
