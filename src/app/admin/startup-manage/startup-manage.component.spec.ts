import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupManageComponent } from './startup-manage.component';

describe('StartupManageComponent', () => {
  let component: StartupManageComponent;
  let fixture: ComponentFixture<StartupManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartupManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartupManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
