import { Ticket } from "~/server/model/Tickets";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;

        if (page <= 0 || pagesize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Halaman dan ukuran halaman harus berupa bilangan bulat positif.",
            });
        }

        const now = new Date().toISOString();

        const tickets = await Ticket.getUpcomingTickets(page, pagesize, now);

        const totalTickets = await Ticket.countUpcomingTickets(now);
        const totalPages = Math.ceil(totalTickets / pagesize);

        const baseUrl = "/api/auth/tickets";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        return {
            message: "Tiket berhasil dikembalikan.",
            data: {
                tickets
            },
            meta: {
                totalPages,
                prev: prevPage,
                next: nextPage,
            }
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error?.message || 'Internal Server Error' })
        );
    }
});
