// import { Express } from "express";
import csvParser from "csv-parser";
import fs from "fs";


export const csvParserHelper =async <T>(csv: Express.Multer.File):Promise<T[]>  => {
	// Implement your CSV parsing logic here
    try{
        const items: T[] = [];
        const { path: filePath } = csv;
        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (data: T) => {
                items.push(data);
            })
            .on("end", () => resolve())
            .on("error", (err : any) => reject(err));
        }
        );
        fs.unlinkSync(filePath);
        return items;
    }catch(error){
        console.error(error);
    }
	return []; // Return an empty array of type T[]
}

export const validateCsvHeader = async (csv: Express.Multer.File, expectedHeaders: string[]): Promise<boolean> => {
    try {
        const { path: filePath } = csv;
        const headers: string[] = await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on("headers", (headers: string[]) => {
                    resolve(headers);
                })
                .on("error", (err: any) => reject(err));
        });

        fs.unlinkSync(filePath);
        return JSON.stringify(headers) === JSON.stringify(expectedHeaders);
    } catch (error) {
        console.error(error);
        return false;
    }
};