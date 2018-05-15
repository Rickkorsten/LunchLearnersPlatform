import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardMiniComponent } from './book-card-mini.component';

describe('SettingsCardComponent', () => {
  let component: BookCardMiniComponent;
  let fixture: ComponentFixture<BookCardMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCardMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
