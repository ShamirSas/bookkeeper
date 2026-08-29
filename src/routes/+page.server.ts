import type { PageServerLoad } from './$types';
import { policies, headings } from '$lib/server';
import { formatDataFields } from '$lib/server/format-data';

export const load: PageServerLoad = async () => ({
	policies: formatDataFields(policies),
	headings: JSON.stringify(headings)
});
