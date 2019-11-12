import { OutputRow } from './models/outputRow';
import { ExcelLoader } from './utils/excelLoader';

class Main {
	public run(): void {
		// get file location from run cmd?
		this.buildCSV('playwith_exceljs.xlsx')
			.catch(e => {
				// tslint:disable-next-line: no-console
				console.error(e);
			});
	}

	private async buildCSV(path: string): Promise<OutputRow[]> {
		const loader = new ExcelLoader(path);
		return loader.getOutput();
	}
}

new Main().run();
