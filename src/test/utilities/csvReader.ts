import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export class CsvReader {
    static read<T>(fileName: string): T[] {const filePath = path.resolve( __dirname,"../test-data",fileName
        );

        const fileContent = fs.readFileSync(filePath, "utf-8");

        return parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        }) as T[];
    }
}
