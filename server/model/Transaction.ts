// Transactions.ts

import {prisma} from '~/server/config/db';
import {TransactionRequest, DetailTransactionRequest} from '~/types/AuthType';
import {TransactionStatus} from "@prisma/client";

export class Transaction {
    // Fungsi untuk membuat transaksi baru beserta detail transaksi
    static createTransactionWithDetails = async (transactionData: TransactionRequest, detailRequests: DetailTransactionRequest[]) => {
        return prisma.$transaction(async (prisma) => {
            const transaction = await prisma.transaction.create({
                data: {
                    userId: transactionData.user_id,
                    totalTicket: transactionData.total_ticket,
                    total: 0,
                },
            });

            // Buat detail transaksi dan kurangi stok tiket
            for (const detailRequest of detailRequests) {
                const ticket = await prisma.ticket.findUnique({where: {id: detailRequest.ticket_id}});

                if (!ticket || ticket.stock < detailRequest.quantity) {
                    throw new Error(`Stok tidak cukup untuk tiket dengan ID: ${detailRequest.ticket_id}`);
                }

                await prisma.detailTransaction.create({
                    data: {
                        transactionId: transaction.id,
                        ticketId: detailRequest.ticket_id,
                        quantity: detailRequest.quantity,
                    },
                });

                // Kurangi stok tiket
                await prisma.ticket.update({
                    where: {id: detailRequest.ticket_id},
                    data: {stock: ticket.stock - detailRequest.quantity},
                });
            }

            // Hitung total harga transaksi berdasarkan detail transaksi yang dibuat
            const total = await prisma.detailTransaction.findMany({
                where: {transactionId: transaction.id},
                include: {ticket: true},
            }).then(details => details.reduce((sum, detail) => {
                return sum + (detail.ticket.price * detail.quantity);
            }, 0));

            // Update total transaksi
            const updatedTransaction = await prisma.transaction.update({
                where: {id: transaction.id},
                data: {total},
            });

            return updatedTransaction;
        });
    };



// Fungsi untuk memperbarui transaksi
    static updateTransaction = (id: number, data: Partial<TransactionRequest>) => {
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
    static updateTransactionStatus = (id: number, status: TransactionStatus) => {
        return prisma.transaction.update({
            where: {
                id: id
            },
            data: {
                status: status
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
            },
            skip: skip,
            take: take,
        });
    };

    // Fungsi untuk menghitung semua transaksi
    static countAllTransactions = () => {
        return prisma.transaction.count();
    };
}
