// transactions/detail/[id].delete.ts

import { DetailTransaction } from '~/server/model/DetailTransaction';
import { ActionLog } from '~/types/TypesModel';
import { LogRequest } from '~/types/AuthType';

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        const id = parseInt(event.context.params?.id as string);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'ID tidak valid' };
        }

        const payload: LogRequest = {
            user_id: user.id,
            action: ActionLog.DELETE,
            description: `Detail transaksi dengan ID ${id} berhasil dihapus`,
        };

        const deletedDetailTransaction = await DetailTransaction.deleteDetailTransaction(id);
        await createLog(payload);
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: 'Detail transaksi berhasil dihapus!',
            data: deletedDetailTransaction,
        };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({ statusCode: 500, message: error?.message || 'Internal Server Error' })
        );
    }
});
