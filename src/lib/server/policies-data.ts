import type { PolicyRecord } from '$lib/types';
import { faker } from '@faker-js/faker';

export const policies: PolicyRecord[] = Array(10)
	.fill({})
	.map((policy) => ({
		client: faker.person.fullName(),
		policyNumber: faker.string.numeric({ length: 12 }),
		inception: faker.date.anytime(),
		insurer: faker.company.name(),
		type: faker.word.adverb(),
		premium: faker.number.float({ min: 100, max: 10_000 }),
		commission: faker.number.float({ min: 30, max: 1000 }),
		split: faker.word.noun()
	}));
