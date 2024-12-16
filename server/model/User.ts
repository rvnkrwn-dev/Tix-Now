import {prisma} from "~/server/config/db";
import {RegisterRequest, UpdateUserRequest} from "~/types/AuthType";

export class User {
    static createUser = (data: RegisterRequest ) => {
        return prisma.user.create({
            data: {
                full_name: data.full_name,
                username: data.username,
                email: data.email,
                password: data.password,
            },
        });
    };

    static registerUser = (data: RegisterRequest) => {
        return prisma.user.create({
            data: {
                full_name: data.full_name,
                username: data.username,
                email: data.email,
                password: data.password
            },
        });
    };

    static updateUser = (id: number, data: UpdateUserRequest) => {
        return prisma.user.update({
            where: {
                id: id
            },data:
                {
                    full_name: data.full_name,
                    username: data.username,
                    email: data.email,
                    password: data.password,
                },
            select: {
                id: true,
                full_name: true,
                email: true,
                password: false,
                role: true,
            }
        });
    };


    static getUserByEmail = (email: string) => {
        if (!email) {
            throw new Error("Email must be provided");
        }

        return prisma.user.findUnique({
            where: {
                email: email, // Ensure email is properly passed here
            },
            select: {
                id: true,
                full_name: true,
                username: true,
                email: true,
                password: true,
                role: true,
            },
        });
    };


    static getUserById = (id: number) => {
        return prisma.user.findUnique({
            where: {id: id},
            select: {
                id: true,
                full_name: true,
                username: true,
                email: true,
                password: false,
                role: true,
            },
        });
    };

    static getAllUsers = async (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize; // Hitung data yang dilewatkan
        const take = pagesize; // Jumlah data per halaman

        return prisma.user.findMany({
            select: {
                id: true,
                full_name: true,
                email: true,
                password: false,
                role: true,
            },
            skip: skip, // Mulai dari data keberapa
            take: take, // Ambil berapa data
        });
    };


    static countAllUsers = () => {
        return prisma.user.count();
    };


    static deleteUser = (id: number) => {
        return prisma.user.delete({
            where: {id},
        });
    };

    static countUsers = () => {
        return prisma.user.count();
    };

    static searchUser = (search: string) => {
        return prisma.user.findMany({
            where: {
                OR: [
                    {
                        full_name: {
                            contains: search
                        }
                    },
                    {
                        email: {
                            contains: search
                        }
                    }
                ]
            }
        })
    }
}