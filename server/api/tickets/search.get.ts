import { Ticket} from '~/server/model/Tickets';
import { setResponseStatus, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        const { q } = getQuery(event);

        if (typeof q !== 'string' || !q) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Parameter pencarian diperlukan dan harus berupa string.' };
        }


        const tickets = await Ticket.searchTicket(q);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Tiket berhasil dikembalikan.",
            data: {
                tickets: tickets
            },
        };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});