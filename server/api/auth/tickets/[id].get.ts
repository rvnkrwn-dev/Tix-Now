import { Ticket } from '~/server/model/Tickets';
import {createLog} from "~/server/utils/atLog";

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const getCategory = await Ticket.getTicketById(id);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Tiket berhasil dikembalikan",
            data: getCategory,
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});