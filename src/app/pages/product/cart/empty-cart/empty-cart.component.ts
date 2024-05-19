import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CartTotalComponent } from '../cart-total/cart-total.component';

@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [CartTotalComponent, CurrencyPipe],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.css'
})
export class EmptyCartComponent {
  emptyCartTotal = "0.00";
  constructor() { }
}
