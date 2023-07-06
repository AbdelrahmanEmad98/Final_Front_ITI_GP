import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from 'src/app/services/Product Details/product-details.service';
import { Location } from '@angular/common';
import { error } from 'jquery';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private productService: ProductDetailsService,
    private urlData: ActivatedRoute,
    private location: Location,
    private route: Router
  ) {}
  productId = this.urlData.snapshot.params['id'];

  product: any;
  ColorSizes: any;
  maxQuantity: any;
  Quantity: any = 1;
  minQuantity: any = 1;
  colorValue: any;
  ImageCount: any;
  addCart: any;
  size: any;

  ngOnInit(): void {
    this.productService.GetProductDetails(this.productId).subscribe(
      (data)=>
     {
        this.product = data;
        this.ColorSizes = this.product.productInfo[0];
        this.colorValue = this.product.productInfo[0].color;
        this.maxQuantity = this.product.productInfo[0].sizeQuantities[0].quantity;
        this.ImageCount = this.product.productImages.Count;
      },
       (error) => {
        if(error.status== 401)
        this.route.navigate(["/"]);
      }
   
    )
  }

  Sizes(value: any) {
    this.Quantity = 1;
    this.colorValue = value;
    for (let i = 0; i < this.product.productInfo.length; i++) {
      if (this.product.productInfo[i].color == value) {
        this.ColorSizes = this.product.productInfo[i];
      }
    }
  }

  CheckMax() {
    if (this.Quantity < this.maxQuantity) this.Quantity++;
  }

  CheckMin() {
    if (this.Quantity > this.minQuantity) this.Quantity--;
  }

  QuantityCheck(e:any,size: any) {
    e.target.style.backgroundColor="gray";
    this.Quantity = 1;
    this.size = size;
    for (let i = 0; i < this.product.productInfo.length; i++) {
      if (this.product.productInfo[i].color == this.colorValue) {
        for (
          let j = 0;
          j < this.product.productInfo[i].sizeQuantities.length;
          j++
        ) {
          if (this.product.productInfo[i].sizeQuantities[j].size == size) {
            this.maxQuantity =
              this.product.productInfo[i].sizeQuantities[j].quantity;
          }
        }
      }
    }
  }

  GoBack() {
    this.location.back();
  }

  AddToCart() {
    this.addCart = {
      productId: this.product.id,
      productCount: this.Quantity,
      color: this.colorValue,
      size: this.size,
    };
    this.productService.AddtoCart(this.addCart).subscribe(
      response => {
        // Handle successful response
        console.log(response);
      },
      error => {
        // Handle error response
        console.log(error);
        if (error.status === 401) {
          this.route.navigate(['/login']);
        }});

    console.log(this.addCart);
  }
}
