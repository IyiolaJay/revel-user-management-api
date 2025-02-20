
export enum AdminType{
    SUPER_ADMIN = "SUPER ADMIN",
    REGULAR_ADMIN = "REGULAR ADMIN",
    BUSINESS_SUPER_ADMIN = "BUSINESS SUPER ADMIN",
    BUSINESS_REGULAR_ADMIN = "BUSINESS REGULAR ADMIN"
}

// export enum ClientType{
//     CLIENT_ADMIN = "CLIENT ADMIN",
//     CLIENT_USER = "CLIENT USER"
// }

export enum Currency{
    GHS = "GHANA CEDIS",
    USD = "US DOLLARS",
    EUR = "EURO",
    GBP =  "GREAT BRITAIN POUNDS",
    KWD = "KUWAIT DOLLARS"
}


export enum EmailType{
    VerifyEmail = "verify",
    CredentialsEmail = "credentials",
    ResetEmail = "reset",
    InvoiceEmail = "invoice"
}