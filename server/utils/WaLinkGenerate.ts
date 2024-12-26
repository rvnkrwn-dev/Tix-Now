export function generateWhatsAppLink(phone: number, ticketId: number, transactionId: number, name: string, totalTransaction: number, transactionStatus: string) {
    // Base URL for WhatsApp
    const baseUrl = `https://wa.me/${phone}?text=`;

    // Construct the message
    const message = `ID Tiket: ${ticketId}\n` +
        `ID Transaksi: ${transactionId}\n` +
        `Nama: ${name}\n` +
        `Total Transaksi: ${totalTransaction}\n` +
        `Status Transaksi: ${transactionStatus}`;

    // Encode the message to be URL-safe
    const encodedMessage = encodeURIComponent(message);

    // Combine the base URL and encoded message
    return baseUrl + encodedMessage;
}

