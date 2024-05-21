import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartSubtotalSignalService {

  myCartSubTotal = signal(0);
  constructor() { }

  public set(value: number): void {
    this.myCartSubTotal.set(value);
  }

  public get(): number {
    return this.myCartSubTotal();
  }
}
