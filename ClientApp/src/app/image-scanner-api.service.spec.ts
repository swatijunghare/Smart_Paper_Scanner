import { TestBed } from '@angular/core/testing';

import { ImageScannerApiService } from './image-scanner-api.service';

describe('ImageScannerApiService', () => {
  let service: ImageScannerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageScannerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
