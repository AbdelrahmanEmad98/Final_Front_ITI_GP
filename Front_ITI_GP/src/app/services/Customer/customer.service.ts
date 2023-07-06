import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  GetCustomerInfoById(CustomerId = '14a547f2-3abc-4854-aaec-2c775c5ce1cb') {
    // return this.http.get(`https://localhost:7052/api/Customer/${CustomerId}`);
    return this.http.get(`https://localhost:7052/api/Customer/${CustomerId}`);
  }

  UpdateCustomerByID(customerUpdate: any) {
    console.log(customerUpdate);
    return this.http.patch(
      `https://localhost:7052/api/Customer/14a547f2-3abc-4854-aaec-2c775c5ce1cb`,
      customerUpdate
    );
  }
}
