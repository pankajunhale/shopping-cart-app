import { Component } from '@angular/core';
import { ProductDetailsResponseDto } from '../dto';
import { ProductService } from '../services/product.service';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  productModel: ProductDetailsResponseDto;
  private productId = 0;

  constructor(
    private router: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {
    this.productModel = new ProductDetailsResponseDto();
    this.init();
  }

  private init(): void {
    this.cartService.publishCartSubtotalAndItemCount().subscribe();
    this.router.params.subscribe((param: any) => {
      this.productId = param.id;
      this.bindProductInfo(this.productId);
    })
  }

  private bindProductInfo(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (res: ProductDetailsResponseDto) => {
        this.productModel = res;
      },
      error: (err) => {
        //handle/display error;
      }
    })
  }

  public addProductToCart(): void {
    this.cartService.addProductToCart({ productId: this.productModel.result?.id ? this.productModel.result?.id : 0 }).subscribe({
      next: () => {
        this.cartService.publishCartSubtotalAndItemCount().subscribe();
      }
    })
  }
}
