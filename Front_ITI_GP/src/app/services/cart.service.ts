import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private readonly myClient: HttpClient) { }
  private readonly API_URL = "https://localhost:7052/api/";

  getCartProductsByCustomerId(customerId: string) {
    return this.myClient.get<any>(`${this.API_URL}cart/${customerId}`);
  }

  deleteCartProduct(cartId: string, productId: string) {
    return this.myClient.delete<any>(`${this.API_URL}cart/${cartId}/${productId}`);
  }

  deleteCart(cartId: string) {
    return this.myClient.delete<any>(`${this.API_URL}cart/${cartId}`);
  }

  updateCartProduct(productId: string, cartId: string, quantity: number) {
    const body = {
      ProductId: productId,
      CartId: cartId,
      Quantity: quantity
    };
    return this.myClient.put<any>(`${this.API_URL}cart`, body);
  }

  getProductDetails(productId: string) {
    return this.myClient.get<any>(`${this.API_URL}product/Details/${productId}`);
  }
}
