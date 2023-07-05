import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/Products/Product';
import ProductsReadDto from 'src/app/Models/Products/ProductsReadDto';
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
  ///

  parentCategories: any;
  subcategories: any;
  productsFromCategory: any;
  ///;
  ID: any;
  products: any[] = [];
  page: number = 1;
  totalRecords: number = 0;
  categoryId: any;
  searchKey: string = '';
  filterCategory: any;
  totalCount = 0;
  showButton: boolean = false;
  isLoading = false;
  isLoadingg = false;
  items: any;
  itemsURL: [] = [];

  counterPerPage = 3;
  ngOnInit(): void {
    this.getProducts(1);
    this.getParentCategories();
  }
  getParentCategories() {
    this.myService.getParentCategories().subscribe({
      next: (res) => {
        this.parentCategories = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSubcategories(parentCategoryId: string) {
    this.myService.getSubcategories(parentCategoryId).subscribe({
      next: (res) => {
        this.subcategories = res;
        console.log(res);
        this.items = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductsbyCategory(subcategoryId: string) {
    this.myService.getProductsbyCategory(subcategoryId).subscribe({
      next: (res) => {
        this.productsFromCategory = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductsByParentCategory(parentCategoryId: string) {
    this.myService.getSubcategories(parentCategoryId).subscribe(
      (subcategories) => {
        const subcategoryIds = Object.values(subcategories).map(
          (subcategory) => subcategory.id
        );
        this.myService.getProductsbyCategory(subcategoryIds).subscribe(
          (products) => {
            this.productsFromCategory = products;
          },
          (error) => {
            console.error('Failed to retrieve products:', error);
          }
        );
      },
      (error) => {
        console.error('Failed to retrieve subcategories:', error);
      }
    );
  }

  getProductsByParentCategoryId(parentCategoryId: any) {
    this.myService.getProductsByParentCategoryId(parentCategoryId).subscribe({
      next: (res) => {
        this.items = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProducts(page: number) {
    this.isLoading = true;
    this.myService
      .getProductsPaginagtion(page, this.counterPerPage)
      .subscribe((data: any) => {
        console.log(data);

        this.isLoading = false;
        this.totalCount = data.totalCount;
        this.items = data.items;
        console.log(this.items);
      });
  }

  // filter(category: any) {
  //   console.log(category);
  //   console.log(typeof category);
  //   if (category == '') {
  //     this.getProducts(1);
  //   }
  //   this.myService.getProductsbyCategory(category).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       console.log(res);
  //       this.items = res;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
  filter(category: any) {
    console.log(category);
    // console.log(typeof category);

    if (category.parentCategory == '') {
      this.myService.getProductsByParentCategoryId(category).subscribe({
        next: (res) => {
          console.log(res);
          this.items = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.myService.getProductsbyCategory(category).subscribe({
        next: (res) => {
          console.log(res);
          this.items = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // filter(category: any) {
  //   console.log(category);
  //   console.log(typeof category);
  //   if (category === '') {
  //     this.getProducts(1);
  //   } else if (category === 'parentCategory') {
  //     // Replace 'parentCategory' with the actual value you want to use to identify the parent category
  //     this.myService.getParentCategories().subscribe({
  //       next: (parentCategories) => {
  //         for (const parentCategory of parentCategories) {
  //           this.myService.getSubcategories(parentCategory.id).subscribe({
  //             next: (subcategories) => {
  //               const subcategoryIds = Object.values(subcategories).map(
  //                 (subcategory) => subcategory.id
  //               );
  //               for (const subcategoryId of subcategoryIds) {
  //                 this.myService
  //                   .getProductsbyCategory(subcategoryId)
  //                   .subscribe({
  //                     next: (products) => {
  //                       console.log(products);
  //                       // Handle the retrieved products as needed
  //                     },
  //                     error: (err) => {
  //                       console.log(err);
  //                     },
  //                   });
  //               }
  //             },
  //             error: (err) => {
  //               console.log(err);
  //             },
  //           });
  //         }
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  //   } else {
  //     this.myService.getProductsbyCategory(category).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.items = res;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  //   }
  // }

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

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css'],
// })
// export class ProductsComponent implements OnInit {
//   constructor(
//     private http: HttpClient,
//     public myService: ProductsService,
//     public route: ActivatedRoute
//   ) {
//     this.ID = route.snapshot.params['id'];

//     console.log(this.ID);
//   }
//   ID: any;
//   products: any[] = [];
//   page: number = 1;
//   totalRecords: number = 0;
//   categoryId: any;
//   searchKey: string = '';
//   filterCategory: any;
//   totalCount = 0;
//   showButton: boolean = false;
//   isLoading = false;
//   isLoadingg = false;
//   ngOnInit(): void {

//     this.myService.getProductsPaginagtion(thtis.shopParams).subscribe({
//       next: (data: any) => {
//         console.log(data);
//         this.products = data;
//       },
//     });
//   }

//   getProducts() {
//     this.isLoading = true;
//     this.myService.getProducts().subscribe((data: any) => {
//       this.isLoading = false;
//       this.products = data;
//       this.filterCategory = data;
//       console.log(this.filterCategory);
//       this.totalRecords = data.length;
//     });
//   }

//   filter(category: any) {
//     console.log(category);
//     console.log(typeof category);
//     if (category == '') {
//       this.getProducts();
//     }
//     this.myService.getProductsbyCategory(category).subscribe({
//       next: (res) => {
//         console.log(res);
//         this.filterCategory = res;
//         console.log(this.filterCategory);
//         console.log(this.filterCategory.price);
//         // this.filterCategory = this.products.filter((a: any) => {
//         //   console.log('================');
//         //   console.log(a);
//         //   //product
//         //   console.log(a.id); //categoryName
//         //   // if (a.id === category) {
//         //   //   console.log(a);
//         //   //   return a;
//         //   // }
//         // });
//         // console.log(this.filterCategory.products);
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }

//   onclick() {
//     console.log('hala');
//     this.isLoadingg = true;
//   }

//   clickk() {
//     console.log('hala');
//     setInterval(() => {}, 1000);
//     this.isLoadingg = false;
//   }
// }
