import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => ({
	sections: [
		{ slug: 'profile', title: 'Profile' },
		{ slug: 'notifications', title: 'Notifications' }
	]
});
