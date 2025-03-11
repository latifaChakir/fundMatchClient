import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatExComponent } from './chat-ex.component';

describe('ChatExComponent', () => {
  let component: ChatExComponent;
  let fixture: ComponentFixture<ChatExComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatExComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
