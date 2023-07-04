import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/Products/Product';
import { ProductsService } from 'src/app/services/Product/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public myService: ProductsService,
    public route: ActivatedRoute
  ) {
    this.ID = route.snapshot.params['id'];

    console.log(this.ID);
  }
  ID: any;
  products: any[] = [];
  page: number = 1;
  totalRecords: number = 0;
  categoryId: any;
  searchKey: string = '';
  filterCategory: any;
  showButton: boolean = false;
  isLoading = false;
  isLoadingg = false;
  ngOnInit(): void {
    this.myService.getProducts(thtis.shopParams).subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = data;
      },
    });
  }

  getProducts() {
    this.isLoading = true;
    this.myService.getProducts().subscribe((data: any) => {
      this.isLoading = false;
      this.products = data;
      this.filterCategory = data;
      console.log(this.filterCategory);
      this.totalRecords = data.length;
    });
  }

  filter(category: any) {
    console.log(category);
    console.log(typeof category);
    if (category == '') {
      this.getProducts();
    }
    this.myService.getProductsbyCategory(category).subscribe({
      next: (res) => {
        console.log(res);
        this.filterCategory = res;
        console.log(this.filterCategory);
        console.log(this.filterCategory.price);
        // this.filterCategory = this.products.filter((a: any) => {
        //   console.log('================');
        //   console.log(a);
        //   //product
        //   console.log(a.id); //categoryName
        //   // if (a.id === category) {
        //   //   console.log(a);
        //   //   return a;
        //   // }
        // });
        // console.log(this.filterCategory.products);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onclick() {
    console.log('hala');
    this.isLoadingg = true;
  }

  clickk() {
    console.log('hala');
    setInterval(() => {}, 1000);
    this.isLoadingg = false;
  }
}
