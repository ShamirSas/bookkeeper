import { HeadingId, type PolicyRecord } from '$lib/types';
import ExcelJS from 'exceljs';
import fs from 'node:fs';
import path from 'node:path';

class ColumnMap {
	constructor(
		public id: HeadingId,
		public fileText: string
	) {}
}

const columMapping: ColumnMap[] = [
	new ColumnMap(HeadingId.Client, 'CLIENT'),
	new ColumnMap(HeadingId.PolicyNumber, 'POLICY NR'),
	new ColumnMap(HeadingId.Insurer, 'INSURER'),
	new ColumnMap(HeadingId.Inception, 'INCEPTION'),
	new ColumnMap(HeadingId.Type, 'TYPE'),
	new ColumnMap(HeadingId.Premium, 'PREMIUM'),
	new ColumnMap(HeadingId.Commission, 'COMMISION'),
	new ColumnMap(HeadingId.Split, 'SPLIT')
];

export class ExcelLib {
	static createWorkbook() {
		return new ExcelJS.Workbook();
	}

	static async loadData(): Promise<PolicyRecord[]> {
		const workbook: ExcelJS.Workbook = ExcelLib.createWorkbook();
		const filePath = path.join(process.cwd(), 'static', 'data.xlsx');

		await workbook.xlsx.readFile(filePath);
		const sheet: ExcelJS.Worksheet | undefined = workbook.getWorksheet(1);
		const headingRow = sheet?.getRow(1);
		if (headingRow == null || headingRow.values == undefined || headingRow.values == null) {
			throw Error('Invalid heading row');
		}

		const columns: HeadingId[] = headingRow?.values
			.map((heading: string) => {
				return columMapping.find(
					(map: ColumnMap) => map.fileText.toLowerCase().trim() === heading.toLowerCase().trim()
				)?.id;
			})
			.filter((v: HeadingId | undefined) => v != null);
		const loadedData: PolicyRecord[] = [];
		sheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
			if (rowNumber !== 1) {
				const rowData: Record<string, unknown> = {};
				row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
					rowData[columns[colNumber - 1]] = cell.value;
				});
				loadedData.push(rowData as PolicyRecord);
			}
		});

		return loadedData;
	}
}
