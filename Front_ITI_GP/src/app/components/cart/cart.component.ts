import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  displayedColumns: string[] = ['image', 'name', 'price', 'color', 'size', 'quantity', 'totalPrice', 'actions'];
  totalPrice: any;
  

  constructor( private myService: CartService) {}

  ngOnInit() {
    this.myService.getCartProductsByCustomerId('724587e6-9314-4fe6-9c3e-6fd612f50234').subscribe(
      (response: any) => {
        this.cartItems = response.products.map((item: any) => ({
          image: item.image || '',
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          color: item.color, 
          size: item.size ,
        }));
        this.calculateTotalPrice(); // Calculate the total price

      },
      (error) => {
        console.error('Failed to get cart products', error);

      }
    );
  }


  updateTotalPrice(item: any) {
    item.totalPrice = item.price * item.quantity;
    this.myService.updateCartProduct(item.productId, item.cartId, item.quantity).subscribe(
      (response) => {
        console.log('Cart updated successfully');
      },
      (error) => {
        console.error('Failed to update cart', error);
      }
    );
  }
  

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotalPrice(item);
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateTotalPrice(item);
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
  deleteCartItem(productId: string) {
    const cartId = '0f75f042-ee17-4fd3-b8e4-9a03869449ac';
  
    this.myService.deleteCartProduct(cartId, productId).subscribe(
      () => {
        console.log('Item deleted');
        this.cartItems = this.cartItems.filter(item => item.productId !== productId);
        this.calculateTotalPrice(); // Recalculate the total price
      },
      (error: any) => {
        console.error('Failed to delete item', error);
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
      }
    );
  }

  checkout() { 
    const cartId = '0f75f042-ee17-4fd3-b8e4-9a03869449ac';
    this.deleteCart(cartId);
  }
  
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }
  
}
