import {Injectable} from '@angular/core';


@Injectable()

export class  CsvService {

    constructor() {
        // Blank Constructor for Demo Purpose
    }

    // Download CSV
    download(data: any, filename: string) {
        const csvData = this.ConvertToCSV(data);
        const a: any = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        a.href = url;

        const isIE = /*@cc_on!@*/false || !!(<any> document).documentMode;

        if (isIE) {
          const retVal = navigator.msSaveBlob(blob, filename + '.csv');
          console.log(retVal);
        } else {
            a.download = filename + '.csv';
        }
        // If you will any error in a.download then dont worry about this.
        a.click();
    }


    // convert Json to CSV data
    ConvertToCSV(objArray: any) {
            const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
            let str = '';
            let row = '';

            // tslint:disable-next-line:forin
            for (const indx in objArray[0]) {
                // Now convert each value to string and comma-seprated
                row += indx + ',';
            }
            row = row.slice(0, -1);
            // append Label row with line break
            str += row + '\r\n';

            for (let i = 0; i < array.length; i++) {
                let line = '';
                // tslint:disable-next-line:forin
                for (const index in array[i]) {
                    if (line !== '') { line += ','; }

                    line += '"' + array[i][index] + '"';
                }

                str += line + '\r\n';
            }

            return str;
        }
}
