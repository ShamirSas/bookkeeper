import type { PolicyRecord } from '$lib/types';
import dayjs from 'dayjs';

export function formatDataFields(policies: PolicyRecord[]) {
	return policies.map((policy) => ({
		...policy,
		inception: dayjs(policy.inception).format('DD-MMM-YYYY'),
		// premium: Number(policy.premium.toFixed(2)),
		// commission: Number(policy.commission.toFixed(2))
	}));
}
