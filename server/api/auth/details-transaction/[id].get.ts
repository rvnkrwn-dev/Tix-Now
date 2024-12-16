import { DetailTransaction } from '~/server/model/DetailTransaction';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const getCategory = await DetailTransaction.getDetailTransactionById(id);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Data transaksi berhasil dikembalikan",
            data: getCategory,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});