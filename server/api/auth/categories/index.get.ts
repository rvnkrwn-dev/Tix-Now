import { Category } from "~/server/model/Categories";

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

        const getAllCategory = await Category.getAllCategories(page, pagesize);

        const totalUsers = await Category.countAllCategories();
        const totalPages = Math.ceil(totalUsers / pagesize);

        const baseUrl = "/api/auth/categories";
        const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&pagesize=${pagesize}` : null;
        const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}&pagesize=${pagesize}` : null;

        return {
            message: "Kategori berhasil dikembalikan.",
            data: {
                categories: getAllCategory
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
            createError({statusCode: 500, message: error?.message || 'Internal Server Error'})
        );
    }
});