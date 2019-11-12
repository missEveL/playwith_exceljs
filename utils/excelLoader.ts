import { Workbook } from 'exceljs';
import { InputRow } from '../models/inputRow';
import { OutputRow } from '../models/outputRow';

export class ExcelLoader {
	constructor(private readonly path: string) {}

	public getOutput(): Promise<OutputRow[]> {
		return new Promise<OutputRow[]>((resolve, reject) => {
			const outputWorker: OutputRow[] = [];
			const output: OutputRow[] = [];
			const workbook = new Workbook();
			workbook.xlsx
				.readFile(this.path)
				.then(() => {
					workbook.getWorksheet(1).eachRow(row => {
						const inputRow = new InputRow(row);
						outputWorker.push(new OutputRow(inputRow));
					});
					outputWorker.forEach(function(row) {
						let outRowIdx = 0;
						const outputRowFnd: OutputRow = output.filter(function(value, index) {
							if (value && value.ID === row.ID &&
								(value.KEYVAL !== row.KEYVAL || value.KEYVAL_ALT !== row.KEYVAL_ALT)) {
								outRowIdx = index;
								return true;
							}
							return false;
						})[0];

						if (outputRowFnd) {
							if (row.KEYVAL && !output[outRowIdx].KEYVAL) {
								output[outRowIdx].KEYVAL = row.KEYVAL;
							} else if (row.KEYVAL_ALT && !output[outRowIdx].KEYVAL_ALT) {
								output[outRowIdx].KEYVAL_ALT = row.KEYVAL_ALT;
							}
						} else {
							output.push(row);
						}
					});

					const outputCSV = new Workbook();
					outputCSV.addWorksheet();
					const outputWS = outputCSV.getWorksheet(1);
					output.forEach((row, idx) => {
						if (idx === 0) {
							outputWS.columns = [
								{header: 'ID'},
								{header: 'KEYVAL'},
								{header: 'KEYVAL_ALT'}
							];
						} else {
							outputWS.addRow([row.ID, row.KEYVAL, row.KEYVAL_ALT ]);
						}
					});
					const today = new Date();
					const dd = String(today.getDate()).padStart(2, '0');
					const mm = String(today.getMonth() + 1).padStart(2, '0');
					const yyyy = today.getFullYear();
					outputCSV.csv
					.writeFile(`playwith_exceljs_${yyyy}_${mm}_${dd}.csv`);
					resolve(output);
				})
				.catch(e => {
					reject(e);
				});
		});
	}
}
