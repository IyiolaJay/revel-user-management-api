import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import httpStatus from "http-status";
import path from "path";
import ApiError from "../utilities/error.base";

class MulterMediaHandler {
  /**
   * File filter for accepting only CSV files.
   * @param _
   * @param file
   * @param cb
   */
  private fileFilter(
    _: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): void {
    const allowedMimeType = "text/csv";
    if (file.mimetype === allowedMimeType) {
      return cb(null, true);
    }
    cb(null, false);
  }

  //
  private diskStorage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (_, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

  /**
   * Upload handler for a single CSV file.
   * @returns
   */
  public UploadSingleCSVFile = () => {
    return multer({
      storage: this.diskStorage,
      fileFilter: this.fileFilter.bind(this),
      limits: { fileSize: 5 * 1024 * 1024 }, // Limit size to 5MB
    }).single("csv");
  };

  public static obtainMediaFileFromReq = (req: any) => {
    if (req.file) {
      return {
        path: req.file.path,
        mimetype: req.file.mimetype,
        originalname: req.file.originalname,
      };
    }
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please select and upload a valid CSV file 🥺"
    );
  };
}

export default MulterMediaHandler;
