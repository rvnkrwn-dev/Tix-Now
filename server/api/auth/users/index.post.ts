import bcrypt from 'bcryptjs';
import { User } from '~/server/model/User';
import { createLog } from '~/server/utils/atLog';
import { customAlphabet } from "nanoid";
import { defineEventHandler, setResponseStatus, createError, sendError, readBody } from 'h3';
import { SendEmailCreateAccount } from '~/server/utils/SendEmailCreateAccount';
import {LogRequest} from "~/types/AuthType";
import {ActionLog} from "~/types/TypesModel";

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth.user;

        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak valid' };
        }

        const data = await readBody(event);

        if (!data.full_name || !data.email || !data.username) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Harap berikan semua kolom yang diperlukan (nama lengkap, email).' };
        }

        const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);
        const password = nanoid();

        const hashedPassword = bcrypt.hashSync(password, 10);

        const create_user = await User.createUser({
            ...data,
            password: hashedPassword,
        });

        const payload : LogRequest = {
            user_id : user.id,
            action : ActionLog.CREATE,
            description : `Akun pengguna dengan email: ${data.email}, berhasil ditambahkan`,
        }

        await createLog(payload)

        await SendEmailCreateAccount(data.email, data.full_name, password);

        const { password: _, ...userData } = create_user;

        setResponseStatus(event, 201);
        return {
            code: 201,
            message: 'Akun pengguna berhasil ditambahkan!',
            data: {
                user: userData,
                plainPassword: password
            },
        };
    } catch (error: any) {
        return sendError(
            event,
            createError({ statusCode: 500, message: error.message || 'Internal Server Error' })
        );
    }
});