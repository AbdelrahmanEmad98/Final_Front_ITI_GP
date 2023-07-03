import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly myClient:HttpClient) { }
  private readonly API_URL="https://localhost:7052/api/"
  GetAllCategries(){
    return this.myClient.get(this.API_URL+"Category");
  }

}