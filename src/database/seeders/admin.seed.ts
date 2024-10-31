import SecurityHelperService from "../../helpers/security";
import Admin from "../models/admin.model";
import config from "config";

export const createSuperAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      email: "superadmin@yopmail.com",
    });

    if (!existingAdmin) {
      const adminPassword = config.get("SUPER_ADMIN_PASSWORD");
      const superAdmin = new Admin({
        email: "superadmin@yopmail.com",
        name: "Super Admin",
        isGeneratedPassword : false,
        password: await new SecurityHelperService().HashPassword(
          adminPassword as string
        ),
        adminType: "SUPER_ADMIN",
        permissionSet: ["ALL"],
      });

      await superAdmin.save();
      console.log("Super Admin created successfully.");
    } else {
      console.log("Super Admin already exists.");
    }
  } catch (error) {
    console.log("Error creating Super Admin:", error);
    process.exit();
  }
};
