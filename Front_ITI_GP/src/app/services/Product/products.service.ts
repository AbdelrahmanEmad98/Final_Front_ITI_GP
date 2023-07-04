import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Models/Products/Product';
import ProductsReadDto from 'src/app/Models/Products/ProductsReadDto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductsPaginagtion(
    page: number,
    counterPerPage: number
  ): Observable<ProductsReadDto> {
    return this.http.get<ProductsReadDto>(
      `https://localhost:7052/api/Products/Pagination/${page}/${counterPerPage}`
    );
  }

  getProducts() {
    return this.http.get('https://localhost:7052/api/Products');
  }

  getProductsbyCategory(id: any) {
    return this.http.get(
      `https://localhost:7052/api/Category/PrdouctsByCategoryId/${id}`
    );
  }
}