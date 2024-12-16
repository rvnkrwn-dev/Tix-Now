import { prisma } from '~/server/config/db';
import { CategoryRequest } from '~/types/AuthType';

export class Category {
    // Fungsi untuk membuat kategori baru
    static createCategory = (data: CategoryRequest) => {
        return prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
    };

    // Fungsi untuk memperbarui kategori
    static updateCategory = (id: number, data: CategoryRequest) => {
        return prisma.category.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                description: data.description,
            }
        });
    };

    // Fungsi untuk mengambil kategori berdasarkan ID
    static getCategoryById = (id: number) => {
        return prisma.category.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                Tickets: true,
            },
        });
    };

    // Fungsi untuk mengambil semua kategori
    static getAllCategories = async (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize; // Hitung data yang dilewatkan
        const take = pagesize; // Jumlah data per halaman

        return prisma.category.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
            },
            skip: skip, // Mulai dari data keberapa
            take: take, // Ambil berapa data
        });
    };

    // Fungsi untuk menghitung semua kategori
    static countAllCategories = () => {
        return prisma.category.count();
    };

    // Fungsi untuk menghapus kategori
    static deleteCategory = (id: number) => {
        return prisma.category.delete({
            where: { id },
        });
    };

    // Fungsi untuk mencari kategori berdasarkan nama atau deskripsi
    static searchCategory = (search: string) => {
        return prisma.category.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                        }
                    },
                    {
                        description: {
                            contains: search,
                        }
                    }
                ]
            }
        });
    };
}
