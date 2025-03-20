import "dotenv/config";
import express, { Express } from 'express';
import ClientManagementRoutes from "./routes/client.management.routes";
import OrderRoutes from "./routes/order.routes";
import BusinessManagementRoutes from "./routes/business.management.routes";
/**
 * 
 */
class App {
  private app: Express;
  private ClientManagementRoutes : ClientManagementRoutes = new ClientManagementRoutes()
  private OrderRoutes : OrderRoutes = new OrderRoutes()
  private BusinessManagementRoutes: BusinessManagementRoutes = new BusinessManagementRoutes();

  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {

    this.app.use(this.ClientManagementRoutes.getRouter())
    this.app.use("/orders",this.OrderRoutes.getRouter())
    this.app.use("/business", this.BusinessManagementRoutes.getRouter());



    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;