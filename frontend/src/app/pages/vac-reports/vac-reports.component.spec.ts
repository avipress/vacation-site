import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacReportsComponent } from './vac-reports.component';

describe('VacReportsComponent', () => {
  let component: VacReportsComponent;
  let fixture: ComponentFixture<VacReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacReportsComponent]
    });
    fixture = TestBed.createComponent(VacReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
