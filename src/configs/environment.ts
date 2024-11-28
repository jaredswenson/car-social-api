import dotenv from "dotenv";

dotenv.config();

<<<<<<< Updated upstream
interface PapertrailOptions {
  host: string;
  port: number;
}

=======
>>>>>>> Stashed changes
export const hostname: string = process.env.HOSTNAME!;
export const port: string = process.env.PORT!;
export const dbPort: string = process.env.DB_PORT!;
export const dbHost: string = process.env.DB_HOST!;
export const dbName: string = process.env.DB_NAME!;
export const dbUser: string = process.env.DB_USER!;
export const dbPassword: string = process.env.DB_PASSWORD!;
export const deploymentMode: string = process.env.DeploymentMode!;
<<<<<<< Updated upstream
export const applicationName: string = process.env.ApplicationName!;
export const crmJwtSecretKey: string = process.env.CrmJwtSecretKey!;

export const papertrailOptions: PapertrailOptions = {
  host: process.env.Papertrail__Host!,
  port: parseInt(process.env.Papertrail__Port!),
};
=======
>>>>>>> Stashed changes
