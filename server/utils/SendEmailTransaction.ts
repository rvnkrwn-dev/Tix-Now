import nodemailer from 'nodemailer';
import { configOptionsMailer } from '~/server/config/mailer';
import { Transaction } from '~/server/model/Transaction';
import { DetailTransaction } from '~/server/model/DetailTransaction';
import { User } from '~/server/model/User';

interface DetailTransactionType {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    transactionId: number;
    ticketId: number;
    quantity: number;
    ticket: { title: string }; // Tambahkan relasi nama tiket
}

export const SendEmailTransaction = async (transactionId: number, to: string, subject: string) => {
    let transporter = nodemailer.createTransport(configOptionsMailer);

    try {
        const transaction = await Transaction.getTransactionById(transactionId);
        if (!transaction) {
            throw new Error('Transaksi tidak ditemukan');
        }

        const user = await User.getUserById(transaction.userId);
        if (!user) {
            throw new Error('Pengguna tidak ditemukan');
        }
        const fullName = user.full_name;

        const detailTransactions: DetailTransactionType[] = await DetailTransaction.getDetailTransactionByTransactionId(transactionId);
        if (!Array.isArray(detailTransactions) || detailTransactions.length === 0) {
            throw new Error('Detail transaksi tidak ditemukan');
        }

        const text = `Detail Transaksi:
        ID: ${transaction.id}
        Full Name: ${fullName}
        Total Tiket: ${transaction.totalTicket}
        Total: ${transaction.total}
        Status: ${transaction.status}
        Tanggal Pembuatan: ${transaction.createdAt}

        Rincian Tiket:
        ${detailTransactions.map((dt) => `ID: ${dt.id}, Ticket ID: ${dt.ticketId}, Ticket Name: ${dt.ticket.title}, Quantity: ${dt.quantity}, Created At: ${dt.createdAt}, Updated At: ${dt.updatedAt}`).join('\n')}
        `;

        const html = `<h1>Detail Transaksi</h1>
        <ul>
            <li><strong>ID Transaksi:</strong> ${transaction.id}</li>
            <li><strong>Nama Lengkap:</strong> ${fullName}</li>
            <li><strong>Total Tiket:</strong> ${transaction.totalTicket}</li>
            <li><strong>Total Harga:</strong> ${transaction.total}</li>
            <li><strong>Status:</strong> ${transaction.status}</li>
            <li><strong>Tanggal Pemesanan:</strong> ${transaction.createdAt}</li>
        </ul>
        <h2>Rincian Tiket</h2>
        <ul>
            ${detailTransactions.map((dt) => `
            <li>
                <strong>Ticket Name:</strong> ${dt.ticket.title}, 
                <strong>Quantity:</strong> ${dt.quantity}
            </li>`).join('')}
        </ul>`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        };

        // Kirim email
        const info = await transporter.sendMail(mailOptions as any);
        console.log("Email transaksi terkirim: %s", info.messageId);
    } catch (error) {
        console.error("Gagal mengirim email transaksi:", error);
    }
};
