import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const posts = Array(10).fill({}).map((_, index) => ({
		title: `Post ${index + 1}`,
		slug: `post-${index + 1}`
	}));
	console.log('LOADING > ', posts);
	return {
		posts
	};
};
