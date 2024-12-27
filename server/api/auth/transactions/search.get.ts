import { Transaction } from '~/server/model/Transaction';
import { setResponseStatus, getQuery, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        const { q } = getQuery(event);

        if (typeof q !== 'string' || !q) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Parameter pencarian diperlukan dan harus berupa string.' };
        }

        const authUser = event.context.auth?.user;

        if (!authUser) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const transactions = await Transaction.searchTransactions(q);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Transaksi berhasil dikembalikan.",
            data: {
                transactions,
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});
