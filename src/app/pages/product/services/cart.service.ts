import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddCartItemReponseDto, AddCartItemRequestDto, CartListResponseDto, CartSubtotalAndItemCountResponseDto, Product } from '../dto';
import { Observable, catchError, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { API_URL } from '../../../common/constants';
import { CartItemCountService } from '../../../common/services/cart-item-count/cart-item-count.service';
import { BaseService } from './base.service';
import { CartSubtotalSignalService } from '../../../common/services/cart-subtotal-signal/cart-subtotal-signal.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {

  constructor(
    private readonly httpService: HttpClient,
    private cartItemCountService: CartItemCountService,
    private cartSubtotalSignalService: CartSubtotalSignalService
  ) {
    super();
  }

  getAll(): Observable<CartListResponseDto> {
    return this.httpService.get(`${this.baseServiceUrl}/${API_URL.CART_INFO}`).pipe((
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
        return response;
      })
    ))
  }

  addProductToCart(cartItem: AddCartItemRequestDto): Observable<AddCartItemReponseDto> {
    return this.httpService.post(`${this.baseServiceUrl}/${API_URL.CART_INFO}`, cartItem).pipe((
      map((data) => {
        const response = plainToInstance(AddCartItemReponseDto, data);
        return response;
      })
    ))
  }

  removeProductFromCart(id: number, shoppingCartId: number): Observable<boolean> {
    return this.httpService.delete(`${this.baseServiceUrl}/${API_URL.CART_INFO}/${id}/${shoppingCartId}`).pipe((
      map(() => {
        return true;
      })
    ))
  }

  publishCartSubtotalAndItemCount(): Observable<CartSubtotalAndItemCountResponseDto> {
    return this.httpService.get(`${this.baseServiceUrl}/${API_URL.CART_SUBTOTAL_AND_COUNT_INFO}`).pipe((
      map((response) => {
        const data = plainToInstance(CartSubtotalAndItemCountResponseDto, response);
        this.cartItemCountService.setCount(data.result?.count ? data.result?.count : 0);
        this.cartSubtotalSignalService.set(data.result?.total ? data.result?.total : 0);
        return data;
      })
    ))
  }

}
