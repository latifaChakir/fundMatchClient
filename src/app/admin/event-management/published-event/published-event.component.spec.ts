import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedEventComponent } from './published-event.component';

describe('PublishedEventComponent', () => {
  let component: PublishedEventComponent;
  let fixture: ComponentFixture<PublishedEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishedEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
