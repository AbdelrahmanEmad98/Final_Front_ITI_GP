import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private productData: HttpClient) {}

  baseUrl = 'https://localhost:7052/api/Products/Details/';

  GetProductDetails(id: any) {
    return this.productData.get(this.baseUrl + id);
  }
}
