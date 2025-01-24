import { Component } from '@angular/core';
import { IProduct } from '../../model/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems : IProduct[] = [];

  countSum : any = 0
  constructor(private cartService : CartService , private router : Router) {  }

  ngOnInit() : void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();

  }

  removeFromCart(productId : number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();

  }

  returnBack(){
    this.router.navigate(["/home"])
  }
 //პროდუქტის რაოდენობის გაზრდა ,
 increment(product: IProduct): void {
  this.cartService.addToCart(product); // Increase quantity in the cart
  this.cartItems = this.cartService.getCartItems();
  this.calculateTotal();

}

//პროდუქტის რაოდენობის შემცირება ,

decrement(product: IProduct): void {
  const existingProduct = this.cartItems.find((item) => item.id === product.id);
  if (existingProduct && existingProduct.quantity! > 1) {
    existingProduct.quantity!--;
    this.cartService.updateCartItems(this.cartItems);
  } else {
    this.cartService.removeFromCart(product.id); // Remove the product if quantity is 0
  }
  this.cartItems = this.cartService.getCartItems();
  this.calculateTotal();

}


// ნახულობს ეს პროდუქტი დამატებულია თუარა cartItemში  ანუ კალათაში ,  ძებნა  პროდუქტის აიდით
isProductInCart(productId: number): boolean {
  return this.cartItems.some((item) => item.id === productId);
}



//  პროდუქტის აიდის მიხედვით აბრუნებს quantity -ს, კალათაში რამდენიცალია ეს პროდუქტი დამატებული
getProductQuantity(productId: number): number {
  const product = this.cartItems.find((item) => item.id === productId);
  return product ? product.quantity! : 0;
}

  //  ითვლის Sum -ს 
  calculateTotal(): void {
    this.countSum = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

}
