import { AdminType } from "../utilities/enums/enum";

export function mapAdminTypeValueToKey(value: string): keyof typeof AdminType | undefined {
    return (Object.keys(AdminType) as (keyof typeof AdminType)[])
        .find(key => AdminType[key] === value);
}

export function mapAdminTypeKeyToValue(key: string): string | undefined {
    return (key in AdminType) ? AdminType[key as keyof typeof AdminType] : undefined;
}
