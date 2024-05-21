import { TestBed } from '@angular/core/testing';

import { CartSubtotalSignalService } from './cart-subtotal-signal.service';

describe('CartSubtotalSignalService', () => {
  let service: CartSubtotalSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSubtotalSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
