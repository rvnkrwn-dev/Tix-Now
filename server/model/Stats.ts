import { prisma } from '~/server/config/db';

export class Stats {
    static countUsers = () => {
        return prisma.user.count();
    };

    static countTotalTicketsSold = async () => {
        const total = await prisma.detailTransaction.aggregate({
            _sum: {
                quantity: true,
            },
        });
        return total._sum.quantity || 0;
    };

    static countTotalEvents = () => {
        return prisma.ticket.count();
    };

    static calculateTotalRevenue = async () => {
        const total = await prisma.transaction.aggregate({
            _sum: {
                total: true,
            },
        });
        return total._sum.total || 0;
    };
}
