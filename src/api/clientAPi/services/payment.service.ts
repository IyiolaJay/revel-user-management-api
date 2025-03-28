import { IPaymentRepository } from "../../../interfaces/payment.interface";

export default class PaymentService {
    
    constructor(
        private paymentRepository: IPaymentRepository,
    )
    {
        this.paymentRepository = paymentRepository;
    }
    
    /**
     * 
     * @returns 
     */
    async UploadPaymentProof(file : any){
        console.log(file);
        await this.paymentRepository.create(
            {
                userId: "userId",
                paymentProofUrl: "paymentProofUrl",
                businessId: "businessId",
            }
        )
        return;
    }
}