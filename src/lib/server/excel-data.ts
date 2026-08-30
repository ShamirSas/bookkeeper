import type { Policy } from '$lib/schemas/policy';
import { Heading, HeadingId } from '$lib/types';
import { fail } from '@sveltejs/kit';
import dayjs from 'dayjs';
import ExcelJS, { Workbook, type Worksheet } from 'exceljs';
import path from 'node:path';

class ColumnMap {
	width: number = 20;
	constructor(
		public id: HeadingId,
		public fileText: string,
		options?: {
			width: number;
		}
	) {
		if (options?.width) {
			this.width = options.width;
		}
	}
}

export class ExcelLib {
	static createWorkbook(): Workbook {
		return new ExcelJS.Workbook();
	}
	private static columMapping: ColumnMap[] = [
		new ColumnMap(HeadingId.Client, 'CLIENT', { width: 40 }),
		new ColumnMap(HeadingId.PolicyNumber, 'POLICY NR'),
		new ColumnMap(HeadingId.Insurer, 'INSURER', { width: 15 }),
		new ColumnMap(HeadingId.Inception, 'INCEPTION', { width: 15 }),
		new ColumnMap(HeadingId.Type, 'TYPE', { width: 25 }),
		new ColumnMap(HeadingId.Premium, 'PREMIUM', { width: 17 }),
		new ColumnMap(HeadingId.Commission, 'COMMISION', { width: 17 }),
		new ColumnMap(HeadingId.Split, 'SPLIT', { width: 25 })
	];

	private static get folderPath() {
		return path.join(process.cwd(), 'static');
	}

	private static getFilePath(fileName: string) {
		return path.join(ExcelLib.folderPath, fileName);
	}

	static async loadData(fileName: string): Promise<Policy[]> {
		if (fileName == null)
			throw fail(500, {
				message: 'File name was not provided'
			});
		const workbook: ExcelJS.Workbook = ExcelLib.createWorkbook();
		await workbook.xlsx.readFile(ExcelLib.getFilePath(fileName));
		const sheet: ExcelJS.Worksheet | undefined = workbook.getWorksheet(1);
		const headingRow = sheet?.getRow(1);
		if (headingRow == null || headingRow.values == undefined || headingRow.values == null) {
			throw fail(400, {
				message: 'Invalid header row'
			});
		}

		const columns: HeadingId[] = Array.isArray(headingRow.values)
			? headingRow?.values
					.map((heading) => {
						return ExcelLib.columMapping.find(
							(map: ColumnMap) =>
								map.fileText.toLowerCase().trim() === heading?.toString().toLowerCase().trim()
						)?.id;
					})
					.filter((v: HeadingId | undefined) => v != null)
			: [];
		const loadedData: Policy[] = [];
		sheet?.eachRow({ includeEmpty: false }, (row, rowNumber) => {
			if (rowNumber !== 1) {
				const rowData: Record<string, unknown> = {};
				row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
					rowData[columns[colNumber - 1]] = cell.value;
				});
				loadedData.push(rowData as Policy);
			}
		});

		return loadedData;
	}

	static toUppserCase(text: string | HeadingId): string {
		return text.toUpperCase();
	}

	static async saveData(policies: Policy[]) {
		const documentName = dayjs().format('YYYY-MMM-DD_hh_mm_ss');
		const workbook: Workbook = ExcelLib.createWorkbook();
		const worksheet: Worksheet = workbook.addWorksheet(documentName);
		worksheet.columns = ExcelLib.columMapping.map((column) => ({
			header: column.fileText,
			key: column.id,
			name: column.fileText,
			width: column.width,
			style: {
				alignment: {
					horizontal: 'center'
				},
				numFmt:
					column.id === HeadingId.Commission || column.id === HeadingId.Premium
						? '_("R"* #,##0.00_);_("R"* (#,##0.00);_("R"* "-"??_);_(@_)'
						: undefined,
				font: {
					name: 'Aptos Narrow (Body)',
					size: 14
				}
			}
		}));

		const headerRow = worksheet.getRow(1);

		headerRow.font = {
			bold: true,
			underline: true
		};

		for (const policy of policies) {
			worksheet.addRow(policy);
		}

		const commissionColumn = worksheet.getColumnKey(HeadingId.Commission);

		try {
			const newFileName: string = `NewBusiness_${documentName}.xlsx`;
			await workbook.xlsx.writeFile(ExcelLib.getFilePath(newFileName));
			return {
				newFileName
			};
		} catch (e) {
			throw fail(500, e);
		}
	}
}
