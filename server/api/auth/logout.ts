import { RefreshToken } from '~/server/model/RefreshToken';
import { addToBlacklist } from '~/server/utils/tokenBlacklist';
import { deleteRefreshToken, verifyToken } from '~/server/utils/jwt';
import { createLog } from '~/server/utils/atLog';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth.user;
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const authHeader = event.req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            setResponseStatus(event, 401);
            return { error: 'Tidak terotorisasi' };
        }

        const token = authHeader.split(' ')[1];
        verifyToken(token);

        addToBlacklist(token);

        const refreshToken = getCookie(event, 'refresh_token'); // Ensure the cookie name matches

        if (!refreshToken) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Tidak ada refresh token yang ditemukan dalam cookie.' };
        }

        await RefreshToken.deleteToken(refreshToken);

        const data = await readBody(event)

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.LOGOUT,
            description : `Pengguna dengan ID ${user.id}, berhasil keluar`,
        }

        await createLog(payload)

        deleteRefreshToken(event);

        appendHeader(event, 'Set-Cookie', 'refresh_token=; HttpOnly; Path=/; Max-Age=0');

        return { code: 200, message: 'Berhasil keluar!' };
    } catch (error: any) {
        console.error('Kesalahan ketika keluar:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
        );
    }
});