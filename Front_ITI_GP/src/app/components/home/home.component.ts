import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories:any;
  categories2:any;
constructor(private myService:CategoryService){}
  ngOnInit(): void {
    this.myService.GetParentCategories().subscribe({
      next:(data)=>
      {
        this.categories=data;
      },
      error:(err)=>{console.log(err)}
    })


    this.myService.GetAllCategries().subscribe({
      next:(data)=>
      {
        this.categories2=data;
      },
      error:(err)=>{console.log(err)}
    })

    

  }




}
