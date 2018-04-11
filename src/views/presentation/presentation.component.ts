import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  book: any;
  constructor(private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.book = JSON.parse(params['book']);
    });
  }

  checkDbOutput = (data: string) => {
    if (data === undefined) {
      return 'no data';
    } else {
      return data;
    }
  }

}
