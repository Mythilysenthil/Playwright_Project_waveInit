import * as XLSX from "xlsx";
import * as path from "path";

export class ExcelReader {


    public static read<T>(fileName: string,sheetName: string): T[] {

        const filePath = path.resolve(
            process.cwd(),"src","test","test-data",fileName);

        const workbook = XLSX.readFile(filePath);

        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
            throw new Error(
                `Sheet "${sheetName}" not found in ${fileName}`
            );
        }

        return XLSX.utils.sheet_to_json<T>(worksheet, {
            defval: ""
        });
    }
}