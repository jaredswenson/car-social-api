import dotenv from "dotenv";

dotenv.config();

export const hostname: string = process.env.HOSTNAME!;
export const port: string = process.env.PORT!;
export const dbPort: string = process.env.DB_PORT!;
export const dbHost: string = process.env.DB_HOST!;
export const dbName: string = process.env.DB_NAME!;
export const dbUser: string = process.env.DB_USER!;
export const dbPassword: string = process.env.DB_PASSWORD!;
export const deploymentMode: string = process.env.DeploymentMode!;
