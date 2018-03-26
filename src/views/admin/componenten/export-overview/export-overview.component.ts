import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export-overview',
  templateUrl: './export-overview.component.html',
  styleUrls: ['./export-overview.component.scss']
})
export class ExportOverviewComponent implements OnInit {

  array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  constructor() { }


  remove(arr, dele) {
    return arr.filter((el) => {
      return el !== dele;
    });
  }

  ngOnInit() {


    this.array = this.remove(this.array, 2);
    console.log(this.array);


    // console.log('delete: ' + this.deleteMsg('bram'));
  }

}
