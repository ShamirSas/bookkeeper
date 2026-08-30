import { PolicyType } from '$lib/types';
import z from 'zod';

export const policySchema = z.object({
	client: z.string(),
	policyNumber: z.coerce.number().int(),
	insurer: z.string(),
	inception: z.coerce.string(),
	type: z.enum(PolicyType),
	premium: z.coerce.number().min(0).max(100_000_000),
	commission: z.coerce.number().min(0).max(100_000_000),
	split: z.string(),
	isNew: z.boolean().optional(),
	isEdited: z.boolean().optional()
});

export type Policy = z.infer<typeof policySchema>;

export const editPolicySchema = policySchema.extend({
	rowIndex: z.coerce.number().int()
});

export type EditPolicy = z.infer<typeof editPolicySchema>;
