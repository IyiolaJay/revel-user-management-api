import "dotenv/config";
import express, { Express } from 'express';

/**
 * 
 */
class App {
  private app: Express;


  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {

    //other api routes


    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;