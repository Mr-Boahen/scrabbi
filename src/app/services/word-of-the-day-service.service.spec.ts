import { TestBed } from '@angular/core/testing';

import { WordOfTheDayServiceService } from './word-of-the-day-service.service';

describe('WordOfTheDayServiceService', () => {
  let service: WordOfTheDayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordOfTheDayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
