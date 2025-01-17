import httpStatus from "http-status";
import { csvParserHelper } from "../../../helpers/csv.parser";
import ApiError from "../../../utilities/error.base";
import { IItem } from "../../../interfaces/item.interface";
import ItemRepository from "../../../repositories/item.repository";
import { IClientRepository } from "../../../interfaces/client.interface";
import ClientRepository from "../../../repositories/client.repository";

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
    async UploadItemCSVFile( entity : string, csvFile?: Express.Multer.File): Promise<void> {
        if(!csvFile){
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                "Please select and upload a valid CSV file 🥺"
            );
        }

        let repository;

        if(entity === "items") repository = this.itemRepository;
        else repository = this.clientRepository;

        const items : any = await csvParserHelper<IItem>(csvFile);
        try{
            await repository.bulkCreate(items)
        }catch(error : any ){
            console.log(error);
            throw new ApiError(
                httpStatus.UNPROCESSABLE_ENTITY,
                "Unable to do bulk upload"
            )
        }
        return 
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

        const record :any = await csvParserHelper<IItem>(csvFile);
        const result = await repository.validateEntityData(record);
        
        return result.invalidRecords.map(({ record, validationError }) => ({
            record,
            errors: Object.keys(validationError).map((field) => ({
              field,
              message: validationError[field].message,
            })),
          }));
            
        
    }
    
}