import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => ({
	policies: data.policies,
	headings: JSON.parse(data.headings)
});
