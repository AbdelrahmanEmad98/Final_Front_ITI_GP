import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  GetCustomerInfoById(CustomerId: any) {
    return this.http.get(`https://localhost:7052/api/Customer/${CustomerId}`);
  }
}
