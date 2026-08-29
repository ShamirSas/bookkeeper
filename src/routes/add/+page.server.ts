import { headings } from '$lib/server';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = () => ({
	headings: JSON.stringify(headings)
});
