import {Category} from "~/server/model/Categories";
import {ActionLog} from "~/types/TypesModel";
import {LogRequest} from "~/types/AuthType";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;

        const id = parseInt(event.context.params?.id as string);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const data = await readBody(event);

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.UPDATE,
            description : `Kategori dengan dengan ID ${id}, berhasil diperbarui`,
        }

        const updatedCategory = await Category.updateCategory(id, data);
        await createLog(payload)

        setResponseStatus(event, 200);
        return {
            code: 201,
            message: 'Kategori berhasil ditambahkan!',
            data: updatedCategory,
        };
    } catch (error: any) {
        console.error(error);
        return sendError(
            event,
            createError({statusCode: 500, message: error?.message || 'Internal Server Error'})
        );
    }
});