import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  private readonly API_URL="https://localhost:7052/api/"
  GetCustomerInfoById(CustomerId: any) {
    return this.http.get(`https://localhost:7052/api/Customer/${CustomerId}`);
  }
  AddCustomer(data: any){
    return this.http.post(this.API_URL+"Security/Register", data);
  }
  LoginCustomer(data: any){
    return this.http.post(this.API_URL+"Security/Login", data);
  }
  ResetPassword(data: any){
    return this.http.patch(this.API_URL+"Customer/RestPassword", data);
  }
}
