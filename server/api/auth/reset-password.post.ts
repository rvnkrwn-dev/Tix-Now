import bcrypt from 'bcryptjs';
import { prisma } from '~/server/config/db';

export default defineEventHandler(async (event) => {
    try {
        const { email, otp, newPassword, confirmNewPassword } = await readBody(event);

        if (!email || !otp || !newPassword || !confirmNewPassword) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Semua inputan diperlukan' };
        }

        if (newPassword !== confirmNewPassword) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Kata sandi tidak sama' };
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'Pengguna tidak ditemukan' };
        }

        if (user.otp !== parseInt(otp, 10)) {
            setResponseStatus(event, 403);
            return { code: 403, message: 'OTP tidak valid atau sudah kadaluarsa' };
        }

        const isPasswordSame = bcrypt.compareSync(newPassword, user.password);
        if (isPasswordSame) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'Kata sandi baru tidak boleh sama dengan kata sandi lama.' };
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword, otp: null }
        });

        return { code: 200, message: 'Kata sandi telah berhasil diatur ulang.' };

    } catch (error: any) {
        console.error('Kesalahan pengaturan ulang kata sandi:', error);
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
        );
    }
});
