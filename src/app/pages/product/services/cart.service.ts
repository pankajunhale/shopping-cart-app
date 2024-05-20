import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CartListResponseDto, Product } from '../dto';
import { Observable, catchError, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { API_URL } from '../../../common/constants';
import { ResponseDto } from '../../../common/dto/response';
import { CartItemCountService } from '../../../common/services/cart-item-count/cart-item-count.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseServiceUrl: string;
  constructor(
    private readonly httpService: HttpClient,
    private cartItemCountService: CartItemCountService
  ) {
    this.baseServiceUrl = environment.API_BASE_URL;
  }

  getAll(userId: number): Observable<CartListResponseDto> {
    return this.httpService.get(`${this.baseServiceUrl}/${API_URL.CART_INFO}/1`).pipe((
      map((data: any) => {
        if (data && data.result && data.result.length > 0) {
          let subTotal = 0;
          let itemCount = 0;
          data.result.map((item: any) => {
            item['itemTotal'] = (item.quantity * item.product.price);
            subTotal = subTotal + item['itemTotal'];
            itemCount = itemCount + (item.quantity ? item.quantity : 0);
          });
          data['cartTotal'] = subTotal;
          data['itemCount'] = itemCount;
        }
        const response = plainToInstance(CartListResponseDto, data);
        console.dir(response);
        return response;
      })
    ))
  }

  addProductToCart(product: Product) {
    this.cartItemCountService.setCount(11);
    return this.httpService.post(`${this.baseServiceUrl}/${API_URL.CART_INFO}`, product).pipe((
      map((data) => {
        const response = plainToInstance(CartListResponseDto, data);
        return response;
      })
    ))
  }

  removeProductFromCart(id: number, shoppingCartId: number): Observable<boolean> {
    return this.httpService.delete(`${this.baseServiceUrl}/${API_URL.CART_INFO}/${id}/${shoppingCartId}`).pipe((
      map((data) => {
        return true;
      })
    ))
  }

}
