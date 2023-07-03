import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Models/Products/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://localhost:7052/api/';

  getProducts() {
    return this.http.get(this.baseUrl + 'products');
  }
}
