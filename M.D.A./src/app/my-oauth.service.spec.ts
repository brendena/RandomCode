import { TestBed, inject } from '@angular/core/testing';

import { MyOauthService } from './my-oauth.service';

describe('MyOauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyOauthService]
    });
  });

  it('should be created', inject([MyOauthService], (service: MyOauthService) => {
    expect(service).toBeTruthy();
  }));
});
