import UrlPattern from "url-pattern"
import {decodeAccessToken} from "~/server/utils/jwt";
import {User} from "~/server/model/User";

export default defineEventHandler( async (event) => {
    try {
        const endpoints = [
            '/api/auth/user',
            '/api/auth/logout',
            '/api/auth/log',
            '/api/auth/users',
            '/api/auth/users/:id',
            '/api/auth/users/search?q=:q',
            '/api/auth/users?page=:page&pagesize=:pagesize',
            '/api/auth/categories',
            '/api/auth/categories/:id',
            '/api/auth/categories?page=:page&pagesize=:pagesize',
            '/api/auth/categories/search?q=:q',
            '/api/auth/tickets',
            '/api/auth/tickets/:id',
            '/api/auth/tickets?page=:page&pagesize=:pagesize',
            '/api/auth/tickets/search?q=:q',
            '/api/auth/transactions',
            '/api/auth/transactions/history?page=:page&pagesize=:pagesize',
            '/api/auth/transactions/:id',
            '/api/auth/transactions?page=:page&pagesize=:pagesize',
        ]

        const isHandledByThisMiddleware = endpoints.some(endopoint => {
            const pattern = new UrlPattern(endopoint)
            return pattern.match(event.req.url as string)
        })

        if (!isHandledByThisMiddleware) {
            return
        }

        const token = event.req.headers['authorization']?.split(' ')[1]

        const decoded = decodeAccessToken(token as string)

        if (!decoded) {
            return sendError(event, createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            }))
        }


        try {
            const userId = decoded.id

            const user = await User.getUserById(userId)
            event.context.auth = {user: user}
        } catch (error) {
            return
        }
    } catch (e) {
        return
    }})
