import "dotenv/config";
import express, { Express } from 'express';
import AdminAuthRoutes from "./routes/auth.routes";
import AdminProfileRoutes from "./routes/profile.routes";
import OrderReceiptRoutes from "./routes/order.routes";
import ServiceRoutes from "./routes/services.routes";
import CategoryRoutes from "./routes/category.routes";
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
  
    //other api routes


    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;