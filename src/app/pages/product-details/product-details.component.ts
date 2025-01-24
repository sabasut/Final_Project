import { Component } from '@angular/core';
import { IProduct } from '../../model/product.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product !: IProduct;
  cartItems : IProduct[] = [];

  constructor(private route: ActivatedRoute, private productService : ProductService, private cartService : CartService , private router: Router){}

  ngOnInit() : void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    })

    this.cartItems = this.cartService.getCartItems();

  }

  addToCart() : void {
    this.cartService.addToCart(this.product);
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

  returnBack(){
    this.router.navigate(["/home"])
  }
}
