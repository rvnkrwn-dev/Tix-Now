import { Stats } from '~/server/model/Stats';

export default defineEventHandler(async (event) => {
    try {
        // Ambil data statistik dari model
        const [pengguna, totalTiketTerjual, totalEvent, totalPemasukan] = await Promise.all([
            Stats.countUsers(),
            Stats.countTotalTicketsSold(),
            Stats.countTotalEvents(),
            Stats.calculateTotalRevenue(),
        ]);

        // Set response status dan kembalikan data statistik
        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Berhasil mengembalikan data stats",
            data: {
                pengguna,
                totalTiketTerjual,
                totalEvent,
                totalPemasukan,
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: error.message || "Internal Server Error" })
        );
    }
});
