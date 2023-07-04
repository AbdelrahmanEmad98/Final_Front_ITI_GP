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

  ngOnInit(): void {
    this.productService
      .GetProductDetails('7d420050-797d-4aa7-a347-0816ae695492')
      .subscribe({
        next: (data: any) => {
          this.product = data;
        },
        error: () => {},
      });
  }
}
