import { describe } from 'node:test';
import { expect, it } from 'vitest';
import { ExcelLib } from './excel-data';
import { Workbook, type Worksheet } from 'exceljs';
import { HeadingId } from '$lib/types';
import type { Policy } from '$lib/schemas/policy';

describe('excel-data', () => {
	it('should create a workbook instance', () => {
		expect(ExcelLib.createWorkbook()).toBeInstanceOf(Workbook);
	});

	it('should set workbook properties', () => {
		const workbook: Workbook = ExcelLib.createWorkbook();

		workbook.creator = 'Shamir';
		workbook.lastModifiedBy = 'Mr Sas';
		workbook.created = new Date(2026, 3, 30);

		expect(workbook.creator).toBe('Shamir');
		expect(workbook.lastModifiedBy).toBe('Mr Sas');
		expect(workbook.created).toEqual(new Date(2026, 3, 30));
	});

	it('should add worksheet', () => {
		const workbook: Workbook = ExcelLib.createWorkbook();
		const sheet: Worksheet = workbook.addWorksheet('My Sheet', {
			headerFooter: {
				firstHeader: 'Hello Exceljs',
				firstFooter: 'Hello World'
			},
			views: [
				{
					showGridLines: false
				}
			]
		});

		expect(sheet).toBeDefined();
	});

	it('should load data', async () => {
		const data = await ExcelLib.loadData('data.xlsx');
		expect(data).toBeDefined();
		expect(true).toBe(true);
	});
});
