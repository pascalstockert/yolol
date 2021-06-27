import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneEditorComponent } from './standalone-editor.component';

describe('StandaloneEditorComponent', () => {
  let component: StandaloneEditorComponent;
  let fixture: ComponentFixture<StandaloneEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandaloneEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandaloneEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
