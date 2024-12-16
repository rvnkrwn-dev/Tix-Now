// tickets/index.post.ts

import { uploadFile } from '~/server/utils/uploadFile';
import { LogRequest, TicketRequest } from '~/types/AuthType';
import { Ticket } from '~/server/model/Tickets';
import { ActionLog } from '~/types/TypesModel';

function generateUniqueSlug(title: string) {
    const slug = title.split(' ').join('-').toLowerCase();
    return `${slug}-${Date.now()}`;
}

export default defineEventHandler(async (event) => {
    try {
        const user = event.context.auth?.user;
        if (!user) {
            setResponseStatus(event, 401);
            return { code: 401, message: 'User not authenticated.' };
        }

        const formData = await readMultipartFormData(event);

        if (!formData) {
            setResponseStatus(event, 400);
            return { code: 400, message: 'No form data provided.' };
        }

        const payload: TicketRequest = {
            slug: '',
            title: '',
            description: '',
            location: '',
            dateTime: new Date(),
            stock: 0,
            price: 0,
            categories_id: 0,
            url_ticket: '',
            secure_url_ticket: '',
            public_id_ticket: '',
        };

        let uploadResult;

        for (const field of formData) {
            const { name, data, filename, type } = field;

            if (typeof name !== 'string') return;

            if (filename) {
                const fileBuffer = data as Buffer;
                const fileName = generateUniqueSlug(filename);

                uploadResult = await uploadFile(<any>{
                    fileBuffer,
                    filename: fileName,
                    mimeType: type,
                });

                payload.url_ticket = uploadResult.url;
                payload.secure_url_ticket = uploadResult.secure_url;
                payload.public_id_ticket = uploadResult.public_id;
            } else if (data) {
                switch (name) {
                    case 'title':
                        payload.title = data.toString('utf-8');
                        payload.slug = generateUniqueSlug(payload.title); // Generate unique slug based on title
                        break;
                    case 'description':
                        payload.description = data.toString('utf-8');
                        break;
                    case 'location':
                        payload.location = data.toString('utf-8');
                        break;
                    case 'dateTime':
                        payload.dateTime = new Date(data.toString('utf-8'));
                        break;
                    case 'stock':
                        payload.stock = parseInt(data.toString('utf-8'), 10);
                        break;
                    case 'price':
                        payload.price = parseFloat(data.toString('utf-8'));
                        break;
                    case 'categories_id':
                        payload.categories_id = parseInt(data.toString('utf-8'), 10);
                        break;
                }
            }
        }

        const ticket = await Ticket.createTicket(payload);
        const payloadLog : LogRequest = {
            user_id : user.id,
            action : ActionLog.UPDATE,
            description : `Tiket ${payload.title} berhasil ditambahkan`,
        }

        await createLog(payloadLog)

        return { code: 201, message: 'Tiket berhasil ditambahkan', data: ticket };

    } catch (error: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error?.message || 'Internal Server Error',
            })
        );
    }
});
