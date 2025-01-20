import httpStatus from "http-status";
import ApiError from "../../../utilities/error.base";
import ItemRepository from "../../../repositories/item.repository";
import { IClientRepository } from "../../../interfaces/client.interface";
import ClientRepository from "../../../repositories/client.repository";
import CsvUploadHelper from "../../../helpers/csv.parser";

export default class BulkUploadService{
    private itemRepository: ItemRepository;
    private clientRepository : IClientRepository;

    constructor(itemRepository : ItemRepository, clientRepository : ClientRepository) {
        this.itemRepository = itemRepository;
        this.clientRepository = clientRepository
    }


    /**
     * Upload CSV file to the database.
     * @param file
     */
    async UploadItemCSVFile( entity : string, csvFile?: Express.Multer.File): Promise<{unsuccessfulUploads : object[]}> {
        if(!csvFile){
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Please select and upload a valid CSV file 🥺"
            );
        }

        let repository;

        const records : any = await CsvUploadHelper.csvParserHelper(csvFile);
        
        let uploads : any;
        if(entity === "items") {
            repository = this.itemRepository
            uploads = await CsvUploadHelper.getItemCategoryIdFromName(records)
        
        }else {
            repository = this.clientRepository
        };

    
      
          const bulkOperationresults = await repository.bulkCreate(uploads)
       
        return {
            unsuccessfulUploads : bulkOperationresults ?? []
        };
    }
    async ValidateUploadCsvFields(entity : string, csvFile? : Express.Multer.File) : Promise<any> {
        if(!csvFile){
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Please select and upload a valid CSV file 🥺"
            );
        }
        let repository;

        if(entity === "items") repository = this.itemRepository;
        else repository = this.clientRepository;

        const record :any = await CsvUploadHelper.csvParserHelper(csvFile);
        
        let upload;
        if (entity === "items") {
            upload = await CsvUploadHelper.getItemCategoryIdFromName(record);
        } else {
            upload = record; //@TODO Assuming record is already in the correct format for clients
        }
        
        const result = await repository.validateEntityData(upload);
        
        return result.invalidRecords.map(({ record, validationError }) => ({
            record,
            errors: Object.keys(validationError).map((field) => ({
              field,
              message: validationError[field].message,
            })),
          }));
            
        
    }
    
}