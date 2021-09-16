import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsanSetupComponent } from './isan-setup.component';

describe('IsanSetupComponent', () => {
  let component: IsanSetupComponent;
  let fixture: ComponentFixture<IsanSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsanSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsanSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
