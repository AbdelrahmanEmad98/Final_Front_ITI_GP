import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from 'src/app/services/Product Details/product-details.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private productService: ProductDetailsService,
    private urlData: ActivatedRoute,
    private location: Location
  ) {}
  productId = this.urlData.snapshot.params['id'];

  product: any;
  ColorSizes: any;
  maxQuantity: any;
  Quantity: any = 1;
  minQuantity: any = 1;
  colorValue: any;
  ImageCount: any;

  ngOnInit(): void {
    console.log(this.location);
    this.productService.GetProductDetails(this.productId).subscribe({
      next: (data: any) => {
        this.product = data;
        this.ColorSizes = data.productInfo[0];
        this.colorValue = data.productInfo[0].color;
        this.maxQuantity = data.productInfo[0].sizeQuantities[0].quantity;
        this.ImageCount = this.product.productImages.Count;
      },
      error: () => {},
    });
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

  QuantityCheck(size: any) {
    this.Quantity = 1;
    console.log(size);
    console.log(this.colorValue);
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
            console.log(this.maxQuantity);
          }
        }
      }
    }
  }

  GoBack() {
    this.location.back();
  }
}
