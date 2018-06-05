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

  convertTime(time) {
    const hours   = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100;

    let result = (hours < 10 ? '0' + hours : hours);
        result += ':' + (minutes < 10 ? '0' + minutes : minutes);
        result += ':' + (seconds  < 10 ? '0' + seconds : seconds);
    return result;
  }

}
