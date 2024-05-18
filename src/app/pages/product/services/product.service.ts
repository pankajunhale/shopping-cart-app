import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductListFilterRequestDto, ProductListResponseDto } from '../dto';
import { API_URL } from '../../../common/constants';
import { Observable, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseServiceUrl: string;
  constructor(private readonly httpService: HttpClient) {
    this.baseServiceUrl = environment.API_BASE_URL;
  }

  public getAllProducts(dto: ProductListFilterRequestDto): Observable<ProductListResponseDto> {
    return this.httpService.get(`${this.baseServiceUrl}/${API_URL.PRODUCT_LIST}`).pipe((
      map((data) => {
        const response = plainToInstance(ProductListResponseDto, data);
        console.table(response);
        return response;
      })
    ))
  }
}
