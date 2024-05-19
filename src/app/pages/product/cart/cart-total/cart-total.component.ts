import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.css'
})
export class CartTotalComponent {
  @Input({ required: true }) cartItemCount: number = 0;
  @Input({ required: true }) cartTotal: number = 0;
}
