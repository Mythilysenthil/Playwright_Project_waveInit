import * as dotenv from "dotenv";
import * as path from "path";

export const getEnv = (): string => {
    const envName = process.env.ENV || "qa";
    const envPath = path.resolve("Env", `.env.${envName}`);

    console.log(`Loading environment variables from: ${envPath}`);

    const result = dotenv.config({
        path: envPath,
        override: true
    });

    if (result.error) {
        throw new Error(
            `Unable to load environment file: ${envPath}\n${result.error.message}`
        );
    }

    const baseUrl = process.env.BASE_URL?.trim();

    console.log(`BASE_URL: ${baseUrl}`);

    if (!baseUrl) {
        throw new Error(`BASE_URL is not defined. Checked: ${envPath}`);
    }

    return baseUrl;
};