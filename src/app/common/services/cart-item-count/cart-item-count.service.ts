import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartItemCountService {

  myCartItemCount = signal(0);
  constructor() { }

  public setCount(value: number): void {
    this.myCartItemCount.set(value);
  }

  public getCount(): number {
    return this.myCartItemCount();
  }
}
