import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsiblesComponent } from './collapsibles.component';

describe('CollapsiblesComponent', () => {
  let component: CollapsiblesComponent;
  let fixture: ComponentFixture<CollapsiblesComponent>;

  beforeEach(async(() => {
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
