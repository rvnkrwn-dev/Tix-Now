import { Ticket } from '~/server/model/Tickets';
import {createLog} from "~/server/utils/atLog";

export default defineEventHandler(async (event) => {
    try {
        const slug = event.context.params?.slug as string

        if (!slug) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'slug tidak valid'};
        }

        const getCategory = await Ticket.getTicketBySlug(slug);

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