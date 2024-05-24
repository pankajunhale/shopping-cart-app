import { Component } from '@angular/core';
import { CartItemCountService } from '../../common/services/cart-item-count/cart-item-count.service';
import { Router } from '@angular/router';

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
  constructor(
    private router: Router,
    public cartItemCountService: CartItemCountService
  ) {
    this.itemCount = this.cartItemCountService.myCartItemCount()
  }

  public toggleDropdown(value: boolean) {
    this.isDisplayDropdown = value ? false : true;
  }

  public navigateToPage(pageUrl: string): void {
    this.router.navigateByUrl(`/${pageUrl}`);
  }
}
