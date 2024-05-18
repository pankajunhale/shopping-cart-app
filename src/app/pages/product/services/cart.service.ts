import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CartListResponseDto, Product } from '../dto';
import { Observable, catchError, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { API_URL } from '../../../common/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseServiceUrl: string;
  constructor(private readonly httpService: HttpClient) {
    this.baseServiceUrl = environment.API_BASE_URL;
  }

  getAll(userId: number): Observable<CartListResponseDto> {
    return this.httpService.get(`${this.baseServiceUrl}/${API_URL.CART_INFO}/1`).pipe((
      map((data) => {
        const response = plainToInstance(CartListResponseDto, data);
        return response;
      })
    ))
  }

  addProductToCart(product: Product) {
    return this.httpService.post(`${this.baseServiceUrl}/${API_URL.CART_INFO}`, product).pipe((
      map((data) => {
        const response = plainToInstance(CartListResponseDto, data);
        return response;
      })
    ))
  }

  removeProductFromCart(id: number, shoppingCartId: number): Observable<true> {
    return this.httpService.delete(`${this.baseServiceUrl}/${API_URL.CART_INFO}/${id}/${shoppingCartId}`).pipe((
      map((data) => {
        return true;
      })
    ))
  }

}
