import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBuilderComponent } from './review-builder.component';

describe('ReviewBuilderComponent', () => {
  let component: ReviewBuilderComponent;
  let fixture: ComponentFixture<ReviewBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
