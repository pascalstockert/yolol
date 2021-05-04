import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollapsiblesComponent } from './collapsibles.component';

describe('CollapsiblesComponent', () => {
  let component: CollapsiblesComponent;
  let fixture: ComponentFixture<CollapsiblesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
