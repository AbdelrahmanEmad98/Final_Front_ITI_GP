import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly myClient:HttpClient) { }

  private readonly API_URL = "https://localhost:7052/api/";

  GetAllCustomer(){
    return this.myClient.get(this.API_URL+"category");
  }

  GetAllProductsInCart(){
    this.myClient.get(this.API_URL+"Customer");
  }
}
