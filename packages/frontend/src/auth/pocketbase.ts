import PocketBase from 'pocketbase';

// Replace with your Pocketbase service URL
const PB_URL = import.meta.env.PUBLIC_POCKETBASE_URL || 'http://db-algolens.jarek-backend.top/_/';

export const pb = new PocketBase(PB_URL);

// Optional: auto refresh authentication if the user is logged in
pb.authStore.onChange(() => {
    console.log('authStore changed', pb.authStore.isValid);
});