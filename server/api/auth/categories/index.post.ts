import { Category } from '~/server/model/Categories';
import {ActionLog} from "~/types/TypesModel";
import {LogRequest} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context?.auth?.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const data = await readBody(event);

        const newData = {
            ...data,
            user_id: user.id,
        };

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.CREATE,
            description : `Kategori dengan ID ${user.id}, berhasil ditambahkan`,
        }

        const kategori = await Category.createCategory(newData);
        await createLog(payload)
        return {
            code: 200,
            message: 'Kategori berhasil ditambahkan!',
            data: kategori,
        };
    } catch (error: any) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});