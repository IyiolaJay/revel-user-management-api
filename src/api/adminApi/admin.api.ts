import "dotenv/config";
import express, { Express } from 'express';
import AdminAuthRoutes from "./routes/auth.routes";

/**
 * 
 */
class App {
  private app: Express;
  private AdminAuthRoutes : AdminAuthRoutes = new AdminAuthRoutes();

  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {

    this.app.use(this.AdminAuthRoutes.getRouter())
    
    //other api routes


    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;