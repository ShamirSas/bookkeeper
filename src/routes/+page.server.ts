import type { PageServerLoad } from './$types';
import { headings } from '$lib/server';
import { ExcelLib } from '$lib/server/excel-data';
import { formatDataFields } from '$lib/server/format-data';
import type { Actions } from './$types';
import { editPolicySchema, policySchema, type Policy } from '$lib/schemas/policy';
import { fail } from '@sveltejs/kit';
import dayjs from 'dayjs';

let hasLoadedData: boolean = false;
let policies: Policy[] = [];
let fileName: string = 'data.xlsx';

export const load: PageServerLoad = async () => {
	policies = !hasLoadedData ? formatDataFields(await ExcelLib.loadData(fileName)) : policies;
	hasLoadedData = true;
	return {
		policies,
		headings: JSON.stringify(headings)
	};
};

export const actions = {
	addPolicy: async ({ request }) => {
		console.log('Adding new policy record');

		const formData = await request.formData();
		const parseResult = policySchema.safeParse({
			client: formData.get('client'),
			policyNumber: formData.get('policyNumber'),
			insurer: formData.get('insurer'),
			inception: formData.get('inception'),
			type: formData.get('type'),
			premium: formData.get('premium'),
			commission: formData.get('commission'),
			split: formData.get('split'),
			isNew: true
		});
		
		if (!parseResult.success) {
			return fail(400, {
				message: 'Invalid data'
			});
		}

		policies.unshift(parseResult.data);

		return {
			policies
		};
	},
	editPolicy: async ({ request }) => {
		const formData = await request.formData();
		const parseResult = editPolicySchema.safeParse({
			rowIndex: formData.get('rowIndex'),
			client: formData.get('client'),
			policyNumber: formData.get('policyNumber'),
			insurer: formData.get('insurer'),
			inception: formData.get('inception'),
			type: formData.get('type'),
			premium: formData.get('premium'),
			commission: formData.get('commission'),
			split: formData.get('split'),
			isEdited: true
		});

		if (!parseResult.success) {
			return fail(400, {
				client: true
			});
		}

		const { rowIndex, ...updatedPolicy } = parseResult.data;
		policies[rowIndex] = updatedPolicy;

		return {
			policies
		};
	},
	saveSpreadsheet: async () => {
		const sortedPolicies: Policy[] = policies.sort((a, b) =>
			dayjs(a.inception, { format: 'YYYY-MM-DD' }).diff(
				dayjs(b.inception, { format: 'YYYY-MM-DD' })
			)
		);

		const { newFileName } = await ExcelLib.saveData(sortedPolicies);

		return {
			newFileName
		};
	}
} satisfies Actions;
