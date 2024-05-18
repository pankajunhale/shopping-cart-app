import { Component } from '@angular/core';
import { CartListResponseDto } from '../dto';
import { CartService } from '../services/cart.service'
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartModel: CartListResponseDto;
  constructor(private readonly CartService: CartService) {
    this.cartModel = new CartListResponseDto();
    this.init();
  }

  private init(): void {
    this.bindCart();
  }

  private bindCart(): void {
    this.CartService.getAll(1).subscribe({
      next: (res: CartListResponseDto) => {
        console.table(res);
        this.cartModel = res;
      },
      error: (err) => {
      }
    })
  }
}
