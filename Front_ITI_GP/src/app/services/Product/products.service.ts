import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Models/Products/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(page: page) {
    let params = new HttpParams();

    return this.http.get('https://localhost:7052/api/Products');
  }

  getProductsbyCategory(id: any) {
    return this.http.get(
      `https://localhost:7052/api/Category/PrdouctsByCategoryId/${id}`
    );
  }
}
