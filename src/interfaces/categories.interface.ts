import IGenericRepository from "./generic.repository.interface";

export interface ICategory{
    _id? : string,
    categoryName : string,
}



export interface ICategoryRepository extends IGenericRepository<ICategory>{
}

