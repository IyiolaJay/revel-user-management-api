import SecurityHelperService from "../../helpers/security";
import { AdminType } from "../../utilities/enums/enum";
import Admin from "../models/admin.model";
import config from "config";

export const createSuperAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      email: "superadmin@admin.com",
    });

    if (!existingAdmin) {
      const adminPassword = config.get("SUPER_ADMIN_PASSWORD");
      const superAdmin = new Admin({
        email: "superadmin@admin.com",
        name: "Super Admin",
        password: await new SecurityHelperService().HashPassword(
          adminPassword as string
        ), // Replace with a hashed password if necessary
        adminType: AdminType.SUPER_ADMIN,
        permissionSet: ["ALL"],
      });

      await superAdmin.save();
      console.log("Super Admin created successfully.");
    } else {
      console.log("Super Admin already exists.");
    }
  } catch (error) {
    console.log("Error creating Super Admin:", error);
  }
};
