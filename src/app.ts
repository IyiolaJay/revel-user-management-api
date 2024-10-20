import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import AdminRoutes from "./api/adminApi/admin.api"
import { ErrorMiddleware } from "./middlewares/error.middleware";

class App {
  private app: Express;
  private apiPrefix : string = '/api/v1'; 
  private adminRoutes : AdminRoutes = new AdminRoutes();



  constructor() {
    this.app = express();
    this.SetUpOtherMiddlewares();
    this.SetUpAppRoutes()
    this.SetupErrorRoutes();
  }

  private SetUpOtherMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan("combined"));
  }

  //
  private SetUpAppRoutes(): void {
    
    this.app.get("/", async (_: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: "api is running",
        data: null,
      });
    });


    //
    this.app.use(`${this.apiPrefix}/admin`, this.adminRoutes.getApp())
  }


  //
  private SetupErrorRoutes(){
    this.app.use(ErrorMiddleware.handleNotFound);
    this.app.use(ErrorMiddleware.errorHandler);
  }

  //
  public async start(port: number) {
    return this.app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
}


export default App;