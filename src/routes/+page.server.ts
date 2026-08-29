import type { PageServerLoad } from './$types';
import { headings } from '$lib/server';
import { ExcelLib } from '$lib/server/excel-data';
import { formatDataFields } from '$lib/server/format-data';

export const load: PageServerLoad = async () => ({
	policies: formatDataFields(await ExcelLib.loadData()),
	headings: JSON.stringify(headings)
});
