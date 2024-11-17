import "dotenv/config";
import express, { Express } from 'express';
import ClientAuthRoutes from "./routes/clientAuth.routes";
import ClientProfileRoutes from "./routes/profile.routes";
/**
 * 
 */
class App {
  private app: Express;
  private ClientAuthRoutes : ClientAuthRoutes = new ClientAuthRoutes()
  private ClientProfileRoutes : ClientProfileRoutes = new ClientProfileRoutes()

  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {

    this.app.use(this.ClientAuthRoutes.getRouter())
    this.app.use("/profile",this.ClientProfileRoutes.getRouter())



    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;