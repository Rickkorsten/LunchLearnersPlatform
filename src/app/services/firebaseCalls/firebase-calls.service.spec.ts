import { TestBed, inject } from '@angular/core/testing';

import { FirebaseCallsService } from './firebase-calls.service';

describe('FirebaseCallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseCallsService]
    });
  });

  it('should be created', inject([FirebaseCallsService], (service: FirebaseCallsService) => {
    expect(service).toBeTruthy();
  }));
});
