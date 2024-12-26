import { Transaction } from "~/server/model/Transaction";
import { defineEventHandler, getQuery, setResponseStatus, sendError, createError } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;

        if (page <= 0 || pagesize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Halaman dan ukuran halaman harus berupa bilangan bulat positif.",
            });
        }

        const transactions = await Transaction.getAllTransactionsByUserId(user.id, page, pagesize);

        const totalTransactions = await Transaction.countAllTransactionsByUserId(user.id);
        const totalPages = Math.ceil(totalTransactions / pagesize);

        const baseUrl = "/api/auth/transactions/history";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        return {
            message: "Data transaksi berhasil dikembalikan.",
            data: {
                transactions
            },
            meta: {
                totalPages,
                prev: prevPage,
                next: nextPage,
            }
        };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({statusCode: 500, message: error?.message || 'Internal Server Error'})
        );
    }
});
