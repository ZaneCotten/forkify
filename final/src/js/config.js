import 'dotenv/config';

export const API_KEY = process.env.FORKIFY_API_KEY;
export const API_URL = 'https://forkify-api.jonas.io/api/v2/recipes';
export const TIMEOUT_SEC = 10;
export const RESULTS_PER_PAGE = 10;
