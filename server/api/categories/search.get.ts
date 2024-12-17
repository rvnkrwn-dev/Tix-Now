import { Category } from '~/server/model/Categories';
import { setResponseStatus, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        const { q } = getQuery(event);

        if (typeof q !== 'string' || !q) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Parameter pencarian diperlukan dan harus berupa string.' };
        }

        const category = await Category.searchCategory(q);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Kategori berhasil dikembalikan.",
            data: {
                users: category
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});