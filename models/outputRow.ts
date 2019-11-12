import { InputRow } from './inputRow';

export class OutputRow {
public ID = '';
public KEYVAL = '';
public KEYVAL_ALT = '';

constructor(
public readonly inputRow: InputRow
) {
this.ID = inputRow.COMBO_ID;

if (!inputRow.CONDITION_CHECK || inputRow.CONDITION_CHECK === '0') {
this.KEYVAL = `ID=${inputRow.ID}` +
`#COMBO_ID=${inputRow.COMBO_ID}` +
`#ANOTHER_ID=${inputRow.ANOTHER_ID}` +
`#DATA=${inputRow.SOME_DATA}` +
`#DATA2=${inputRow.SOME_MORE_DATA}` +
`#DATA3=${inputRow.SOME_MORE_DATA2}` +
`#date=${inputRow.A_DATE_VALUE}`;
} else if (inputRow.CONDITION_CHECK === '1') {
this.KEYVAL_ALT = `ID=${inputRow.ID}` +
`#COMBO_ID=${inputRow.COMBO_ID}` +
`#ANOTHER_ID=${inputRow.ANOTHER_ID}` +
`#DATA=${inputRow.SOME_DATA}` +
`#DATA2=${inputRow.SOME_MORE_DATA}` +
`#DATA3=${inputRow.SOME_MORE_DATA2}` +
`#date=${inputRow.A_DATE_VALUE}`;
}
}
}
