import { Injectable } from '@angular/core';
import { IProduct } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: IProduct[] = [];

  constructor() {
    // Load cart items from localStorage when the service is initialized
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  // Get cart items from the local cart array
  getCartItems(): IProduct[] {
    return this.cart;
  }

  // Add a product to the cart and store the updated cart in localStorage
  addToCart(product: IProduct): void {
    const existingProduct = this.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity! += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCartToLocalStorage();
  }

  // Remove a product from the cart and update localStorage
  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCartToLocalStorage();
  }

  // Clear all items in the cart and update localStorage
  clearCart(): void {
    this.cart = [];
    this.saveCartToLocalStorage();
  }

  // Save the current cart to localStorage
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }


  updateCartItems(cartItems: IProduct[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.cart = cartItems;
  }
}
