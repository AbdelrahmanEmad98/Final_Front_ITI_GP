import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ) {}

  // parentCategories: any;
  // subcategories: any;
  // productsFromCategory: any;
  // ///;
  // ID: any;
  // products: any[] = [];
  // page: number = 1;
  // totalRecords: number = 0;
  // categoryId: any;
  // searchKey: string = '';
  // filterCategory: any;
  // totalCount = 0;
  // showButton: boolean = false;
  // isLoading = false;
  // isLoadingg = false;
  // items: any;
  // itemsURL: [] = [];

  // counterPerPage = 10;
  CategoryId = this.route.snapshot.params['id'];
  subCategories: any;
  productsofSub: any;
  subCategoryId: any;
  Color: any;
  Size: any;

  ngOnInit(): void {
    this.myService.getSubcategories(this.CategoryId).subscribe({
      next: (res) => {
        this.subCategories = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.GetAll();
  }

  getProductsbyCategory(subcategoryId: string) {
    this.myService.getProductsbyCategory(subcategoryId).subscribe({
      next: (res) => {
        this.productsofSub = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log(this.productsofSub);
  }

  GetAll() {
    this.myService.getProductsByParentCategoryId(this.CategoryId).subscribe({
      next: (res) => {
        this.productsofSub = res;
        console.log(this.productsofSub);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  subId(subId: any) {
    this.subCategoryId = subId;
    console.log(this.subCategoryId);
  }

  color(col: any) {
    this.Color = col;
  }

  size(si: any) {
    this.Size = si;
  }

  Filter() {
    this.myService
      .getProductsFiltered(
        this.CategoryId,
        this.subCategoryId,
        this.Color,
        this.Size
      )
      .subscribe({
        next: (res) => {
          this.productsofSub = res;
          console.log(this.productsofSub);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  Colors: string[] = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Orange',
    'Purple',
    'Pink',
    'Black',
    'White',
    'Gray',
    ' Brown',
  ];

  Sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  // getProducts(page: number) {
  //   this.isLoading = true;
  //   this.myService
  //     .getProductsPaginagtion(page, this.counterPerPage)
  //     .subscribe((data: any) => {
  //       console.log(data);

  //       this.isLoading = false;
  //       this.totalCount = data.totalCount;
  //       this.items = data.items;
  //       console.log(this.items);
  //     });
  // }
}
