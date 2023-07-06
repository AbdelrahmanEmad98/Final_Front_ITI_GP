import { Component, OnInit, enableProdMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckOutService } from 'src/app/services/check-out.service';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Order } from 'src/app/Models/Order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  ID = "";
  cart: any;
  customer: any;
  anotherAddress = false;
  credit = false;
  paypal = false;
  order: Order = {
    city: '',
    street: '',
    country: '',
    paymentStatus: '',
    paymentMethod: '',
    customerId: '',
    orderProducts: [{
      productCount: 0,
      productId: ''
    }]
  };

  constructor(private service: CheckOutService, private route: ActivatedRoute, private router: Router) {
    this.ID = route.snapshot.params["id"]
  }

  ngOnInit(): void {
    this.service.GetCartProducts("0e67a2e5-df53-4a92-9854-8e1ad46a4e61").subscribe(
      {
        next: (data) => {
          console.log(data);
          this.cart = data;
          console.log(this.CalculateTotalCost())
        },
        error: (error) => { console.log(error) }
      }
    )
    this.service.GetCustomer("0e67a2e5-df53-4a92-9854-8e1ad46a4e61").subscribe({
      next: (data) => {
        console.log(data);
        this.customer = data;
      },
      error: (error) => { console.log(error) }
    })
  }

  CalculateTotalCost() {
    let totalcost = 0;
    for (let i = 0; i < this.cart.products.length; i++) {
      totalcost += this.cart.products[i].price;
    }
    this.cart.totalCost = totalcost;
    return this.cart.totalCost;

  }

  myForm = new FormGroup({
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required])
  });


  onSubmit() {
    if (!this.myForm.valid && this.anotherAddress) {
      // Handle form submission
      this.myForm.markAllAsTouched();

    } else {

      console.log(this.myForm.value);
      this.order = {
        city: this.customer.city,
        street: this.customer.street,
        country: this.customer.country,
        paymentStatus: 'Unpaid',
        paymentMethod: 'CashOnDelivery',
        customerId: this.customer.id,
        orderProducts: []
      }
      if (this.myForm.value.city != undefined &&
        this.myForm.value.country != undefined &&
        this.myForm.value.street != undefined &&
        this.myForm.value.street != '' &&
        this.myForm.value.city != '' &&
        this.myForm.value.country != '') 
        {
        this.order.street = this.myForm.value.street;
        this.order.city = this.myForm.value.city;
        this.order.country = this.myForm.value.country;
      }

      for (let i = 0; i < this.cart.products.length; i++) {
        this.order.orderProducts.push({ productId: this.cart.products[i].productId, productCount: i })
      }
      console.log(this.order);
      this.service.PlaceOrder(this.order).subscribe({
        next:(data)=>{
          console.log("Added");
          this.service.ClearCartProducts(this.customer.id).subscribe({
            next:(data)=>{console.log("cleared")},
            error:(data)=>{console.log("Not Cleared")}
          })
        },
        error:(error1)=> {console.log("notAdded")}
      })
    }
  }
}

