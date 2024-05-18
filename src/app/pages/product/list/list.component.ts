import { Component } from '@angular/core';
import { ProductListFilterRequestDto, ProductListResponseDto } from '../dto';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

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
    private readonly router: Router
  ) {
    this.productModel = new ProductListResponseDto();
    this.init();
  }

  private init(): void {
    this.bindAllProducts();
  }

  private bindAllProducts(): void {
    this.productService.getAllProducts(new ProductListFilterRequestDto()).subscribe({
      next: (res: ProductListResponseDto) => {
        console.table(res);
        this.productModel = res;
      },
      error: (err) => {
      }
    })
  }

  public viewProductDetails(id: number): void {
    this.router.navigateByUrl(`/product-details/${id}`);
  }
}
