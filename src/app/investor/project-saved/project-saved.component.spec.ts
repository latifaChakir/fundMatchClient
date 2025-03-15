import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSavedComponent } from './project-saved.component';

describe('ProjectSavedComponent', () => {
  let component: ProjectSavedComponent;
  let fixture: ComponentFixture<ProjectSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSavedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
