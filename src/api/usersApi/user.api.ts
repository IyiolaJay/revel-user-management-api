import "dotenv/config";
import express, { Express } from 'express';
import UserAuthRoutes from "./routes/auth.routes";
import UserProfileRoutes from "./routes/profile.routes";
/**
 * 
 */
class App {
  private app: Express;
  private UserAuthRoutes : UserAuthRoutes = new UserAuthRoutes();
  private UserProfileRoutes : UserProfileRoutes = new UserProfileRoutes();

  constructor() {
    this.app = express();

    this.setupAppRoutes();
  }

  private setupAppRoutes(): void {

    this.app.use("/user",this.UserAuthRoutes.getRouter())
    this.app.use("/profile",this.UserProfileRoutes.getRouter())
    //other api routes


    // Add other routes here...
  }

  public getApp(){
    return this.app;
  }
  
}

export default App;