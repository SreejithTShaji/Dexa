declare module "swagger-jsdoc" {
  import { OAS3Definition } from "swagger-jsdoc";
  export interface Options {
    definition: OAS3Definition;
    apis: string[];
  }
  export default function swaggerJsdoc(options: Options): object;
}
