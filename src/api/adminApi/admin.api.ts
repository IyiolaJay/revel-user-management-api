import "dotenv/config";
import express, { Express } from 'express';
import AdminAuthRoutes from "./routes/auth.routes";
import AdminProfileRoutes from "./routes/profile.routes";
import OrderReceiptRoutes from "./routes/order.routes";
/**
 * 
 */
class App {
  private app: Express;
  private AdminAuthRoutes : AdminAuthRoutes = new AdminAuthRoutes();
  private AdminProfileRoutes : AdminProfileRoutes = new AdminProfileRoutes();
  private OrderReceiptRoutes : OrderReceiptRoutes = new OrderReceiptRoutes();

  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {

    this.app.use(this.AdminAuthRoutes.getRouter())
    this.app.use("/profile",this.AdminProfileRoutes.getRouter())
    this.app.use("/orders",this.OrderReceiptRoutes.getRouter())
    //other api routes


    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;