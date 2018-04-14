import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoHeaderComponent } from './book-info-header.component';

describe('BookInfoHeaderComponent', () => {
  let component: BookInfoHeaderComponent;
  let fixture: ComponentFixture<BookInfoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookInfoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
