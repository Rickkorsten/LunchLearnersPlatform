import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-button',
  templateUrl: './section-button.component.html',
  styleUrls: ['./section-button.component.scss']
})
export class SectionButtonComponent implements OnInit {

  @Input() section: string;
  @Input() title: string;
  @Input() time: string;
  @Input() type: string;

  margin: string;
  width: string;

  constructor() { }

  ngOnInit() {
    switch (this.type) {
      case 'sidemenu':
        this.margin = '10px 0px 0px 0px';
        this.width = '350px';
        break;
    }
  }

}
