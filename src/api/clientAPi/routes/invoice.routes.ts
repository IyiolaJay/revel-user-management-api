import express, { Router } from "express";


class AuthRoutes {
  private router: Router;


  constructor() {
    this.router = express.Router();

    this.setupRoutes();
  }

  private setupRoutes(): void {
   

    // Add other routes here...
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default AuthRoutes;
