import { Permissions } from "../utilities/enums/permissions.enum";

export function mapPermisionValuesToKeys(values: string[]): (keyof typeof Permissions)[] {
    return values
      .map(value => 
        (Object.keys(Permissions) as (keyof typeof Permissions)[])
        .find(key => Permissions[key] === value)
      )
      .filter((key): key is keyof typeof Permissions => key !== undefined); // Filter out any undefined values
  }