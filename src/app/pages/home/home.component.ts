import { Component, signal } from '@angular/core';
import { IProduct } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  count : any = ''
  cartItems : IProduct[] = [];
  allproduct : IProduct[] = [];
  products : IProduct[] = [];


  constructor(private productService : ProductService, private cartService : CartService , private router : Router , private authservice : AuthService){}

  ngOnInit() : void {
    // Load cart items
    this.cartItems = this.cartService.getCartItems();
    
    // Fetch products from the API
    this.productService.getProducts().subscribe((data) => {
      this.products = data;  // API products
  
      // Load products from localStorage
      const localStorageProducts = this.productService.getProductsFromLocalStorage();
      
      // Ensure localStorageProducts is an array
      const localProducts = Array.isArray(localStorageProducts) ? localStorageProducts : [];
  
      // Manually merge localStorage products and API products
      this.allproduct = localProducts.concat(this.products);  // Merge arrays
      
      console.log('All Products:', this.allproduct);  // Check merged result
    });
  
    this.count = this.cartItems.length;
  }


  addToCart(product : IProduct) : void {
    this.cartService.addToCart(product);
    this.cartItems = this.cartService.getCartItems();
    this.count = this.cartItems.length;
  }


  //პროდუქტის რაოდენობის გაზრდა ,
  increment(product: IProduct): void {
    this.cartService.addToCart(product); // Increase quantity in the cart
    this.cartItems = this.cartService.getCartItems();
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


  
  signout(){
    this.authservice.clearToken();   //  წაშლის ავტორიზაციის ტოკენს  ლოკალსთორიჯიდან
    this.router.navigate(['/'])  //  გადამისამართდება ავტორიზაციის გვერდზე
  }
}
