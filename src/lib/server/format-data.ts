import type { Policy } from '$lib/schemas/policy';
import dayjs from 'dayjs';

export function formatDataFields(policies: Policy[]): Policy[] {
	const toNumber = (val: string | number) =>
		typeof val === 'string' ? Number(val.replace(/\D/g, '')) : val;

	return policies.map((policy) => ({
		...policy,
		inception: dayjs(policy.inception).format('YYYY-MM-DD'),
		premium: Number(toNumber(policy.premium).toFixed(2)),
		commission: Number(toNumber(policy.commission).toFixed(2))
	}));
}
