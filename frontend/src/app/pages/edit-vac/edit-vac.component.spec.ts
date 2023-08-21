import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVacComponent } from './edit-vac.component';

describe('EditVacComponent', () => {
  let component: EditVacComponent;
  let fixture: ComponentFixture<EditVacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVacComponent]
    });
    fixture = TestBed.createComponent(EditVacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
