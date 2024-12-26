import { Transaction } from '~/server/model/Transaction';
import { ActionLog } from '~/types/TypesModel';
import { LogRequest } from '~/types/AuthType';
import { SendEmailUpdateStatus } from '~/server/utils/SendEmailUpdateStatus';
import { uploadFile } from '~/server/utils/uploadFile';
import { defineEventHandler, readMultipartFormData, setResponseStatus, sendError, createError } from 'h3';
import {prisma} from "~/server/config/db";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        const id = parseInt(event.context.params?.id as string);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'ID transaksi tidak valid' };
        }

        const formData = await readMultipartFormData(event);

        if (!formData) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'No form data provided.' };
        }

        let status;
        let uploadResult;

        for (const field of formData) {
            const { name, data, filename, type } = field;

            if (typeof name !== 'string') return;

            if (filename) {
                const fileBuffer = data as Buffer;
                const fileName = `receipt-${Date.now()}`;

                uploadResult = await uploadFile(<any>{
                    fileBuffer,
                    filename: fileName,
                    mimeType: type,
                });
            } else if (data) {
                if (name === 'status') {
                    status = data.toString('utf-8');
                }
            }
        }

        if (!status) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Status tidak valid' };
        }

        if (!uploadResult) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Invalid form data.' };
        }

        // Ambil transaksi untuk mendapatkan email pengguna
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true, // Include user relation to get user details
            },
        });

        if (!transaction) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Transaction not found.' };
        }

        const updatedTransaction = await Transaction.updateTransactionStatus(id, {
            status: status,
            imageUrl: uploadResult.url,
            secureUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        });

        const payloadLog: LogRequest = {
            user_id: user.id,
            action: ActionLog.UPDATE,
            description: `Status Transaksi dengan ID ${id} berhasil diperbarui`,
        };

        await createLog(payloadLog);

        // Ambil email pengguna dari transaksi
        const user_email = transaction.user.email;
        const email_subject = 'Status Transaksi Telah Selesai';

        await SendEmailUpdateStatus(id, user_email, email_subject);

        setResponseStatus(event, 200);
        return {
            code: 201,
            message: 'Status Transaksi berhasil diperbarui!',
            data: updatedTransaction,
        };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({ statusCode: 500, message: error?.message || 'Internal Server Error' })
        );
    }
});
