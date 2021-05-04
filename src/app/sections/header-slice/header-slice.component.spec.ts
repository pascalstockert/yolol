import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderSliceComponent } from './header-slice.component';

describe('HeaderSliceComponent', () => {
  let component: HeaderSliceComponent;
  let fixture: ComponentFixture<HeaderSliceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
