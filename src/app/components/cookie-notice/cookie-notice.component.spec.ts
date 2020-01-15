import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieNoticeComponent } from './cookie-notice.component';

describe('CookieNoticeComponent', () => {
  let component: CookieNoticeComponent;
  let fixture: ComponentFixture<CookieNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
