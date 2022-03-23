import { rest } from 'msw';
import { getState } from '../utils/localStorage';

export const handlers = [
    rest.post('/login', (req, res, ctx) => {
        // Persist user's authentication in the session
        sessionStorage.setItem('is-authenticated', 'true')
        return res(
            // Respond with a 200 status code
            ctx.status(200),
        )
    }),

    rest.get('/returnRequests', (req, res, ctx) => {
        // Get all request from localStorage
        const requests = localStorage.getItem('requests');

        if (!requests) {
            // If no requests, respond with 204 no content
            return res(
                ctx.status(200),
                ctx.json({
                    message: 'No content',
                }),
            )
        }
        // If there are requests, return requests
        return res(
            ctx.status(200),
            ctx.json(requests),
        )
    }),
]