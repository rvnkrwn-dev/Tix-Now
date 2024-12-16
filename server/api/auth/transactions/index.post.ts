// transactions/index.post.ts

import {DetailTransactionRequest, LogRequest, TransactionRequest} from '~/types/AuthType';
import {ActionLog, TransactionStatus} from '~/types/TypesModel';
import {Transaction} from '~/server/model/Transaction';

export default defineEventHandler(async (event) => {
    try {
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const { detailRequests }: { status: string; detailRequests: DetailTransactionRequest[] } = await readBody(event);

        if ( !detailRequests || detailRequests.length === 0) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }

        const total_ticket = detailRequests.reduce((sum: number, detail: DetailTransactionRequest) => sum + detail.quantity, 0);

        const transactionData: TransactionRequest = {
            user_id: user.id,
            total_ticket,
            total: 0,
        };

        const transaction = await Transaction.createTransactionWithDetails(transactionData, detailRequests);

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.CREATE,
            description: `Transaksi dengan ID ${transaction.id} berhasil dibuat`,
        };

        await createLog(payload);

        return {
            code: 201,
            message: 'Transaksi berhasil dibuat!',
            data: transaction,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' }));
    }
});
