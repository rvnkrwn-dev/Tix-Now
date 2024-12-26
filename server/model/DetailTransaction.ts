import { prisma } from '~/server/config/db';
import { DetailTransactionRequest } from '~/types/AuthType';

export class DetailTransaction {
    // Fungsi untuk membuat detail transaksi baru
    static createDetailTransaction = (data: DetailTransactionRequest) => {
        return prisma.detailTransaction.create({
            data: {
                transactionId: data.transaction_id,
                ticketId: data.ticket_id,
                quantity: data.quantity,
            },
        });
    };

    // Fungsi untuk memperbarui detail transaksi
    static updateDetailTransaction = (id: number, data: Partial<DetailTransactionRequest>) => {
        return prisma.detailTransaction.update({
            where: {
                id: id
            },
            data: {
                transactionId: data.transaction_id,
                ticketId: data.ticket_id,
                quantity: data.quantity,
            },
        });
    };

    // Fungsi untuk mengambil detail transaksi berdasarkan ID
    static getDetailTransactionById = (id: number) => {
        return prisma.detailTransaction.findUnique({
            where: { id: id },
            select: {
                id: true,
                transactionId: true,
                ticketId: true,
                quantity: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    };

    // Fungsi untuk menghitung semua transaksi
    static countAllDetailTransactions = () => {
        return prisma.detailTransaction.count();
    };

    // Fungsi untuk menghapus transaksi
    static deleteDetailTransaction = (id: number) => {
        return prisma.detailTransaction.delete({
            where: { id },
        });
    };

    // Fungsi untuk menghitung total harga detail transaksi berdasarkan harga tiket
    static calculateTotalPrice = async (transactionId: number) => {
        const details = await prisma.detailTransaction.findMany({
            where: { transactionId: transactionId },
            include: { ticket: true },
        });

        return details.reduce((total, detail) => {
            return total + (detail.ticket.price * detail.quantity);
        }, 0);
    };

    static getDetailTransactionByTransactionId = async (transactionId: number) => {
        return prisma.detailTransaction.findMany({
            where: { transactionId: transactionId },
            select: {
                id: true,
                transactionId: true,
                ticketId: true,
                quantity: true,
                createdAt: true,
                updatedAt: true,
                ticket: { select: { title: true } } // Mengambil nama tiket
            },
        });
    };


}
