import "dotenv/config";
import express, { Express } from 'express';
import AdminAuthRoutes from "./routes/admin.routes";
import AdminProfileRoutes from "./routes/profile.routes";
import OrderReceiptRoutes from "./routes/order.routes";
import ServiceRoutes from "./routes/services.routes";
import CategoryRoutes from "./routes/category.routes";
import OfferingRoutes from "./routes/offering.routes";
import InvoiceRoutes from "./routes/invoice.routes";
import BulkUploadRoutes from "./routes/bulkUpload.routes";
import BusinessRoutes from "./routes/business.routes";
/**
 * 
 */
class App {
  private app: Express;
  private AdminAuthRoutes : AdminAuthRoutes = new AdminAuthRoutes();
  private AdminProfileRoutes : AdminProfileRoutes = new AdminProfileRoutes();
  private OrderReceiptRoutes : OrderReceiptRoutes = new OrderReceiptRoutes();
  private ServiceRoutes : ServiceRoutes = new ServiceRoutes();
  private CategoryRoutes : CategoryRoutes = new CategoryRoutes();
  private OfferingRoutes : OfferingRoutes = new OfferingRoutes();
  private InvoiceRoutes : InvoiceRoutes = new InvoiceRoutes();
  private BulkUploadRoutes : BulkUploadRoutes = new BulkUploadRoutes();
  private BusinessRoutes : BusinessRoutes = new BusinessRoutes()

  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {
    const resource = "/admin";
    this.app.use(`${resource}`,this.AdminAuthRoutes.getRouter())
    this.app.use(`${resource}/profile`,this.AdminProfileRoutes.getRouter())
    this.app.use(`${resource}/orders`,this.OrderReceiptRoutes.getRouter())
    this.app.use("/services",this.ServiceRoutes.getRouter())
    this.app.use("/categories", this.CategoryRoutes.getRouter());
    this.app.use("/invoices", this.InvoiceRoutes.getRouter());
    this.app.use("/bulkUpload", this.BulkUploadRoutes.getRouter());
    this.app.use("/business", this.BusinessRoutes.getRouter())
    this.app.use(this.OfferingRoutes.getRouter());
    //other api routes


    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;