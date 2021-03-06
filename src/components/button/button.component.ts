import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() filled: boolean;
  @Input() type: string; // card , accept , decline, start

  background: string;
  border: string;
  iconText: string;
  width: string;

  class: string;

  marginLeft: string;

  constructor() { }

  ngOnInit() {

    switch (this.type) {
      case 'card':
        this.background = '#ffffff00';
        this.border = '#fff';
        this.iconText = '#3EA4D0';
        break;
      case 'accept':
        this.background = this.filled ? '#73C884' : '#ffffff00';
        this.border = '#73C884';
        this.iconText = this.filled ? '#fff' : '#73C884';
        break;
      case 'start':
       this.background = '#00000000';
       this.border = '#73C884';
       this.iconText = '#FFFFFF';
       break;
      case 'decline':
        this.background = this.filled ? '#707070' : '#ffffff00';
        this.border = '#707070';
        this.iconText = this.filled ? '#fff' : '#707070';
        this.width = '269.6px';
        break;
    }

  }

}
