import crypto from "crypto";
import config from "config";
import { ITapCredentials } from "../interfaces/business.interface";

export default class Encryptor {
  private algorithm: string;
  private key: Buffer;

  constructor() {
    this.algorithm = config.get("ALGORITHM");
    this.key = Buffer.from(config.get<string>("ENCRYPTION_KEY"), "hex");
  }

  encrypt(data: string): ITapCredentials {
    const iv = crypto.randomBytes(16); // Generate a new IV for each encryption
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return {
      key: encrypted,
      iv: iv.toString("hex"),
    };
  }

  decrypt(encryptedData: string, iv: string): string {
    const ivBuffer = Buffer.from(iv, "hex"); // Convert iv from hex string to Buffer
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      ivBuffer
    );
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
