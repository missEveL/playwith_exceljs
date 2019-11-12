import { Row } from 'exceljs';

export class InputRow {
public ID = '';
public ANOTHER_ID = '';
public COMBO_ID = '';
public SOME_DATA = '';
public CONDITION_CHECK = '';
public SOME_MORE_DATA = '';
public SOME_MORE_DATA2 = '';
public A_DATE_VALUE = '';

constructor(
public readonly row: Row
) {
this.ID = row.getCell(1).toString();
this.ANOTHER_ID = row.getCell(2).toString();
this.COMBO_ID = row.getCell(2).toString() + row.getCell(1).toString();
this.SOME_DATA = row.getCell(3).toString();
this.CONDITION_CHECK = row.getCell(4).toString();
this.SOME_MORE_DATA = row.getCell(5).toString();
this.SOME_MORE_DATA2 = row.getCell(6).toString();
this.A_DATE_VALUE = row.getCell(7).toString();
}

}
