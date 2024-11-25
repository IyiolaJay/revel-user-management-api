import "dotenv/config";
import express, { Express } from 'express';
import ClientManagementRoutes from "./routes/client.management.routes";
import OrderRoutes from "./routes/order.routes";
/**
 * 
 */
class App {
  private app: Express;
  private ClientManagementRoutes : ClientManagementRoutes = new ClientManagementRoutes()
  private OrderRoutes : OrderRoutes = new OrderRoutes()

  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {

    this.app.use("/management",this.ClientManagementRoutes.getRouter())
    this.app.use("/orders",this.OrderRoutes.getRouter())



    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;