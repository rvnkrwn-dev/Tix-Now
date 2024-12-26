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

        // HTML Template
        const html = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Konfirmasi Checkout Pembelian Tiket</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .header {
                    background: #FF5733;
                    color: #ffffff;
                    text-align: center;
                    padding: 20px;
                }
                .content {
                    padding: 20px;
                }
                .details {
                    margin: 20px 0;
                    padding: 10px;
                    background: #f4f4f4;
                    border-radius: 6px;
                }
                .button {
                    display: block;
                    width: fit-content;
                    margin: 20px auto;
                    padding: 10px 20px;
                    background: #FF5733;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #888888;
                }
                svg {
                    display: block;
                    margin: 0 auto 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 320 80" width="180" height="60">
                        <circle cx="50" cy="50" r="35" fill="#FF5733" stroke="white" stroke-width="2"/>
                        <path d="M45,45 L55,35 L75,35 L85,45 L75,55 L55,55 L45,45 Z" fill="white"/>
                        <text x="100" y="52" font-family="'Gloria Hallelujah', cursive" font-size="30" fill="#FF5733" font-weight="bold">TIX NOW</text>
                        <text x="100" y="72" font-family="Arial, sans-serif" font-size="14" fill="#333" font-weight="normal">Pembelian Tiket Online</text>
                    </svg>
                </div>
                <div class="content">
                    <h2>Halo, ${fullName}!</h2>
                    <p>Terima kasih telah melakukan pemesanan tiket di <strong>Tix Now</strong>. Berikut adalah detail transaksi Anda:</p>
                    <div class="details">
                        <p><strong>ID Tiket:</strong> ${detailTransactions[0].ticketId}</p>
                        <p><strong>ID Transaksi:</strong> ${transaction.id}</p>
                        <p><strong>Nama:</strong> ${fullName}</p>
                        <p><strong>Acara:</strong> ${detailTransactions.map(dt => dt.ticket.title).join(', ')}</p>
                        <p><strong>Total Tiket:</strong> ${transaction.totalTicket}</p>
                        <p><strong>Total Transaksi:</strong> Rp ${transaction.total}</p>
                        <p><strong>Status Transaksi:</strong> ${transaction.status}</p>
                        <p><strong>Tanggal Pemesanan:</strong> ${transaction.createdAt}</p>
                    </div>
                    <p>Untuk memverifikasi pembayaran Anda, silakan klik tombol di bawah ini untuk menghubungi kami melalui WhatsApp:</p>
                    <a class="button" href="https://wa.me/${process.env.WHATSAPP_NUMBER}?text=Halo%20Tix%20Now!%0ASaya%20ingin%20verifikasi%20pembayaran%20untuk%20tiket%20saya.%0A%0AID%20Tiket:%20${detailTransactions[0].ticketId}%0AID%20Transaksi:%20${transaction.id}%0ANama:%20${fullName}%0ATotal%20Transaksi:%20Rp%20${transaction.total}%0A%0ATerima%20kasih.">Verifikasi Pembayaran di WhatsApp</a>
                    <p>Pastikan Anda menyelesaikan pembayaran sebelum <strong>${transaction.createdAt}</strong> untuk menghindari pembatalan otomatis.</p>
                </div>
                <div class="footer">
                    &copy; 2024 Tix Now. Semua Hak Dilindungi.
                </div>
            </div>
        </body>
        </html>
        `;

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
