import { Ticket } from "~/server/model/Tickets";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = parseInt(query.page as string, 10) || 1;
        const pagesize = parseInt(query.pagesize as string, 10) || 10;
        const sortBy = query.sortBy as string || "createdAt";
        const sortOrder = query.sortOrder as string || "asc";
        const type = query.type as string || "all";

        if (page <= 0 || pagesize <= 0) {
            throw createError({
                statusCode: 400,
                message: "Halaman dan ukuran halaman harus berupa bilangan bulat positif.",
            });
        }

        // Validasi kolom dan urutan penyortiran
        const validSortColumns = ["createdAt", "title", "dateTime"];
        const validSortOrders = ["asc", "desc"];

        if (!validSortColumns.includes(sortBy)) {
            throw createError({
                statusCode: 400,
                message: `Kolom penyortiran tidak valid. Kolom yang valid adalah ${validSortColumns.join(", ")}.`,
            });
        }

        if (!validSortOrders.includes(sortOrder.toLowerCase())) {
            throw createError({
                statusCode: 400,
                message: `Urutan penyortiran tidak valid. Urutan yang valid adalah ${validSortOrders.join(", ")}.`,
            });
        }

        let tickets = [];
        let totalTickets = 0;

        if (type === "upcoming") {
            const now = new Date().toISOString();
            tickets = await Ticket.getUpcomingTickets(page, pagesize, now);
            totalTickets = await Ticket.countUpcomingTickets(now);
        } else {
            tickets = await Ticket.getAllTickets(page, pagesize);
            totalTickets = await Ticket.countAllTickets();
        }

        // Lakukan penyortiran di sini
        tickets.sort((a: any, b: any) => {
            if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });

        const totalPages = Math.ceil(totalTickets / pagesize);

        const baseUrl = "/api/auth/tickets";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}&sortBy=${sortBy}&sortOrder=${sortOrder}&type=${type}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}&sortBy=${sortBy}&sortOrder=${sortOrder}&type=${type}` : null;

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
