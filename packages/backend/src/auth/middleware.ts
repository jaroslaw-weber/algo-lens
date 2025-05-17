import { Context, Next } from 'hono';
import { pb } from '../index'; // Assuming pb is exported from index.ts
import { RecordModel } from 'pocketbase';
import { Env } from 'hono';

export interface AuthEnv extends Env {
    Variables: {
        user: RecordModel | undefined;
    };
}

export const authMiddleware = async (c: Context<AuthEnv>, next: Next) => {
    
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token) {
        try {
            // Authenticate the client with the token
            // Load the token into the auth store
            pb.authStore.save(token, null);

            // Verify token validity and refresh if needed
            await pb.collection('users').authRefresh();

            // If authentication is successful, the authStore will be updated
            // You can access the authenticated user via pb.authStore.model
            // You might want to attach the user to the context for later use in route handlers
            // If authentication is successful, the authStore will be updated
            // You can access the authenticated user via pb.authStore.model
            // You might want to attach the user to the context for later use in route handlers
            if (pb.authStore.model) {
                c.set('user', pb.authStore.model);
            }

            // Proceed to the next middleware or route handler
            await next();
        } catch (e) {
            console.error(e)
            // If token is invalid or expired, clear the auth store and proceed
            pb.authStore.clear(); // Clear the invalid token
            await next();
        }
    } else {
        // No token provided, proceed to the next middleware or route handler
        // Protected routes will need to explicitly check for user in context or handle unauthorized
        await next();
    }
};