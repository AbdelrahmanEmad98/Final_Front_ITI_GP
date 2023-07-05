import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from 'src/app/services/Product Details/product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(private productService: ProductDetailsService) {}

  product: any;
  ColorSizes: any;
  maxQuantity: any;
  Quantity: any = 1;
  minQuantity: any = 1;
  colorValue: any;
  ImageCount: any;

  ngOnInit(): void {
    this.productService
      .GetProductDetails('7d420050-797d-4aa7-a347-0816ae695492')
      .subscribe({
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
}
