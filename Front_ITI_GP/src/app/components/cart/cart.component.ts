import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[]=[];
  displayedColumns: string[] = ['image', 'name', 'price', 'color', 'size', 'quantity', 'actions'];
  totalPrice: any;
  

  constructor( private myService: CartService) {}

  ngOnInit() {
    this.myService.getCartProductsByCustomerId('c7d3e80a-7a4a-4c54-91a6-89c0df051c94').subscribe(
      (response: any) => {


        console.log(response);

        this.cartItems = response.products.map((item: any) => ({
          image: item.image || '',
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          quantityInStock : item.quantityInStock,
          color: item.color, 
          size: item.size ,
          productId:item.productId,
          cartId:response.cartId
        }));
        console.log(this.cartItems)
        this.calculateTotalPrice(); 

      },
      (error) => {
        console.error('Failed to get cart products', error);

      }
    );
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /*updateTotalPrice(item: any) {
    item.totalPrice = item.price * item.quantity;
    this.myService.updateCartProduct(item.productId, item.cartId, item.quantity).subscribe(
      (response) => {
        console.log('Cart updated successfully');
      },
      
      (error) => {
        console.error('Failed to update cart', error);
        this.calculateTotalPrice(); 
      }
    );
  }*/
  

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


  // deleteCartItem(productId: string) {
  //   const cartId = '0f75f042-ee17-4fd3-b8e4-9a03869449ac';
  //   this.myService.deleteCartProduct(cartId, productId).subscribe(
  //     () => {
  //       console.log('Item deleted');
  //     },
  //     (error: any) => {
  //       console.error('Failed to delete item', error);
  //     }
  //   );
  // }

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
      },
      (error: any) => {
        console.error('Failed to delete item', error);
        this.calculateTotalPrice(); 

      }
    );
  }
  
  

  deleteCart(cartId: string) {
    this.myService.deleteCart(cartId).subscribe(
      () => {
        console.log('Cart deleted');
        this.cartItems = [];
      },
      (error: any) => {
        console.error('Failed to delete cart', error);
        this.calculateTotalPrice(); 

      }
    );
  }

  checkout() { 
    const cartId = '0f75f042-ee17-4fd3-b8e4-9a03869449ac';
    this.deleteCart(cartId);
  }
  

  
}
