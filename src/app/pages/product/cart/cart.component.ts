import { Component } from '@angular/core';
import { Cart, CartListResponseDto } from '../dto';
import { CartService } from '../services/cart.service'
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { CartTotalComponent } from './cart-total/cart-total.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [EmptyCartComponent, CartTotalComponent, JsonPipe, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartModel: CartListResponseDto;
  constructor(private readonly cartService: CartService) {
    this.cartModel = new CartListResponseDto();
    this.init();
  }

  private init(): void {
    this.bindCart();
  }

  private async bindCart() {
    try {
      this.cartService.getAll().subscribe({
        next: (res: CartListResponseDto) => {
          this.cartModel = res;
          this.cartService.publishCartSubtotalAndItemCount().subscribe();
        },
        error: (err) => {
          //handle/display error;
        }
      })
    } catch (error) {
      debugger
    }

  }

  // public methods

  public removeProduct(item: Cart) {
    this.cartService.removeProductFromCart(item.id, item.shoppingCartId).subscribe(
      {
        next: (res: boolean) => {
          this.bindCart();
        },
      }
    )
  }

}
