import {Transaction} from "~/server/model/Transaction";
import {ActionLog} from "~/types/TypesModel";
import {LogRequest} from "~/types/AuthType";
import {SendEmailTransaction} from "~/server/utils/SendEmailTransaction";
import {SendEmailUpdateStatus} from "~/server/utils/SendEmailUpdateStatus";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        const id = parseInt(event.context.params?.id as string);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const {status} = await readBody(event);

        if(!status) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Status tidak valid'};
        }

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.UPDATE,
            description : `Status Transaksi dengan dengan ID ${id}, berhasil diperbarui`,
        }

        await createLog(payload)

        const updatedstatus = await Transaction.updateTransactionStatus(id, status);

        const user_email = user.email;
        const email_subject = 'Status Transaksi Telah Selesai';

        await SendEmailUpdateStatus(id, user_email, email_subject);


        setResponseStatus(event, 200);
        return {
            code: 201,
            message: 'Status Transaksi berhasil diperbarui!',
            data: updatedstatus,
        };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({statusCode: 500, message: error?.message || 'Internal Server Error'})
        );
    }
});