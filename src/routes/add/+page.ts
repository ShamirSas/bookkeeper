import type { PageLoad } from '../$types';

export const load: PageLoad = ({ data }) => ({
	headings: JSON.parse(data.headings)
});
