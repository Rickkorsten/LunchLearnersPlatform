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
  @Input() type: string; // card , accept , decline

  background: string;
  border: string;
  iconText: string;

  constructor() { }

  ngOnInit() {

    switch (this.type) {
      case 'card':
        this.background = '#fff';
        this.border = '#fff';
        this.iconText = '#3EA4D0';
        break;
      case 'accept':
        this.background = this.filled ? '#44B75B' : '#fff';
        this.border = '#44B75B';
        this.iconText = this.filled ? '#fff' : '#44B75B';
        break;
    }

  }

}
