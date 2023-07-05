import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[]=[];
  displayedColumns: string[] = ['image', 'name', 'price', 'color', 'size', 'quantity', 'actions'];
  totalPriceBefore: any;
  totalPriceAfter: any;
  cart:any;
  

  constructor( private myService: CartService ,public route:Router) {}

  ngOnInit() {
    this.myService.getCartProductsByCustomerId('c7d3e80a-7a4a-4c54-91a6-89c0df051c94').subscribe(
      (response) => {

        this.cart=response;
        
        console.log(response);
        this.cartItems = response.products.map((item: any) => ({
          image: item.image || '',
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPriceBefor: item.price * item.quantity ,
          totalPriceAfter: item.price * item.quantity * item.discount,
          quantityInStock : item.quantityInStock,
          color: item.color, 
          size: item.size ,
          productId:item.productId,
          cartId:response.cartId,
          discount:item.discount
        }));
        console.log("hgjhjghjghjg"+this.cartItems)
        this.calculateTotalPrice(); 

      },
      (error) => {
        console.error('Failed to get cart products', error);

      }
    );
  }

  calculateTotalPrice() {
    console.log("try");
    console.log(this.cartItems != null);
    console.log(this.cartItems.length == 0);
    console.log(this.cartItems );
    if(this.cartItems.length != 0){
    this.totalPriceBefore = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.cartItems.forEach(c => {
      if(c.discount==0){
        this.totalPriceAfter = c.price * c.quantity;
      }

      else{
        console.log(c.price * c.quantity *.9);
        this.totalPriceAfter =c.price * c.quantity * (1-c.discount);
      }
    

    });
  }else{
    this.totalPriceBefore=0
    this.totalPriceAfter=0
  }
  }

  

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      //this.updateTotalPrice(item);
      this.calculateTotalPrice(); 

    }
  }

  increaseQuantity(item: any) {
    const maxQuantity = Math.min(item.quantityInStock, item.quantity + 1);
       if(item.quantity < maxQuantity){
    item.quantity++;
    //this.updateTotalPrice(item);
    this.calculateTotalPrice(); 
}
  }


  
  deleteItem:any;
  deleteCartItem(item:any) {
    const cartId = 'c7d3e80a-7a4a-4c54-91a6-89c0df051c94';
    this.deleteItem = {
      cartId:item.cartId,
      productId:item.productId,
      color:item.color,
      size:item.size
    }

    console.log(item.quantity);
    this.myService.deleteCartProduct(this.deleteItem).subscribe(
      () => {
        console.log('Item deleted');
        this.calculateTotalPrice(); // Recalculate the total price
        this.ngOnInit();
      },
      (error: any) => {
        console.error('Failed to delete item', error);
        this.calculateTotalPrice(); 

      }

    );
    
    
  }
  
  deleteCart() {
    console.log(this.cart.cartId);
    this.myService.deleteCart(this.cart.cartId).subscribe(
      () => {
        console.log('Cart deleted');
        this.cartItems = [];
        this.ngOnInit();
      },
      (error: any) => {
        console.error('Failed to delete cart', error);
        this.calculateTotalPrice(); 

      }
    );
  }

  checkout() { 
    let cartId = this.cart.customerId;
    
  }
  

  
}
