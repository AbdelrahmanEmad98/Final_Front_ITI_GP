import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Models/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  private readonly BaseUrl="https://localhost:7052/api/"
  constructor(private readonly myclient:HttpClient) {

   }

   GetCartProducts(customerId:any){
    return this.myclient.get(`${this.BaseUrl}Cart/${customerId}`)
   }
   GetCustomer(customerId:any){
    return this.myclient.get(`${this.BaseUrl}Customer/${customerId}`)
   }

   PlaceOrder(order:Order){
    return this.myclient.post(`${this.BaseUrl}Orders`,order)
   }
   
   ClearCartProducts(customerId:any[]){
      return this.myclient.delete(`${this.BaseUrl}Cart/Clear/${customerId}`)
   }
}
