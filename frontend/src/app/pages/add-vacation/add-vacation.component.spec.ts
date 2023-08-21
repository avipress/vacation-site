import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacationComponent } from './add-vacation.component';

describe('AddVacationComponent', () => {
  let component: AddVacationComponent;
  let fixture: ComponentFixture<AddVacationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVacationComponent]
    });
    fixture = TestBed.createComponent(AddVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
