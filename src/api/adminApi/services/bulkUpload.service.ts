import httpStatus from "http-status";
import { csvParserHelper } from "../../../helpers/csv.parser";
import ApiError from "../../../utilities/error.base";
import { IItem } from "../../../interfaces/item.interface";

export default class BulkUploadService{
    // private itemRepository: ItemRepository;

    constructor() {
        // this.itemRepository = itemRepository;
    }


    /**
     * Upload CSV file to the database.
     * @param file
     */
    async UploadItemCSVFile(csvFile?: Express.Multer.File): Promise<void> {
        if(!csvFile){
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Please select and upload a valid CSV file 🥺"
            );
        }
        const items = await csvParserHelper<IItem>(csvFile);


      console.log(items);
      return 
    }
    async ValidateUploadCsvFields(_ : string, csvFile? : Express.Multer.File) : Promise<{isValid: boolean, message: string}> {
        if(!csvFile){
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Please select and upload a valid CSV file 🥺"
            );
        }


        
        const items = await csvParserHelper(csvFile);
        console.log(items);

        return {isValid: true, message: "CSV fields are valid"};
    }
    
}