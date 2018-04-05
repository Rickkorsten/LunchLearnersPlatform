import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiewcomponentComponent } from './niewcomponent.component';

describe('NiewcomponentComponent', () => {
  let component: NiewcomponentComponent;
  let fixture: ComponentFixture<NiewcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiewcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiewcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
