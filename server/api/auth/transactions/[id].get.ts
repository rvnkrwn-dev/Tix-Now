import { Transaction } from '~/server/model/Transaction';
import {logger} from "@nuxt/kit";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Id tidak valid'};
        }

        const getTransaction = await Transaction.getTransactionById(id);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Transaksi berhasil dikembalikan",
            data: getTransaction,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});