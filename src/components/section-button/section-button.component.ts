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

  constructor() { }

  ngOnInit() {
  }

}
