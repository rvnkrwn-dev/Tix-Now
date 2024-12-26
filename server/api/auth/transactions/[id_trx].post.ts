import { uploadFile } from '~/server/utils/uploadFile';
import { prisma } from '~/server/config/db';
import { defineEventHandler, readMultipartFormData, setResponseStatus, sendError, createError } from 'h3'; // Ganti 'h3' dengan framework yang Anda gunakan
import { Transaction} from '~/server/model/Transaction';
import {TransactionRequest} from "~/types/AuthType";


export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

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

        const payload: TransactionRequest = {
            user_id: user.id,
            total_ticket: 0,
            total: 0,
            imageUrl: '',
            secureUrl: '',
            publicId: '',
        };

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

                payload.imageUrl = uploadResult.url;
                payload.secureUrl = uploadResult.secure_url;
                payload.publicId = uploadResult.public_id;
            }
        }

        if (!uploadResult) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Invalid form data.' };
        }

        const transaction = await prisma.transaction.findFirst({
            where: {
                id: id,
                user: {
                    full_name: user.full_name,
                },
            },
        });

        if (!transaction) {
            setResponseStatus(event, 404);
            return { code: 404, message: 'Transaction not found.' };
        }

        const updatedTransaction = await Transaction.updateTransaction(id, {
            user_id: transaction.userId,
            total_ticket: transaction.totalTicket,
            total: transaction.total,
            imageUrl: payload.imageUrl,
            secureUrl: payload.secureUrl,
            publicId: payload.publicId,
        });

        return {
            code: 200,
            message: 'Receipt uploaded successfully.',
            data: updatedTransaction,
        };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error?.message || 'Internal Server Error',
            })
        );
    }
});
