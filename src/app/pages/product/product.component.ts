import { Component } from '@angular/core';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { ProductService } from './services/product.service';
import { ProductListFilterRequestDto, ProductListResponseDto } from './dto';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ListComponent,
    FilterComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productModel: ProductListResponseDto;
  constructor(private readonly productService: ProductService) {
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

}
