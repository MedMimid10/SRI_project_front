import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipJobsComponent } from './internship-jobs.component';

describe('InternshipJobsComponent', () => {
  let component: InternshipJobsComponent;
  let fixture: ComponentFixture<InternshipJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternshipJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
