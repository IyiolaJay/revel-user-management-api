import "dotenv/config";
import express, { Express } from 'express';
import ClientAuthRoutes from "./routes/clientAuth.routes";
/**
 * 
 */
class App {
  private app: Express;
  private ClientAuthRoutes : ClientAuthRoutes = new ClientAuthRoutes()

  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {

    this.app.use(this.ClientAuthRoutes.getRouter())



    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;