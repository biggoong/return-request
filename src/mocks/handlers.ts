import { rest } from 'msw';
import { getState, saveState } from '../utils/localStorage';

export const handlers = [
    rest.post('/returnRequest', (req, res, ctx) => {
        // Get all request from localStorage
        const requests = getState('requests');

        let data = [];

        if (requests) {
            data = [...requests, req.body];
        } else {
            data = [req.body];
        }

        saveState('requests', data);

        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json({
                success: true,
            }),
        )
    }),

    rest.get('/returnRequests', (req, res, ctx) => {
        // Get all request from localStorage
        const requests = getState('requests');

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