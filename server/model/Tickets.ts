import { prisma } from '~/server/config/db';
import { TicketRequest } from '~/types/AuthType';
import {sortByKey} from "@vue/devtools-shared";

export class Ticket {
    // Fungsi untuk membuat tiket baru
    static createTicket = (data: TicketRequest) => {
        return prisma.ticket.create({
            data: {
                slug: data.slug,
                title: data.title,
                description: data.description,
                location: data.location,
                dateTime: data.dateTime,
                stock: data.stock,
                price: data.price,
                categoryId: data.categories_id,
                imageUrl: data.url_ticket,
                secureUrl: data.secure_url_ticket,
                publicId: data.public_id_ticket,
            },
        });
    };

    // Fungsi untuk memperbarui tiket
    static updateTicket = (id: number, data: TicketRequest) => {
        return prisma.ticket.update({
            where: {
                id: id
            },
            data: {
                slug: data.slug,
                title: data.title,
                description: data.description,
                location: data.location,
                dateTime: data.dateTime,
                stock: data.stock,
                price: data.price,
                categoryId: data.categories_id
            }
        });
    };

    // Fungsi untuk mengambil tiket berdasarkan ID
    static getTicketById = (id: number) => {
        return prisma.ticket.findUnique({
            where: { id: id },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                location: true,
                dateTime: true,
                stock: true,
                price: true,
                categoryId: true,
                imageUrl: true,
                secureUrl: true,
                publicId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    };

    static getTicketBySlug = (slug: string) => {
        return prisma.ticket.findUnique({
            where: { slug: slug },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                location: true,
                dateTime: true,
                stock: true,
                price: true,
                categoryId: true,
                imageUrl: true,
                secureUrl: true,
                publicId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    };

    // Fungsi untuk mengambil semua tiket
    static getAllTickets = async (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize; // Hitung data yang dilewatkan
        const take = pagesize; // Jumlah data per halaman

        return prisma.ticket.findMany({
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                location: true,
                dateTime: true,
                stock: true,
                price: true,
                categoryId: false,
                imageUrl: true,
                secureUrl: true,
                publicId: true,
                createdAt: true,
                updatedAt: true,
                Category: true
            },
            skip: skip,
            take: take,
        });
    };

    // Fungsi untuk menghitung semua tiket
    static countAllTickets = () => {
        return prisma.ticket.count();
    };

    // Fungsi untuk menghapus tiket
    static deleteTicket = (id: number) => {
        return prisma.ticket.delete({
            where: { id },
        });
    };

    // Fungsi untuk mencari tiket berdasarkan judul atau deskripsi
    static searchTicket = (search: string) => {
        return prisma.ticket.findMany({
            where: {
                OR: [
                    {
                        title: {
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

    static async getUpcomingTickets(page: number, pagesize: number, now: string) {
        const skip = (page - 1) * pagesize;
        const take = pagesize;
        const sevenDaysLater = new Date(new Date(now).getTime() + 30 * 24 * 60 * 60 * 1000); // Sekarang + 30 hari

        return prisma.ticket.findMany({
            where: {
                dateTime: {
                    gt: new Date(now),
                    lt: sevenDaysLater,
                },
            },
            orderBy: {
                dateTime: 'asc',
            },
            skip,
            take,
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                location: true,
                dateTime: true,
                stock: true,
                price: true,
                categoryId: true,
                imageUrl: true,
                secureUrl: true,
                publicId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    static async countUpcomingTickets(now: string) {
        const sevenDaysLater = new Date(new Date(now).getTime() + 7 * 24 * 60 * 60 * 1000); // Sekarang + 7 hari

        const count = await prisma.ticket.count({
            where: {
                dateTime: {
                    gt: new Date(now),
                    lt: sevenDaysLater,
                },
            },
        });
        return count;
    }
}
