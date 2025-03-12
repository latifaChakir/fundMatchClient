import { TestBed } from '@angular/core/testing';

import { MessageNotifService } from './message-notif.service';

describe('MessageNotifService', () => {
  let service: MessageNotifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageNotifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
