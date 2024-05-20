import { Component } from '@angular/core';
import { CartItemCountService } from '../../common/services/cart-item-count/cart-item-count.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDisplayDropdown: boolean = false;
  itemCount = 0;
  constructor(public cartItemCountService: CartItemCountService) {
    this.itemCount = this.cartItemCountService.myCartItemCount()
  }

  public toggleDropdown(value: boolean) {
    console.log({ n: new Date() });
    this.isDisplayDropdown = value ? false : true;
  }
}
