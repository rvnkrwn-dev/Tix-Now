import { User } from '~/server/model/User';

export default defineEventHandler(async (event) => {
    try {
        const id = parseInt(event.context.params?.id as string);

        if (!id || isNaN(id)) {
            setResponseStatus(event, 400);
            return {code: 400, message: 'Pengguna tidak valid'};
        }

        const user = await User.getUserById(id);

        setResponseStatus(event, 200);
        return {
            code: 200,
            message: "Akun pengunna berhasil dikembalikan",
            data: {
                user: user
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || "Internal Server Error" })
        );
    }
});