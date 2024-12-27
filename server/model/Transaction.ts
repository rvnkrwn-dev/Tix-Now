// Transactions.ts

import {prisma} from '~/server/config/db';
import {TransactionRequest, DetailTransactionRequest, TransactionUpdateStatus} from '~/types/AuthType';
import {TransactionStatus} from "@prisma/client";
import {SendEmailTransaction} from "~/server/utils/SendEmailTransaction";

export class Transaction {
// Fungsi untuk membuat transaksi baru beserta detail transaksi
    static createTransactionWithDetails = async (transactionData: TransactionRequest, detailRequests: DetailTransactionRequest[]) => {
        return prisma.$transaction(async (prisma) => {
            // Memulai transaksi
            const transaction = await prisma.transaction.create({
                data: {
                    userId: transactionData.user_id,
                    totalTicket: transactionData.total_ticket,
                    total: 0,
                },
            });

            // Mengumpulkan detail transaksi dan operasi update stok dalam satu batch
            const detailData: any = [];
            const updateStockPromises = detailRequests.map(async (detailRequest) => {
                const ticket = await prisma.ticket.findUnique({where: {id: detailRequest.ticket_id}});

                if (!ticket || ticket.stock < detailRequest.quantity) {
                    throw new Error(`Stok tidak cukup untuk tiket dengan ID: ${detailRequest.ticket_id}`);
                }

                detailData.push({
                    transactionId: transaction.id,
                    ticketId: detailRequest.ticket_id,
                    quantity: detailRequest.quantity,
                });

                return prisma.ticket.update({
                    where: {id: detailRequest.ticket_id},
                    data: {stock: ticket.stock - detailRequest.quantity},
                });
            });

            // Menjalankan update stok secara paralel
            await Promise.all(updateStockPromises);

            // Menambahkan detail transaksi dalam satu batch
            await prisma.detailTransaction.createMany({data: detailData});

            // Menghitung total harga transaksi berdasarkan detail transaksi yang dibuat
            const details = await prisma.detailTransaction.findMany({
                where: {transactionId: transaction.id},
                include: {ticket: true},
            });

            const total = details.reduce((sum, detail) => {
                return sum + (detail.ticket.price * detail.quantity);
            }, 0);

            // Update total transaksi
            const updatedTransaction = await prisma.transaction.update({
                where: {id: transaction.id},
                data: {total},
            });

            return updatedTransaction;
        }, {
            maxWait: 20000,  // Meningkatkan timeout menjadi 20 detik
            timeout: 20000 // Menambah timeout secara eksplisit
        });
    };


// Fungsi untuk memperbarui transaksi
    static updateTransaction = (id: number, data: TransactionRequest) => {
        return prisma.transaction.update({
            where: {
                id: id
            },
            data: {
                userId: data.user_id,
                totalTicket: data.total_ticket,
                total: data.total,
            },
        });
    };

    // Fungsi untuk memperbarui status transaksi
    static updateTransactionStatus = (id: number, data: {
        secureUrl: any;
        imageUrl: any;
        publicId: any;
        status: any
    }) => {
        return prisma.transaction.update({
            where: {
                id: id
            },
            data: {
                status: data.status,
                imageUrl: data.imageUrl,
                secureUrl: data.secureUrl,
                publicId: data.publicId
            },
        });
    };


    // Fungsi untuk mengambil transaksi berdasarkan ID
    static getTransactionById = (id: number) => {
        return prisma.transaction.findUnique({
            where: {id: id},
            select: {
                id: true,
                userId: true,
                totalTicket: true,
                total: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    };

    // Fungsi untuk mengambil semua transaksi
    static getAllTransactions = async (page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize; // Hitung data yang dilewatkan
        const take = pagesize; // Jumlah data per halaman

        return prisma.transaction.findMany({
            select: {
                id: true,
                userId: true,
                totalTicket: true,
                total: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                imageUrl: true,
                secureUrl: true,
                publicId: true,
                user: {
                    select: {
                        full_name: true,
                    },
                },
                details: {
                    select: {
                        ticketId: true,
                        quantity: true,
                    },
                },
            },
            skip: skip,
            take: take,
        });
    };

    // Fungsi untuk menghitung semua transaksi
    static countAllTransactions = () => {
        return prisma.transaction.count();
    };

    // Fungsi untuk mengambil semua transaksi berdasarkan userId
    static getAllTransactionsByUserId = async (userId: number, page: number, pagesize: number) => {
        const skip = (page - 1) * pagesize; // Hitung data yang dilewatkan
        const take = pagesize; // Jumlah data per halaman

        return prisma.transaction.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                userId: true,
                totalTicket: true,
                total: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                imageUrl: true,
                secureUrl: true,
                publicId: true,
            },
            skip: skip,
            take: take,
        });
    };

    static countAllTransactionsByUserId = async (userId: number) => {
        return prisma.transaction.count({
            where: {userId: userId},
        })
    }

    // Fungsi untuk mencari transaksi berdasarkan beberapa kriteria
    static searchTransactions = async (search: string) => {
        const searchInt = parseInt(search);
        const searchFloat = parseFloat(search);
        const validStatuses = ['PENDING', 'COMPLETED', 'CANCELED'];

        const transactions = await prisma.transaction.findMany({
            where: {
                OR: [
                    {
                        id: !isNaN(searchInt) ? searchInt : undefined,
                    },
                    {
                        userId: !isNaN(searchInt) ? searchInt : undefined,
                    },
                    {
                        status: validStatuses.includes(search.toUpperCase()) ? search.toUpperCase() as TransactionStatus : undefined,
                    },
                    {
                        total: !isNaN(searchFloat) ? searchFloat : undefined,
                    },
                    {
                        user: {
                            full_name: {
                                contains: search,
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                userId: true,
                totalTicket: true,
                total: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                imageUrl: true,
                secureUrl: true,
                publicId: true,
                user: {
                    select: {
                        full_name: true,
                    },
                },
                details: {
                    select: {
                        ticketId: true,
                        quantity: true,
                    },
                },
            },
        });
        return transactions;
    };
}




