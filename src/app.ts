import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import AdminApi from "./api/adminApi/admin.api"
import { ErrorMiddleware } from "./middlewares/error.middleware";
import ClientApi from "./api/clientAPi/client.api"
class App {
  private app: Express;
  private apiPrefix : string = '/api/v1'; 
  private adminApi : AdminApi = new AdminApi();
  private clientApi : ClientApi = new ClientApi();


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
    this.app.use(`${this.apiPrefix}/admin`, this.adminApi.getApp())
    this.app.use(`${this.apiPrefix}/client`, this.clientApi.getApp())
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