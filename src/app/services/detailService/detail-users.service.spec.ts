import { TestBed } from '@angular/core/testing';

import { DetailUsersService } from './detail-users.service';

describe('DetailUsersService', () => {
  let service: DetailUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
