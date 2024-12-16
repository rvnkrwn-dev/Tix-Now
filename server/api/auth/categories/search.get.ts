import { Category } from '~/server/model/Categories';
import { setResponseStatus, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        const { q } = getQuery(event);

        if (typeof q !== 'string' || !q) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Parameter pencarian diperlukan dan harus berupa string.' };
        }

        const authUser = event.context.auth?.user;

        if (!authUser) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const users = await Category.searchCategory(q);

        const filteredCategory = users.filter(usr => usr.id !== authUser.id);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Kategori berhasil dikembalikan.",
            data: {
                users: filteredCategory
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});