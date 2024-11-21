import "dotenv/config";
import express, { Express } from 'express';
import ClientManagementRoutes from "./routes/client.management.routes";
// import ClientProfileRoutes from "./routes/profile.routes";
/**
 * 
 */
class App {
  private app: Express;
  private ClientManagementRoutes : ClientManagementRoutes = new ClientManagementRoutes()
  // private ClientProfileRoutes : ClientProfileRoutes = new ClientProfileRoutes()

  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {

    this.app.use("/management",this.ClientManagementRoutes.getRouter())
    // this.app.use("/profile",this.ClientProfileRoutes.getRouter())



    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;