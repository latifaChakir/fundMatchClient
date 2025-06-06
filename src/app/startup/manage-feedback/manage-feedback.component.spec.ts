import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeedbackComponent } from './manage-feedback.component';

describe('ManageFeedbackComponent', () => {
  let component: ManageFeedbackComponent;
  let fixture: ComponentFixture<ManageFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
