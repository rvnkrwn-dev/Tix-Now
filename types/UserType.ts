import type {Role} from "~/types/TypesModel";

export type getUserByEmailType = {
    id: number;
    full_name: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    role: Role;
};

export type UpdateUserType = {
    full_name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: Role;
};