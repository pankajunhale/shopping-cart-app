import { Component } from '@angular/core';
import { AddCartItemReponseDto, Product, ProductListFilterRequestDto, ProductListResponseDto } from '../dto';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CartItemCountService } from '../../../common/services/cart-item-count/cart-item-count.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ProductListComponent {
  productModel: ProductListResponseDto;
  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly cartItemCountService: CartItemCountService,
    private readonly cartService: CartService
  ) {
    this.productModel = new ProductListResponseDto();
    this.init();
  }

  private init(): void {
    this.cartService.publishCartSubtotalAndItemCount().subscribe();
    this.bindAllProducts();
  }

  private bindAllProducts(): void {
    this.productService.getAllProducts(new ProductListFilterRequestDto()).subscribe({
      next: (res: ProductListResponseDto) => {
        this.productModel = res;
      },
      error: (err) => {
        // handle/display error
      }
    })
  }

  public viewProductDetails(id: number): void {
    this.router.navigateByUrl(`/product-details/${id}`);
  }

  public addProductToCart(item: Product) {
    this.cartService.addProductToCart(
      {
        productId: item.id
      }
    ).subscribe(
      {
        next: (res: AddCartItemReponseDto) => {
          // update cart item count
          this.cartItemCountService.setCount(res.result ? res.result.totalCartItemCount : 0);
        },
        error: (err) => {
          // handle/display error
        }
      }
    );
  }
}
