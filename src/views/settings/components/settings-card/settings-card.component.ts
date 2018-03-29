import { Component, OnInit, Input, } from '@angular/core';

@Component({
  selector: 'app-settings-card',
  templateUrl: './settings-card.component.html',
  styleUrls: ['./settings-card.component.scss']
})


export class SettingsCardComponent implements OnInit {

  @Input() title: string;
  @Input() error: string;

  constructor() { }

  ngOnInit() {
  }

}
