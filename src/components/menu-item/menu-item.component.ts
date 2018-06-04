import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() router: string;

  constructor() { }

  ngOnInit() { }

}
