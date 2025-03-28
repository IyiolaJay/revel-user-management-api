// import { Express } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import { IOffering } from "../interfaces/offering.interface";
import CategoryRepository from "../repositories/category.repository";
import ApiError from "../utilities/error.base";
import httpStatus from "http-status";

class CsvUploadHelper {
  static async csvParserHelper<T>(csv: Express.Multer.File): Promise<T[]> {
    // Implement your CSV parsing logic here
    try {
      const items: T[] = [];
      const { path: filePath } = csv;
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (data: T) => {
            items.push(data);
          })
          .on("end", () => resolve())
          .on("error", (err: any) => reject(err));
      });
      fs.unlinkSync(filePath);
      return items;
    } catch (error) {
      console.error(error);
    }
    return []; // Return an empty array of type T[]
  }

  static async validateCsvHeader(
    csv: Express.Multer.File,
    expectedHeaders: string[]
  ): Promise<boolean> {
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
  }

  static async getItemCategoryIdFromName(data: IOffering[]) {
    const categoryRepository = new CategoryRepository();

    // Extract unique category names from the input data
    const _categoryNames = Array.from(
      new Set(data.map((item: any) => item.categoryName))
    );

    // Fetch matching categories using case-insensitive regex
    const _category = await categoryRepository.findAll(
      1,
      _categoryNames.length,
      {
        categoryName: {
          $in: _categoryNames.map((name) => new RegExp(`^${name}$`, "i")),
        },
      }
    );

    // Create a Map for fast lookups, with case-insensitive keys
    const categoryMap = new Map(
      _category.data.map((cat: any) => [
        cat.categoryName.toLowerCase(),
        cat._id.toString(),
      ])
    );

    // Check for invalid categories
    const invalidCategoryNames = data
      .map((item) => item.categoryName)
      .filter((name) => !categoryMap.has(name?.toLowerCase()));

    if (invalidCategoryNames.length > 0) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `The following categories do not exist: ${invalidCategoryNames.join(
          ", "
        )}`
      );
    }

    // Map the categoryId to the original data
    return data.map((item) => {
      const categoryId = categoryMap.get(item.categoryName?.toLowerCase());
      const result = {
        ...item,
        categoryId,
      };
      delete result.categoryName;
      return result;
    });
  }
}

export default CsvUploadHelper;
