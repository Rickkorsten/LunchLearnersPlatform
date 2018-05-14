import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCard2Component } from './settings-card2.component';

describe('SettingsCard2Component', () => {
  let component: SettingsCard2Component;
  let fixture: ComponentFixture<SettingsCard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
