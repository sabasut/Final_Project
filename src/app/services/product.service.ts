import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://fakestoreapi.com/products'

  constructor(private http : HttpClient) { }

  getProducts() : Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  addProduct(product : IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product);
  }
  addProduct2(formData: FormData): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, formData).pipe(
      map((response: IProduct) => {
        // Ensure the product added is fully populated before saving it to localStorage
        this.saveProductToLocalStorage(response);
        return response;
      })
    );
  }
  private saveProductToLocalStorage(product: IProduct): void {
    let products = this.getProductsFromLocalStorage();
    products.push(product);  // Add the full product object, not just the id
    localStorage.setItem('products', JSON.stringify(products));  // Save to localStorage
  }
  
  getProductsFromLocalStorage(): IProduct[] {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];  // Return an empty array if no products are found
  }
  
}
