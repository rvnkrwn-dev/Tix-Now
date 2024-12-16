// tickets/[id].put.ts

import { Ticket } from '~/server/model/Tickets';
import { LogRequest, TicketRequest } from '~/types/AuthType';
import { ActionLog } from '~/types/TypesModel';
import { Log } from '~/server/model/Log';

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        const id = parseInt(event.context.params?.id || "0");
        const data = await readBody(event);

        if (!id) {
            setResponseStatus(event, 400);
            return { code: 400, message: "Invalid request data." };
        }


        const updatedTicket = await Ticket.updateTicket(id, data);

        const payloadLog : LogRequest = {
            user_id : user.id,
            action : ActionLog.UPDATE,
            description : `Tiket dengan dengan ID ${id}, berhasil diperbarui`,
        }

        await createLog(payloadLog)

        return {
            code: 200,
            message: 'Tiket berhasil diperbarui!',
            data: updatedTicket,
        };

    } catch (error: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error?.message || 'Internal Server Error',
            })
        );
    }
});
