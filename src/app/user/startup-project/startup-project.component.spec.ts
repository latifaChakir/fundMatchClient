import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupProjectComponent } from './startup-project.component';

describe('StartupProjectComponent', () => {
  let component: StartupProjectComponent;
  let fixture: ComponentFixture<StartupProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartupProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartupProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
